import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, Compass, Mail, LockOpen, Clock } from 'lucide-react';
import { BirthdayConfig } from '../types';
import heroImg from '../assets/images/birthday_celebration_hero_1790965104676.jpg';

interface HeroProps {
  config: BirthdayConfig;
  onOpenTreasure: () => void;
  onPlayMusic: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenTreasure, onPlayMusic, onOpenCustomizer }) => {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<{
    totalDays: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    totalDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateElapsedSinceBirth = () => {
      // Birth date e.g. "2002-10-05T00:00:00"
      const birth = new Date(`${config.birthDate}T00:00:00`);
      const now = new Date();
      const diff = now.getTime() - birth.getTime();

      if (diff > 0) {
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setElapsedTime({ totalDays, hours, minutes, seconds });
      }
    };

    calculateElapsedSinceBirth();
    const interval = setInterval(calculateElapsedSinceBirth, 1000);
    return () => clearInterval(interval);
  }, [config.birthDate]);

  const handleOpenEnvelope = () => {
    setIsLetterOpened(true);
    onPlayMusic();

    // Burst celebratory confetti
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-16">
      {/* Background Image with warm cinematic scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Celebración romántica de cumpleaños"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial from-rose-950/20 via-transparent to-[#0c090a]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle date & anniversary banner without pills */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm tracking-widest uppercase font-medium text-rose-300/90 mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          <span>5 de Octubre</span>
          <span aria-hidden="true" className="text-rose-500/50">·</span>
          <span>Celebrando Tus {config.age} Años</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        {/* Display headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.08] max-w-3xl">
          ¡Felices <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300">{config.age} Años</span>, {config.partnerName}!
        </h1>

        <p className="text-base sm:text-lg text-stone-300/90 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          {config.greetingSubtitle}
        </p>

        {/* Contador de días desde que nació */}
        <div className="mb-10 w-full max-w-lg bg-stone-900/75 backdrop-blur-md border border-rose-900/40 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-rose-300/90 font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Días iluminando este mundo desde que naciste:</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 text-center font-mono tabular-nums">
            <div className="bg-stone-950/80 py-2.5 px-1 rounded-xl border border-stone-800/80 shadow-inner">
              <span className="block text-2xl sm:text-3xl font-bold text-amber-300 tracking-tight">
                {elapsedTime.totalDays.toLocaleString('es-ES')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">DÍAS</span>
            </div>
            <div className="bg-stone-950/80 py-2.5 px-1 rounded-xl border border-stone-800/80 shadow-inner">
              <span className="block text-2xl sm:text-3xl font-bold text-rose-200">
                {String(elapsedTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">HORAS</span>
            </div>
            <div className="bg-stone-950/80 py-2.5 px-1 rounded-xl border border-stone-800/80 shadow-inner">
              <span className="block text-2xl sm:text-3xl font-bold text-rose-200">
                {String(elapsedTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">MIN</span>
            </div>
            <div className="bg-stone-950/80 py-2.5 px-1 rounded-xl border border-stone-800/80 shadow-inner">
              <span className="block text-2xl sm:text-3xl font-bold text-rose-300">
                {String(elapsedTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium">SEG</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-stone-400 flex items-center justify-center gap-1.5 font-sans">
            <span>Cada segundo a tu lado es un regalo</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300/80">Naciste el 5 de Octubre</span>
          </div>
        </div>

        {/* Envelope Interaction */}
        {!isLetterOpened ? (
          <div className="w-full max-w-lg mb-8">
            <button
              onClick={handleOpenEnvelope}
              className="group relative w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-rose-900/40 hover:border-rose-500/50 shadow-2xl transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-medium tracking-wide">
                    <Mail className="w-4 h-4" />
                    <span>SOBRE CONFIDENCIAL DE CUMPLEAÑOS</span>
                  </div>
                  <h2 className="font-serif text-2xl text-stone-100 group-hover:text-rose-200 transition-colors">
                    {config.letterTitle || 'Carta especial para ti...'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    Preparé esto con todo mi corazón. Toca aquí para abrir el sello y leer tus primeras palabras de sorpresa.
                  </p>
                </div>
                
                {/* Wax seal simulation */}
                <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border border-rose-400/50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-rose-200 fill-rose-200/80 animate-pulse" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>De: {config.authorName}</span>
                <span className="text-rose-300 font-medium group-hover:underline flex items-center gap-1">
                  Abrir sobre <Sparkles className="w-3 h-3" />
                </span>
              </div>
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl mb-8 text-left bg-gradient-to-b from-stone-900/95 via-stone-900/90 to-stone-950/95 border border-rose-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-rose-900/30 mb-5">
              <div className="flex items-center gap-2 text-rose-300 text-xs tracking-wider uppercase font-medium">
                <LockOpen className="w-4 h-4 text-rose-400" />
                <span>Sobre abierto con amor</span>
              </div>
              <span className="text-xs text-stone-400 font-serif italic">5 de Octubre · 24 Primaveras</span>
            </div>

            <div className="space-y-4 font-serif text-stone-200 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {config.letterBody}
              <div className="italic text-stone-400 text-sm font-sans pt-3 border-t border-stone-800">
                — Siempre tuyo, {config.authorName} ❤️
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={onOpenTreasure}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 hover:from-amber-500 hover:to-rose-500 text-white font-medium text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4 text-amber-200" />
                <span>¡Ir al Acertijo de la Primera Pista!</span>
              </button>
              
              <a
                href="#recuerdos"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-sm text-center transition-colors"
              >
                Ver galería de fotos
              </a>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <a
          href="#recuerdos"
          className="mt-4 flex flex-col items-center gap-1 text-xs text-stone-400 hover:text-rose-300 transition-colors"
        >
          <span>Desliza para ver más</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
