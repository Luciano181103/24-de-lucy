import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FirstClueData } from '../types';
import { 
  Compass, 
  Key, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Send,
  Lock,
  Unlock,
  AlertCircle,
  Eye,
  Gift
} from 'lucide-react';
import laundryImg from '../assets/images/scavenger_laundry_hint_1790965134744.jpg';

interface TreasureHuntProps {
  clueData: FirstClueData;
  partnerName: string;
  authorName: string;
}

export const TreasureHunt: React.FC<TreasureHuntProps> = ({
  clueData,
  partnerName,
  authorName,
}) => {
  const [isRiddleSolved, setIsRiddleSolved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('riddle_solved_v1') === 'true';
    } catch {
      return false;
    }
  });

  const [hasFoundPhysicalClue, setHasFoundPhysicalClue] = useState<boolean>(() => {
    try {
      return localStorage.getItem('physical_clue_found_v1') === 'true';
    } catch {
      return false;
    }
  });

  const [answerInput, setAnswerInput] = useState<string>('');
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Normalize string for answer verification (lowercase, trim, remove accents)
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = normalize(answerInput);

    if (!cleanInput) {
      setFeedbackError('Escribe una respuesta para comprobar si acertaste.');
      return;
    }

    const isMatch = clueData.riddleAcceptedAnswers.some((ans) => {
      const cleanAns = normalize(ans);
      return cleanInput.includes(cleanAns) || cleanAns.includes(cleanInput);
    });

    if (isMatch) {
      triggerSuccess();
    } else {
      setFeedbackError('¡Mmm, no es eso! Lee con atención el acertijo o pide una pista.');
    }
  };

  const triggerSuccess = () => {
    setIsRiddleSolved(true);
    setFeedbackError(null);
    try {
      localStorage.setItem('riddle_solved_v1', 'true');
    } catch {
      // ignore
    }

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 250);
  };

  const handleRevealAnswer = () => {
    if (window.confirm('¿Quieres que te revelemos la respuesta del acertijo?')) {
      triggerSuccess();
    }
  };

  const handleConfirmFoundPhysical = () => {
    setHasFoundPhysicalClue(true);
    try {
      localStorage.setItem('physical_clue_found_v1', 'true');
    } catch {
      // ignore
    }

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#ec4899', '#10b981', '#fbbf24'],
    });
  };

  return (
    <section id="tesoro" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-rose-950/40">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          <span>La Gran Búsqueda de Cumpleaños</span>
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-bold mb-4">
          La Búsqueda del Tesoro
        </h2>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Tu sorpresa final te espera escondida en algún lugar de la casa... Para iniciar tu camino, <strong className="text-amber-300 font-semibold">debes resolver el siguiente acertijo y desbloquear tu primera pista</strong>.
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="bg-gradient-to-b from-stone-900 via-stone-900/95 to-stone-950 border border-amber-900/40 rounded-3xl overflow-hidden shadow-2xl">
        {!isRiddleSolved ? (
          /* STATE 1: Riddle Question to unlock clue 1 */
          <div className="p-6 sm:p-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Lock className="w-4 h-4" />
                <span>Paso 1: Resuelve el Acertijo para Desbloquear la Primera Pista</span>
              </div>
              <span className="text-xs text-stone-500 font-mono">1 / 1 Pista Web</span>
            </div>

            {/* The Riddle Box */}
            <div className="bg-[#171412] p-6 sm:p-8 rounded-2xl border border-amber-900/40 mb-6 shadow-inner relative">
              <div className="text-amber-500/30 text-4xl font-serif absolute top-3 left-4">“</div>
              <p className="font-serif text-lg sm:text-2xl text-stone-100 leading-relaxed italic relative z-10 px-4 text-center">
                {clueData.riddleQuestion}
              </p>
              <div className="text-amber-500/30 text-4xl font-serif text-right pr-4">”</div>
            </div>

            {/* Optional Hint */}
            <div className="mb-6 text-center">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-400/90 hover:text-amber-300 inline-flex items-center gap-1.5 font-medium cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>¿Necesitas una pista de ayuda?</span>
                </button>
              ) : (
                <div className="bg-amber-950/30 border border-amber-800/50 p-4 rounded-xl text-xs text-amber-200/90 leading-relaxed max-w-lg mx-auto flex items-start gap-2.5 text-left animate-fadeIn">
                  <Eye className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pista de ayuda:</strong> {clueData.riddleHint}
                  </div>
                </div>
              )}
            </div>

            {/* Answer Form */}
            <form onSubmit={handleAnswerSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-xs text-stone-300 font-medium mb-2 text-center">
                  ¿Cuál es tu respuesta?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => {
                      setAnswerInput(e.target.value);
                      setFeedbackError(null);
                    }}
                    placeholder="Escribe aquí tu respuesta..."
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer shadow-lg"
                  >
                    <span>Comprobar</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {feedbackError && (
                <div className="text-xs text-rose-400 flex items-center justify-center gap-1.5 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{feedbackError}</span>
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleRevealAnswer}
                  className="text-[11px] text-stone-500 hover:text-stone-400 underline transition-colors cursor-pointer"
                >
                  ¿Te rendiste? Ver respuesta directa
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* STATE 2: Riddle Solved! First Clue Revealed (In the washing machine / lavarropas) */
          <div className="grid grid-cols-1 lg:grid-cols-12 animate-fadeIn">
            {/* Image & location */}
            <div className="lg:col-span-5 relative bg-stone-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                  <Unlock className="w-4 h-4" />
                  <span>¡Acertijo Superado con Éxito!</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
                  {clueData.clueLocation}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Destino de la Primera Pista</span>
                </div>
              </div>

              {/* Photo of the Laundry Nook */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden my-4 border border-stone-800 shadow-md">
                <img
                  src={laundryImg}
                  alt={clueData.clueLocation}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-xs text-amber-200 font-serif italic">
                    🧺 Tu primera pista física está escondida aquí
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-400 font-mono flex items-center justify-between">
                <span>Preparado por {authorName}</span>
                <span className="text-emerald-400">Pista 1 Desbloqueada</span>
              </div>
            </div>

            {/* Instructions side */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    {clueData.clueTitle}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Acertijo Resuelto
                  </span>
                </div>

                <div className="bg-[#171412] p-6 rounded-2xl border border-amber-900/30 mb-6 shadow-inner space-y-3">
                  <p className="font-serif text-lg sm:text-xl text-stone-100 leading-relaxed">
                    {clueData.clueDescription}
                  </p>
                  <p className="font-serif text-base sm:text-lg text-amber-300 leading-relaxed italic">
                    {clueData.clueMission}
                  </p>
                </div>

                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed flex items-start gap-2.5 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Instrucción importante:</strong> {clueData.physicalNoteReminder}
                  </div>
                </div>
              </div>

              {/* Physical check button */}
              <div className="pt-6 border-t border-stone-800">
                {!hasFoundPhysicalClue ? (
                  <button
                    onClick={handleConfirmFoundPhysical}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>¡Ya fui al lavarropas y tengo la nota en mis manos!</span>
                  </button>
                ) : (
                  <div className="bg-emerald-950/40 border border-emerald-800/60 p-5 rounded-2xl text-center space-y-2 animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center mx-auto text-white shadow-lg">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-white">
                      ¡Comenzó tu búsqueda física, {partnerName}!
                    </h4>
                    <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                      Lee atentamente la nota del lavarropas para encontrar la siguiente parada. Cada pista te irá acercando a tu gran sorpresa de 24 años. ¡Mucha suerte!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
