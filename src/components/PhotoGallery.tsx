import React, { useState } from 'react';
import { PhotoMemory } from '../types';
import { Camera, X, ChevronLeft, ChevronRight, Plus, Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  photos: PhotoMemory[];
  onAddPhoto: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddPhoto }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section id="recuerdos" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-stone-800/80 pb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-2">
            Nuestros Momentos Inolvidables
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100">
            Galería de Recuerdos & Risas
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onAddPhoto}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-stone-900 border border-stone-700/80 text-rose-200 hover:text-white hover:border-rose-500/50 hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar / Cambiar Foto</span>
          </button>
        </div>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          const rotationClass =
            index % 4 === 0
              ? '-rotate-1 hover:rotate-0'
              : index % 4 === 1
              ? 'rotate-2 hover:rotate-0'
              : index % 4 === 2
              ? '-rotate-2 hover:rotate-0'
              : 'rotate-1 hover:rotate-0';

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className={`group cursor-pointer transition-all duration-300 transform ${rotationClass} hover:scale-[1.03] hover:z-20`}
            >
              <div className="bg-[#fcfbf9] text-stone-900 p-3.5 pb-6 rounded-sm shadow-xl shadow-black/40 border border-stone-300/40 relative">
                {/* Simulated washi tape on top of polaroid */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-rose-200/50 backdrop-blur-[1px] rotate-[-2deg] border border-rose-300/30 pointer-events-none" />

                {/* Photo container */}
                <div className="relative aspect-[4/5] bg-stone-200 overflow-hidden rounded-xs mb-3">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle hover icon overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm flex items-center gap-1.5 font-sans">
                      <Camera className="w-3.5 h-3.5" />
                      Ampliar
                    </span>
                  </div>
                </div>

                {/* Polaroid handwritten-style metadata */}
                <div className="px-1 text-center">
                  <h3 className="font-serif font-bold text-stone-800 text-lg leading-snug">
                    {photo.title}
                  </h3>
                  {photo.date && (
                    <div className="text-[11px] font-sans text-stone-600 mt-1 uppercase tracking-wider">
                      {photo.date}
                    </div>
                  )}
                  <p className="text-xs font-serif italic text-stone-700 mt-2 line-clamp-2">
                    "{photo.caption}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Cerrar vista"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media side */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-900/80 transition-colors cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-900/80 transition-colors cursor-pointer"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Content info side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-stone-900/90 text-stone-100">
              <div>
                <div className="text-xs text-rose-400 uppercase tracking-widest font-semibold mb-1">
                  {photos[selectedPhotoIndex].date || 'Recuerdo Especial'}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">
                  {photos[selectedPhotoIndex].title}
                </h3>
                <p className="font-serif text-base sm:text-lg text-stone-300 leading-relaxed italic mb-6">
                  "{photos[selectedPhotoIndex].caption}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between font-mono tabular-nums">
                <span>Foto {selectedPhotoIndex + 1} de {photos.length}</span>
                <span className="text-stone-300">5 de Octubre · 24 Años</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
