import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, Loader2, Image as ImageIcon, Download, Paperclip, X, FileText } from 'lucide-react';

export default function ChatbotScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; data: string; type: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = (event.target?.result as string).split(',')[1];
      setAttachedFile({
        name: file.name,
        data: base64Data,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateLabelIdea = async () => {
    if (!prompt.trim() && !attachedFile) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const parts: any[] = [
        {
          text: `Genera una idea visual de etiqueta industrial profesional que incluya un logo.
                 Descripción del producto/marca: ${prompt || 'Diseño industrial estándar'}.
                 Requisitos: La etiqueta debe ser clara, con espacios para códigos de barras, información técnica y el logo.
                 Estilo: Minimalista, profesional, apto para impresión en diversos materiales (térmico, polipropileno, etc.).
                 Si se proporciona una imagen adjunta, úsala como el logo o inspiración principal para la etiqueta.`,
        }
      ];

      if (attachedFile && attachedFile.type.startsWith('image/')) {
        parts.push({
          inlineData: {
            data: attachedFile.data,
            mimeType: attachedFile.type
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
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
        throw new Error("No se pudo generar la idea de etiqueta. Intenta con una descripción más detallada.");
      }
    } catch (err: any) {
      console.error("Error generating label:", err);
      setError(err.message || "Ocurrió un error al generar el diseño.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `jabel-pack-etiqueta-${Date.now()}.png`;
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
          <h2 className="text-3xl font-extrabold text-white">IA</h2>
        </div>
        <p className="text-slate-400">Genera ideas de etiquetas industriales con logos. Adjunta tu logo actual o describe tu visión. <span className="text-primary font-bold italic">¡Innovación en cada empaque!</span></p>
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-xl">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
            Detalles de la etiqueta y marca
          </label>
          
          <div className="relative mb-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Etiqueta para envase de lubricante industrial, fondo plata, logo circular azul..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all resize-none h-32"
            />
          </div>

          {/* File Upload Section */}
          <div className="flex items-center gap-3 mb-4">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors border border-white/5"
            >
              <Paperclip size={16} />
              Adjuntar Logo/PDF
            </button>

            <AnimatePresence>
              {attachedFile && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-primary text-[10px] font-bold"
                >
                  {attachedFile.type.includes('pdf') ? <FileText size={12} /> : <ImageIcon size={12} />}
                  <span className="max-w-[100px] truncate">{attachedFile.name}</span>
                  <button onClick={removeFile} className="hover:text-white">
                    <X size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={generateLabelIdea}
            disabled={isGenerating || (!prompt.trim() && !attachedFile)}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-800 disabled:text-slate-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generando Propuesta...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generar Idea de Etiqueta
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-500 mt-3 px-1 italic">
            * La IA integrará tu logo o descripción en un concepto de etiqueta técnica.
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
              <p className="text-slate-400 font-bold text-sm animate-pulse">Diseñando etiqueta...</p>
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
                  alt="Idea de etiqueta generada" 
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={downloadImage}
                    className="bg-white text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <Download size={18} />
                    Descargar Diseño
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="flex-1 bg-slate-900 text-slate-400 font-bold py-4 rounded-2xl border border-white/5 hover:text-white transition-colors"
                >
                  Nueva Idea
                </button>
                <button 
                  onClick={downloadImage}
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20"
                >
                  Guardar Propuesta
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
                onClick={generateLabelIdea}
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
              <p className="text-xs font-bold uppercase tracking-widest opacity-30">Tu propuesta aparecerá aquí</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
            <h4 className="text-white text-xs font-bold mb-2">Tip de Etiquetas</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Adjunta tu logo en alta resolución para que la IA lo integre mejor en el diseño de la etiqueta.
            </p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
            <h4 className="text-white text-xs font-bold mb-2">Especificaciones</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Menciona el tamaño de la etiqueta o el tipo de envase para un diseño más preciso.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
