/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { TreasureHunt } from './components/TreasureHunt';
import { QrShareModal } from './components/QrShareModal';
import { CustomizerModal } from './components/CustomizerModal';

import {
  initialConfig,
  initialPhotos,
  initialLoveMessages,
  initialFirstClue,
} from './data/initialData';
import { BirthdayConfig, PhotoMemory, FirstClueData, LoveMessage } from './types';
import { romanticAudio } from './utils/audio';
import { Heart, QrCode, Edit3 } from 'lucide-react';

export default function App() {
  // Load configuration with fallback to initialData
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem('birthday_config_v2');
      return saved ? JSON.parse(saved) : initialConfig;
    } catch {
      return initialConfig;
    }
  });

  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    try {
      const saved = localStorage.getItem('birthday_photos_v2');
      return saved ? JSON.parse(saved) : initialPhotos;
    } catch {
      return initialPhotos;
    }
  });

  const [messages, setMessages] = useState<LoveMessage[]>(() => {
    try {
      const saved = localStorage.getItem('birthday_messages_v2');
      return saved ? JSON.parse(saved) : initialLoveMessages;
    } catch {
      return initialLoveMessages;
    }
  });

  const [clueData, setClueData] = useState<FirstClueData>(() => {
    try {
      const saved = localStorage.getItem('birthday_clue_v2');
      return saved ? JSON.parse(saved) : initialFirstClue;
    } catch {
      return initialFirstClue;
    }
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#s=')) {
        const encoded = hash.substring(3);
        const json = decodeURIComponent(atob(encoded));
        const payload = JSON.parse(json);
        if (payload.cfg) {
          setConfig((prev) => ({
            ...prev,
            partnerName: payload.cfg.p || prev.partnerName,
            authorName: payload.cfg.a || prev.authorName,
            age: payload.cfg.ag || prev.age,
            birthDate: payload.cfg.b || prev.birthDate,
            greetingSubtitle: payload.cfg.sub || prev.greetingSubtitle,
            letterTitle: payload.cfg.lt || prev.letterTitle,
            letterBody: payload.cfg.lb || prev.letterBody,
            footerMessage: payload.cfg.ft || prev.footerMessage,
          }));
        }
        if (payload.clue) {
          setClueData((prev) => ({
            ...prev,
            riddleQuestion: payload.clue.q || prev.riddleQuestion,
            riddleAcceptedAnswers: payload.clue.ans || prev.riddleAcceptedAnswers,
            riddleHint: payload.clue.h || prev.riddleHint,
            clueLocation: payload.clue.loc || prev.clueLocation,
            clueDescription: payload.clue.desc || prev.clueDescription,
            clueMission: payload.clue.mis || prev.clueMission,
          }));
        }
      }
    } catch (err) {
      console.warn('Could not parse share payload from URL', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('birthday_config_v2', JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save config to localStorage', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('birthday_photos_v2', JSON.stringify(photos));
    } catch (e) {
      console.warn('Could not save photos to localStorage', e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem('birthday_messages_v2', JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save messages to localStorage', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('birthday_clue_v2', JSON.stringify(clueData));
    } catch (e) {
      console.warn('Could not save clue to localStorage', e);
    }
  }, [clueData]);

  const handleToggleMusic = () => {
    const isNowPlaying = romanticAudio.toggle();
    setIsPlayingMusic(isNowPlaying);
  };

  const handlePlayMusic = () => {
    if (!isPlayingMusic) {
      romanticAudio.play();
      setIsPlayingMusic(true);
    }
  };

  const handleScrollToTreasure = () => {
    const el = document.getElementById('tesoro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('birthday_config_v2');
    localStorage.removeItem('birthday_photos_v2');
    localStorage.removeItem('birthday_clue_v2');
    localStorage.removeItem('birthday_messages_v2');
    localStorage.removeItem('riddle_solved_v1');
    localStorage.removeItem('physical_clue_found_v1');
    setConfig(initialConfig);
    setPhotos(initialPhotos);
    setClueData(initialFirstClue);
    setMessages(initialLoveMessages);
  };

  return (
    <div className="min-h-screen bg-[#0c090a] text-stone-100 selection:bg-rose-500/30 selection:text-rose-200">
      {/* Subtle ambient light gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-amber-950/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-rose-900/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
          onOpenQr={() => setIsQrModalOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          partnerName={config.partnerName}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with days since birth counter and interactive envelope */}
          <Hero
            config={config}
            onOpenTreasure={handleScrollToTreasure}
            onPlayMusic={handlePlayMusic}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />

          {/* Photo Gallery with Polaroid Cards & Lightbox */}
          <PhotoGallery
            photos={photos}
            onAddPhoto={() => setIsCustomizerOpen(true)}
          />

          {/* Scavenger Treasure Hunt (Riddle challenge unlocking the first clue in the washing machine / lavarropas) */}
          <TreasureHunt
            clueData={clueData}
            partnerName={config.partnerName}
            authorName={config.authorName}
          />
        </main>

        {/* Floating Quick Actions */}
        <aside aria-label="Acciones rápidas" className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsCustomizerOpen(true)}
            title="Editar textos, fotos o acertijo"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 text-xs font-medium shadow-2xl transition-transform hover:scale-105 cursor-pointer border border-stone-700/80 backdrop-blur-md"
          >
            <Edit3 className="w-4 h-4 text-rose-300" />
            <span className="hidden sm:inline">Modificar Textos</span>
          </button>

          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold shadow-2xl transition-transform hover:scale-105 cursor-pointer border border-rose-400/30"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Ver / Imprimir Tarjeta QR</span>
            <span className="sm:hidden">QR</span>
          </button>
        </aside>

        {/* Editorial Footer */}
        <footer className="mt-20 border-t border-rose-950/40 bg-[#080607] py-12 px-4 sm:px-6 text-center text-xs text-stone-400">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-rose-300/80 font-serif text-sm">
              <span>Para {config.partnerName}</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>5 de Octubre · 24 Primaveras</span>
            </div>

            <p className="text-stone-400 max-w-md mx-auto text-xs leading-relaxed">
              {config.footerMessage}
            </p>

            <div className="pt-4 flex items-center justify-center gap-4 text-stone-400 text-[11px]">
              <a href="#inicio" className="hover:text-stone-300 transition-colors">Volver arriba</a>
              <span>·</span>
              <a href="#tesoro" className="hover:text-amber-400 transition-colors">Acertijo del Lavarropas</a>
              <span>·</span>
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="hover:text-rose-300 transition-colors cursor-pointer"
              >
                Editar Textos
              </button>
              <span>·</span>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="hover:text-rose-300 transition-colors cursor-pointer"
              >
                Imprimir Tarjeta QR
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <QrShareModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        config={config}
        clueData={clueData}
        messages={messages}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={setConfig}
        photos={photos}
        onSavePhotos={setPhotos}
        clueData={clueData}
        onSaveClueData={setClueData}
        messages={messages}
        onSaveMessages={setMessages}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
