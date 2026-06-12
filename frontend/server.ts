/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of GoogleGenAI or create on load with safety checks
// Setting User-Agent header to 'aistudio-build' in httpOptions for telemetry.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Secure server-side Crop Recommendation using Gemini API
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { soilType, pH, temp, rain, location } = req.body;
      if (!soilType || !pH || !temp || !rain || !location) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not defined in the host environment.");
      }

      // Create a prompt targeting professional Indian Agronomical recommendations
      const prompt = `You are KrishiMitra's senior AI Agronomist and Crop Scientist. Analyze the following local farming conditions:
- Region/Location: ${location}
- Soil Cover Type: ${soilType}
- Soil pH level: ${pH}
- Average Regional Temperature: ${temp}°C
- Annual Rainfall estimate: ${rain} mm

Generate the top 3 recommended crops most suited for this environment that will yield maximum agrarian returns. Return the result strictly in English as a JSON array matching the provided schema. Highlight specific organic fertilizers, optimal sowing advice, or protective steps tailored to Indian local agriculture.

The Unsplash image URLs provided in the response must be valid high-quality public agriculture assets. You can use or suggest URLs matching these keys or similar:
- Wheat: https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400
- Rice: https://images.unsplash.com/photo-1536631135711-61a9f50eafbe?auto=format&fit=crop&q=80&w=400
- Maize: https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400
- Cotton: https://images.unsplash.com/photo-1594142340578-8316fc1ec9b8?auto=format&fit=crop&q=80&w=400
- Soybean: https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400
- Chickpea: https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=400
- Mustard: https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400
- Groundnut: https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&q=80&w=400
- Pigeon Pea / Tur Dal: https://images.unsplash.com/photo-1585973323034-3158c5643444?auto=format&fit=crop&q=80&w=400`;

      // Call the Gemini API with the Modern @google/genai SDK
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an analytical agricultural model that outputs pristine JSON only. Do not wrap code blocks in markdown fences. Conforms to the JSON schema provided.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "A unique crop ID (e.g., wheat-001)" },
                name: { type: Type.STRING, description: "The common crop name (e.g., Wheat, Rice, Mustard)" },
                suitabilityScore: { type: Type.INTEGER, description: "Match percentage rating from 0 to 100 based on input metrics" },
                expectedYield: { type: Type.STRING, description: "Expected range e.g., '15-18 q/acre'" },
                profitability: { type: Type.STRING, description: "High, Medium, or Low" },
                description: { type: Type.STRING, description: "Concise analysis of why this crop is recommended, critical sowing times, and specific inputs in English (2 sentences max)." },
                image: { type: Type.STRING, description: "Unsplash crop stock photo image URL" },
                idealConditions: { type: Type.STRING, description: "Summary of ideal ranges (e.g. 'pH: 6.0-7.5, Temp: 15-25°C')" }
              },
              required: ["id", "name", "suitabilityScore", "expectedYield", "profitability", "description", "image", "idealConditions"]
            }
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini generator model.");
      }

      const results = JSON.parse(responseText.trim());
      return res.json(results);
    } catch (error: any) {
      console.error("Gemini Crop Recommender error:", error);
      return res.status(500).json({ error: error.message || "Agronomist recommendation engine failed." });
    }
  });

  // Vite development vs production serving logic
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KrishiMitra Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer();
