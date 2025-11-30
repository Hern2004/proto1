
declare const process: any;
import { GoogleGenAI } from "@google/genai";

export interface VeoGenerationConfig {
  prompt: string;
  image?: string; // Base64 string
  mimeType?: string;
  aspectRatio: '16:9' | '9:16';
}

export async function generateVeoVideo(config: VeoGenerationConfig): Promise<string> {
  // 1. Check & Request API Key (Mandatory for Veo)
  const aistudio = (window as any).aistudio;
  if (aistudio) {
      const hasKey = await aistudio.hasSelectedApiKey();
      if (!hasKey) {
          await aistudio.openSelectKey();
      }
  }

  // 2. Initialize AI with environment key (which proxies the selected key)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let operation;

  // 3. Start Generation
  if (config.image && config.mimeType) {
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: config.prompt,
      image: {
        imageBytes: config.image,
        mimeType: config.mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: config.aspectRatio
      }
    });
  } else {
    // Text-to-Video only
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: config.prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: config.aspectRatio
      }
    });
  }

  // 4. Poll for Completion
  // Veo takes time, we need to poll the operation status
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) {
    throw new Error("Generation completed but no video URI found.");
  }

  // 5. Fetch the actual video blob
  // "You must append an API key when fetching from the download link."
  const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
  if (!response.ok) {
      throw new Error("Failed to download generated video.");
  }
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
