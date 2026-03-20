import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, Loader2, Image as ImageIcon, Download, Paperclip, X, FileText, History, Trash2, Maximize2 } from 'lucide-react';

interface DesignHistory {
  id: string;
  prompt: string;
  image: string;
  date: number;
}

export default function ChatbotScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; data: string; type: string } | null>(null);
  const [history, setHistory] = useState<DesignHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = 1000;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jabel_design_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jabel_design_history', JSON.stringify(history));
  }, [history]);

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

  const addWatermark = (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const logo = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx?.drawImage(img, 0, 0);
        
        // Load logo
        logo.crossOrigin = "anonymous";
        logo.src = "https://jabelpack.com/wp-content/uploads/2022/01/logo-jabel-01-1.png";
        
        logo.onload = () => {
          if (ctx) {
            // Calculate logo size (e.g., 15% of image width)
            const logoWidth = canvas.width * 0.2;
            const logoHeight = (logo.height / logo.width) * logoWidth;
            
            // Set transparency for watermark
            ctx.globalAlpha = 0.4;
            
            // Draw logo in bottom right corner
            const padding = 20;
            ctx.drawImage(
              logo, 
              canvas.width - logoWidth - padding, 
              canvas.height - logoHeight - padding, 
              logoWidth, 
              logoHeight
            );
            
            // Add text watermark too for extra security
            ctx.globalAlpha = 0.3;
            ctx.font = `${Math.max(12, canvas.width * 0.02)}px sans-serif`;
            ctx.fillStyle = "black";
            ctx.fillText("Jabel Pack AI Concept", padding, canvas.height - padding);
          }
          resolve(canvas.toDataURL('image/png'));
        };
        
        logo.onerror = () => {
          // If logo fails to load, just add text watermark
          if (ctx) {
            ctx.globalAlpha = 0.3;
            ctx.font = `${Math.max(12, canvas.width * 0.03)}px sans-serif`;
            ctx.fillStyle = "black";
            ctx.fillText("Jabel Pack AI Concept", 20, canvas.height - 20);
          }
          resolve(canvas.toDataURL('image/png'));
        };
      };
      
      img.src = base64Image;
    });
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
          const rawImage = `data:image/png;base64,${base64Data}`;
          
          // Add watermark
          const watermarkedImage = await addWatermark(rawImage);
          
          setGeneratedImage(watermarkedImage);
          
          // Add to history
          const newDesign: DesignHistory = {
            id: Date.now().toString(),
            prompt: prompt || 'Diseño industrial',
            image: watermarkedImage,
            date: Date.now()
          };
          setHistory(prev => [newDesign, ...prev]);
          
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

  const downloadImage = (imgSrc?: string) => {
    const target = imgSrc || generatedImage;
    if (!target) return;
    const link = document.createElement('a');
    link.href = target;
    link.download = `jabel-pack-etiqueta-${Date.now()}.png`;
    link.click();
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    if (confirm("¿Estás seguro de que deseas borrar todo el historial de diseños?")) {
      setHistory([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-32 px-6 pt-8 bg-black min-h-screen"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-primary" size={24} />
            <h2 className="text-3xl font-extrabold text-white">IA</h2>
          </div>
          <p className="text-slate-400">Genera ideas de etiquetas industriales con logos. <span className="text-primary font-bold italic">¡Innovación en cada empaque!</span></p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`size-12 rounded-2xl flex items-center justify-center transition-all ${showHistory ? 'bg-primary text-white' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
          >
            <History size={20} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-xl">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
            Detalles de la etiqueta y marca
          </label>
          
          <div className="relative mb-4">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  generateLabelIdea();
                }
              }}
              placeholder="Ej: Etiqueta para envase de lubricante industrial, fondo plata, logo circular azul..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all min-h-[128px] max-h-[400px] overflow-y-auto resize-none"
            />
            <div className="absolute top-3 right-3">
              {prompt && (
                <button 
                  onClick={() => setPrompt('')}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="absolute bottom-3 right-4 flex items-center gap-3 pointer-events-none">
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg border backdrop-blur-sm transition-colors ${
                prompt.length >= MAX_CHARS ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-slate-500 border-white/5 bg-black/60'
              }`}>
                {prompt.length} / {MAX_CHARS}
              </span>
            </div>
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
        </div>

        {/* History View */}
        <AnimatePresence>
          {showHistory && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-xl mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <History size={16} className="text-primary" />
                    Historial de Diseños
                  </h3>
                  <button 
                    onClick={clearHistory}
                    className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Borrar Todo
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {history.map((item) => {
                    const isActive = item.image === generatedImage;
                    return (
                      <motion.div 
                        key={item.id}
                        layoutId={item.id}
                        onClick={() => {
                          setGeneratedImage(item.image);
                          setPrompt(item.prompt);
                          setShowHistory(false);
                        }}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                          isActive 
                            ? 'border-primary bg-slate-800 ring-2 ring-primary/20' 
                            : 'border-white/5 bg-black hover:border-primary/50'
                        }`}
                      >
                        <img src={item.image} alt={item.prompt} className={`w-full h-full object-cover p-2 transition-transform duration-500 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`} />
                        
                        {isActive && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                              <div className="size-1 bg-white rounded-full animate-pulse" />
                              Activo
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-center">
                          <p className="text-[8px] text-white font-bold line-clamp-2">{item.prompt}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); downloadImage(item.image); }}
                              className="size-8 bg-primary rounded-lg flex items-center justify-center text-white"
                            >
                              <Download size={14} />
                            </button>
                            <button 
                              onClick={(e) => deleteHistoryItem(item.id, e)}
                              className="size-8 bg-red-500 rounded-lg flex items-center justify-center text-white"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="aspect-square w-full bg-slate-900 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-6 relative overflow-hidden"
            >
              {/* Background pulse */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
              />
              
              <div className="relative">
                <div className="size-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-primary animate-pulse" size={32} />
                </div>
              </div>
              
              <div className="text-center space-y-2 z-10">
                <p className="text-white font-bold text-lg tracking-tight">Procesando Diseño</p>
                <div className="flex items-center justify-center gap-1">
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="size-1.5 bg-primary rounded-full"
                  />
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="size-1.5 bg-primary rounded-full"
                  />
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="size-1.5 bg-primary rounded-full"
                  />
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] mx-auto">
                  Integrando marca y especificaciones técnicas
                </p>
              </div>
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
                    onClick={() => downloadImage()}
                    className="bg-white text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <Download size={18} />
                    Descargar Diseño
                  </button>
                </div>
                {/* Watermark Overlay for UI */}
                <div className="absolute bottom-4 left-4 pointer-events-none opacity-50">
                   <p className="text-[8px] font-bold text-black uppercase tracking-widest">Jabel Pack AI Concept</p>
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
                  onClick={() => downloadImage()}
                  className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20"
                >
                  Descargar Propuesta
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
