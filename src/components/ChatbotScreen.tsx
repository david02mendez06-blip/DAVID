import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, Loader2, Image as ImageIcon, Download } from 'lucide-react';

export default function ChatbotScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateLogo = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // We use gemini-2.5-flash-image for logo generation
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a professional, modern, and minimalist logo for a company. 
                     Description: ${prompt}. 
                     Style: Clean lines, vector style, flat design, suitable for industrial packaging and identification. 
                     Background: Solid white or transparent-looking background. 
                     No text unless specified.`,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No se pudo generar la imagen. Intenta con una descripción diferente.");
      }
    } catch (err: any) {
      console.error("Error generating logo:", err);
      setError(err.message || "Ocurrió un error al generar el logo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `jabel-pack-logo-${Date.now()}.png`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32 px-6 pt-8 bg-black min-h-screen"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-primary" size={24} />
          <h2 className="text-3xl font-extrabold text-white">Logo AI</h2>
        </div>
        <p className="text-slate-400">Diseña conceptos de logos industriales al instante. En Jabel Pack, <span className="text-primary font-bold italic">¡nos gusta hacerlo divertido!</span></p>
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-xl">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
            Describe tu concepto de logo
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Un engrane minimalista con una hoja verde integrando tecnología y ecología..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all resize-none h-32"
            />
            <button
              onClick={generateLogo}
              disabled={isGenerating || !prompt.trim()}
              className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 disabled:bg-slate-800 disabled:text-slate-600 text-white p-3 rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 px-1 italic">
            * La IA generará una propuesta visual basada en tu descripción técnica.
          </p>
        </div>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="aspect-square w-full bg-slate-900 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-4"
            >
              <div className="relative">
                <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" size={24} />
              </div>
              <p className="text-slate-400 font-bold text-sm animate-pulse">Procesando diseño...</p>
            </motion.div>
          )}

          {generatedImage && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="aspect-square w-full bg-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img 
                  src={generatedImage} 
                  alt="Logo generado" 
                  className="w-full h-full object-contain p-8"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={downloadImage}
                    className="bg-white text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <Download size={18} />
                    Descargar
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="flex-1 bg-slate-900 text-slate-400 font-bold py-4 rounded-2xl border border-white/5 hover:text-white transition-colors"
                >
                  Nuevo Diseño
                </button>
                <button 
                  onClick={downloadImage}
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20"
                >
                  Guardar Logo
                </button>
              </div>
            </motion.div>
          )}

          {error && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center"
            >
              <p className="text-red-400 text-sm font-medium">{error}</p>
              <button 
                onClick={generateLogo}
                className="mt-3 text-primary text-xs font-bold uppercase tracking-widest hover:underline"
              >
                Reintentar
              </button>
            </motion.div>
          )}

          {!generatedImage && !isGenerating && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square w-full border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-700"
            >
              <ImageIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-30">Tu diseño aparecerá aquí</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
            <h4 className="text-white text-xs font-bold mb-2">Tip de Diseño</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Usa palabras como "minimalista", "geométrico" o "moderno" para mejores resultados industriales.
            </p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
            <h4 className="text-white text-xs font-bold mb-2">Uso Sugerido</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Ideal para prototipos rápidos de marcas propias o identificación de líneas de producción.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
