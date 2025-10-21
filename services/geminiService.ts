
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getHealthAdvice = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is not configured. Please contact the administrator.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and friendly family health advisor. You provide concise, practical, and safe advice for parents regarding their children's health and wellness. Your tone is encouraging and easy to understand. Do not provide medical diagnoses. Always suggest consulting a healthcare professional for serious concerns.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching health advice:", error);
    return "Sorry, I couldn't fetch advice at the moment. Please try again later.";
  }
};
