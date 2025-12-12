import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      throw new Error("API Key missing");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateChatResponse = async (
  message: string,
  history: { role: string; parts: [{ text: string }] }[]
): Promise<string> => {
  try {
    const client = getAI();
    
    // We map the simplified history to the format Gemini expects if needed, 
    // but here we will just use generateContent with system instructions for simplicity 
    // in a single-turn context or maintain a chat session.
    
    // Using chat session for context retention
    const chat = client.chats.create({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history // Pass previous chat history
    });

    const result = await chat.sendMessage({
        message: message
    });

    return result.text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I am currently experiencing high traffic. Please try asking me again in a moment.";
  }
};
