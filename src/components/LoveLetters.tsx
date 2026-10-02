import React, { useState } from 'react';
import { LoveMessage } from '../types';
import { Heart, Sparkles, Quote, BookOpen } from 'lucide-react';

interface LoveLettersProps {
  messages: LoveMessage[];
  partnerName: string;
}

export const LoveLetters: React.FC<LoveLettersProps> = ({ messages, partnerName }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(messages.map((m) => m.category)))];

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredMessages =
    activeCategory === 'all'
      ? messages
      : messages.filter((m) => m.category === activeCategory);

  return (
    <section id="mensajes" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-stone-850">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300/90 font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Palabras que Salen del Corazón</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 mb-4">
          Lo que Haces Sentir en Mi Vida
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Cada año que cumples confirma lo afortunado que soy al compartir mis días con una mujer tan increíble, dulce y auténtica.
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-rose-900/60 text-rose-100 border border-rose-700/50 shadow-sm'
                : 'bg-stone-900/40 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {cat === 'all' ? 'Todos los Mensajes' : cat}
          </button>
        ))}
      </div>

      {/* Message Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMessages.map((msg) => {
          const isFav = favoriteIds.includes(msg.id);
          return (
            <div
              key={msg.id}
              className="group relative bg-stone-900/70 backdrop-blur-sm border border-stone-800 hover:border-rose-800/60 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs text-rose-300/90">
                    <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                    <span>{msg.category}</span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(msg.id)}
                    aria-label="Marcar como favorito"
                    className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        isFav ? 'text-rose-500 fill-rose-500 scale-110' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-serif text-2xl text-stone-100 font-semibold mb-3">
                  {msg.title}
                </h3>

                <div className="relative">
                  <Quote className="w-6 h-6 text-stone-700/40 absolute -top-2 -left-2 -z-0 pointer-events-none" />
                  <p className="font-serif text-base sm:text-lg text-stone-300 leading-relaxed italic relative z-10 pl-2">
                    {msg.text}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span>Dedicado para {partnerName}</span>
                <span className="font-mono">24 Años</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
