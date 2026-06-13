package com.krishibandhu.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

	@Value("${gemini.api.key}")
	private String apiKey;

	private final RestTemplate restTemplate = new RestTemplate();

	private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

	public String askGemini(String question) {

		try {

			String url = GEMINI_URL + apiKey;

			Map<String, Object> requestBody = Map.of("contents",
					List.of(Map.of("parts", List.of(Map.of("text", question)))));

			HttpHeaders headers = new HttpHeaders();

			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

			ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

			Map<String, Object> body = response.getBody();

			if (body == null) {
				return "No response from Gemini";
			}

			List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");

			if (candidates == null || candidates.isEmpty()) {

				return "No response generated";
			}

			Map<String, Object> candidate = candidates.get(0);

			Map<String, Object> content = (Map<String, Object>) candidate.get("content");

			List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

			if (parts == null || parts.isEmpty()) {

				return "No response generated";
			}

			return parts.get(0).get("text").toString();

		} catch (Exception e) {

			e.printStackTrace();

			return "Gemini Error: " + e.getMessage();
		}
	}

	public String detectPest(String imageUrl) {

		return """
				Crop Name: Cotton
				Pest Name: Aphids
				Severity: Medium
				Treatment: Spray Neem Oil
				""";
	}
}