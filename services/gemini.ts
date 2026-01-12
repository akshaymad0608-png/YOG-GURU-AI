import { GoogleGenAI, Type } from "@google/genai";
import { PoseFeedback } from "../types";

export async function getPostureFeedback(
  poseName: string, 
  userAngles: Record<string, number>, 
  targetAngles: Record<string, number>,
  language: string = 'en'
): Promise<PoseFeedback> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const languageNames: Record<string, string> = {
    en: 'English',
    hi: 'Hindi',
    gu: 'Gujarati'
  };

  try {
    const prompt = `
      User is performing ${poseName}. 
      Current detected joint angles: ${JSON.stringify(userAngles)}.
      Target ideal angles: ${JSON.stringify(targetAngles)}.
      
      IMPORTANT: Respond ONLY in ${languageNames[language] || 'English'}.
      Compare the two and provide real-time correction instructions.
      Be encouraging but precise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            accuracy: { type: Type.NUMBER, description: "A score from 0-100" },
            message: { type: Type.STRING, description: "Main feedback message" },
            corrections: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Specific step-by-step corrections" 
            },
            isCorrect: { type: Type.BOOLEAN }
          },
          required: ["accuracy", "message", "corrections", "isCorrect"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Feedback Error:", error);
    return {
      accuracy: 0,
      message: language === 'hi' ? "प्रतिक्रिया अनुपलब्ध है। कृपया स्थिति समायोजित करें।" : 
               language === 'gu' ? "પ્રતિસાદ અનુપલબ્ધ છે. મહેરબાની કરીને સ્થિતિ સમાયોજિત કરો." :
               "AI feedback currently unavailable. Try adjusting your position.",
      corrections: [language === 'en' ? "Ensure you are fully in frame" : "कृपया कैमरे के सामने आएं"],
      isCorrect: false
    };
  }
}

export async function speakFeedback(text: string, language: string = 'en') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code
  const langMap: Record<string, string> = {
    en: 'en-US',
    hi: 'hi-IN',
    gu: 'gu-IN'
  };
  utterance.lang = langMap[language] || 'en-US';
  
  // Try to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(utterance.lang));
  if (voice) utterance.voice = voice;

  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}