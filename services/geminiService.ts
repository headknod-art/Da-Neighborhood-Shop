import { GoogleGenAI, Type } from "@google/genai";
import { BEATS } from '../constants';
import { Beat } from '../types';

// Initialize Gemini client
// Note: In a real production app, you might proxy this through a backend to protect the key,
// but for this frontend-only demo, we use the env variable directly as instructed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchBeatsWithAI = async (query: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning empty list.");
    return [];
  }

  try {
    const model = 'gemini-2.5-flash';
    const beatMetadata = BEATS.map(b => ({
      id: b.id,
      title: b.title,
      tags: b.tags,
      mood: b.mood,
      genre: b.genre,
      bpm: b.bpm,
      producer: b.producer
    }));

    const prompt = `
      You are a music curator assistant. 
      User Query: "${query}"
      
      Here is the catalog of beats:
      ${JSON.stringify(beatMetadata)}
      
      Select the beat IDs that best match the user's request based on mood, genre, bpm, title, or tags.
      Return ONLY a JSON object with a property "beatIds" which is an array of strings.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            beatIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const result = JSON.parse(text);
    return result.beatIds || [];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const generateLyricsForBeat = async (beat: Beat, topic?: string): Promise<string> => {
   if (!process.env.API_KEY) {
    return "Please configure your API Key to generate lyrics.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Write a chorus and one verse of lyrics for a song using the following beat.
      
      Beat Title: ${beat.title}
      Mood: ${beat.mood}
      Genre: ${beat.genre}
      BPM: ${beat.bpm}
      ${topic ? `Topic/Theme: ${topic}` : 'Theme: Freestyle/General'}

      Format the output nicely with [Chorus] and [Verse] headers. Do not add conversational text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate lyrics.";
  } catch (error) {
    console.error("Gemini Lyric Error:", error);
    return "Error generating lyrics. Please try again.";
  }
}
