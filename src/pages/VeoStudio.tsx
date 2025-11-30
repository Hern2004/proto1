
import React, { useState, useRef } from 'react';
import { GlassCard, Button, SectionHeading, Badge } from '../components/UI';
import { generateVeoVideo } from '../services/veoService';
import { Video, Upload, Play, Loader2, Download, AlertCircle, Film, Image as ImageIcon } from 'lucide-react';

interface VeoStudioProps {
    lang?: 'zh' | 'en';
}

const VeoStudio: React.FC<VeoStudioProps> = ({ lang = 'zh' }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Extract Base64 (remove data:image/xxx;base64, prefix)
        const base64 = result.split(',')[1];
        setImage({
          base64,
          mimeType: file.type,
          preview: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setError(null);
    setResultVideoUrl(null);

    try {
      const videoUrl = await generateVeoVideo({
        prompt,
        image: image?.base64,
        mimeType: image?.mimeType,
        aspectRatio
      });
      setResultVideoUrl(videoUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Video generation failed. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <SectionHeading 
        title="Veo Studio" 
        subtitle="Use Google Veo (v3.1) to generate high-quality AI videos. Supports Text-to-Video and Image-to-Video."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Film size={20} className="text-indigo-600"/> Creative Config
            </h3>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
              <textarea 
                className="w-full p-4 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all min-h-[120px]"
                placeholder="Describe the video you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image (Optional)</label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <div className="relative z-10">
                    <img src={image.preview} alt="Preview" className="h-48 mx-auto rounded-lg shadow-sm object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-sm font-medium flex items-center gap-2"><Upload size={16}/> Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon size={32} className="mb-2"/>
                    <span className="text-sm">Click to upload image (Image-to-Video)</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${aspectRatio === '16:9' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="w-6 h-3.5 border-2 border-current rounded-sm"></div>
                  16:9 Landscape
                </button>
                <button 
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${aspectRatio === '9:16' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="w-3.5 h-6 border-2 border-current rounded-sm"></div>
                  9:16 Portrait
                </button>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!prompt || isGenerating}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200"
            >
              {isGenerating ? (
                <><Loader2 size={18} className="animate-spin mr-2"/> Generating...</>
              ) : (
                <><Video size={18} className="mr-2"/> Start Generation</>
              )}
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Note: Veo generation takes 1-2 minutes. Please keep tab open. Requires Paid API Key.
            </p>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-6">
          <GlassCard className="p-6 h-full min-h-[500px] flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Play size={20} className="text-green-600"/> Result Preview
            </h3>
            
            <div className="flex-1 bg-black/5 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 relative">
              {resultVideoUrl ? (
                <video 
                  src={resultVideoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  className="max-h-[600px] w-full h-full object-contain bg-black"
                />
              ) : isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-gray-500 font-medium">AI is generating frames...</p>
                  <p className="text-xs text-gray-400">Model: veo-3.1-fast-generate-preview</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Film size={48} className="mx-auto mb-4 opacity-20"/>
                  <p>Generated video will appear here</p>
                </div>
              )}
            </div>

            {resultVideoUrl && (
              <div className="mt-6 flex justify-end">
                <a href={resultVideoUrl} download="veo-generated-video.mp4">
                  <Button variant="secondary">
                    <Download size={18} className="mr-2"/> Download
                  </Button>
                </a>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default VeoStudio;
