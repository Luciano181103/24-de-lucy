import React from 'react';
import { Volume2, VolumeX, QrCode, Settings } from 'lucide-react';

interface NavbarProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenQr: () => void;
  onOpenCustomizer: () => void;
  partnerName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onOpenQr,
  onOpenCustomizer,
  partnerName,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c090a]/85 border-b border-rose-950/40 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#inicio" 
          className="font-serif text-lg sm:text-xl tracking-wide text-rose-100/90 hover:text-rose-200 transition-colors whitespace-nowrap"
        >
          {partnerName} · 24 Años
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium tracking-wide text-stone-300">
          <a href="#inicio" className="hover:text-rose-300 transition-colors">
            Inicio
          </a>
          <a href="#recuerdos" className="hover:text-rose-300 transition-colors">
            Recuerdos
          </a>
          <a href="#tesoro" className="text-amber-300/90 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1.5">
            Búsqueda del Tesoro
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pausar melodía suave' : 'Reproducir melodía suave'}
            aria-label="Alternar música romántica"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-800/30 transition-colors cursor-pointer"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-rose-300" />
                <span className="hidden sm:inline">Música</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Música</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenQr}
            title="Ver código QR para imprimir o escanear"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Código QR</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            title="Personalizar datos, fotos o pistas"
            aria-label="Ajustes de personalización"
            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-200 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
