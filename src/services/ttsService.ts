import { GoogleGenAI, Modality } from "@google/genai";

const audioCache: Record<string, string> = {};

export async function speak(text: string) {
  // Stop any ongoing speech (Gemini or Browser)
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  window.speechSynthesis.cancel();

  // 1. Check memory cache first
  if (audioCache[text]) {
    playBase64Audio(audioCache[text], text);
    return;
  }

  // 2. Check persistent cache (localStorage) to save quota
  const cachedAudio = localStorage.getItem(`tts_cache_${text}`);
  if (cachedAudio) {
    audioCache[text] = cachedAudio; // Sync to memory
    playBase64Audio(cachedAudio, text);
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Di con voz profesional y clara: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      audioCache[text] = base64Audio;
      // Persist to localStorage for future sessions (up to ~5MB limit)
      try {
        localStorage.setItem(`tts_cache_${text}`, base64Audio);
      } catch (e) {
        console.warn("LocalStorage full, skipping persistence");
      }
      playBase64Audio(base64Audio, text);
    }
  } catch (error: any) {
    // If quota is exhausted (429), we log it but immediately use browser TTS
    if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED') {
      console.warn("Gemini Quota exhausted, using browser fallback.");
    } else {
      console.error("Error generating speech:", error);
    }
    fallbackToBrowserTTS(text);
  }
}

let currentAudio: HTMLAudioElement | null = null;

function playBase64Audio(base64Data: string, text: string) {
  try {
    // Convert base64 to Uint8Array
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Gemini TTS typically returns raw PCM 16-bit Mono at 24kHz.
    // Browsers need a WAV header to play this via the Audio object.
    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);
    
    // RIFF identifier
    view.setUint32(0, 0x52494646, false); // "RIFF"
    // file length
    view.setUint32(4, 36 + bytes.length, true);
    // RIFF type
    view.setUint32(8, 0x57415645, false); // "WAVE"
    // format chunk identifier
    view.setUint32(12, 0x666d7420, false); // "fmt "
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (1 = PCM)
    view.setUint16(20, 1, true);
    // channel count (1 = Mono)
    view.setUint16(22, 1, true);
    // sample rate (24000 Hz)
    view.setUint32(24, 24000, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, 24000 * 2, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, 2, true);
    // bits per sample (16 bits)
    view.setUint16(34, 16, true);
    // data chunk identifier
    view.setUint32(36, 0x64617461, false); // "data"
    // data chunk length
    view.setUint32(40, bytes.length, true);

    const wavBlob = new Blob([wavHeader, bytes], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(wavBlob);
    
    currentAudio = new Audio(audioUrl);
    currentAudio.play().catch(e => {
      console.warn("Error playing WAV audio:", e);
      // Fallback to browser TTS
      fallbackToBrowserTTS(text);
    });

    // Cleanup URL after playing
    currentAudio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  } catch (err) {
    console.error("Critical error in playBase64Audio:", err);
    fallbackToBrowserTTS(text);
  }
}

function fallbackToBrowserTTS(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX';
  window.speechSynthesis.speak(utterance);
}
