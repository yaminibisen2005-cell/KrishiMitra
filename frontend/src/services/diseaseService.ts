/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiseaseDetectionResult } from '../types';

export async function detectDisease(imageFile: File | null): Promise<DiseaseDetectionResult|null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!imageFile) {
    throw new Error('No image file selected. Please upload or drag & drop an image.');
  }

  // Create mock disease detection result
  return {
    disease: 'Leaf Spot Disease (Cercospora)',
    confidence: 94.6,
    cause: 'Fungal infection exacerbated by warm, humid climate and poor soil aeration.',
    treatment: 'Apply Mancozeb or Chlorothalonil fungicide spray. Prune infected leaves down to avoid plant spread and ensure spaced cropping.',
    notes: 'Common in cotton and soybean plantations. Ensure proper crop rotation to break the disease cycle.'
  };
}
