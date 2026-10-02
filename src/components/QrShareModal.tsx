import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Printer, Copy, Check, QrCode as QrIcon, Download, Heart, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { BirthdayConfig, FirstClueData, LoveMessage } from '../types';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  clueData?: FirstClueData;
  messages?: LoveMessage[];
}

export const QrShareModal: React.FC<QrShareModalProps> = ({
  isOpen,
  onClose,
  config,
  clueData,
  messages,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Build reliable share URL with encoded payload so her phone receives all customized texts
    let url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    
    try {
      if (config && clueData) {
        const payload = {
          cfg: {
            p: config.partnerName,
            a: config.authorName,
            ag: config.age,
            b: config.birthDate,
            sub: config.greetingSubtitle,
            lt: config.letterTitle,
            lb: config.letterBody,
            ft: config.footerMessage,
          },
          clue: {
            q: clueData.riddleQuestion,
            ans: clueData.riddleAcceptedAnswers,
            h: clueData.riddleHint,
            loc: clueData.clueLocation,
            desc: clueData.clueDescription,
            mis: clueData.clueMission,
          },
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
        url = `${url}#s=${encoded}`;
      }
    } catch {
      url = typeof window !== 'undefined' ? window.location.href : '';
    }

    setShareUrl(url);

    // Generate high resolution QR code
    QRCode.toDataURL(
      url,
      {
        width: 480,
        margin: 2,
        color: {
          dark: '#0c090a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      },
      (err, qrUrl) => {
        if (!err && qrUrl) {
          setQrDataUrl(qrUrl);
        }
      }
    );
  }, [isOpen, config, clueData]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-stone-950 border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
          <QrIcon className="w-4 h-4" />
          <span>Acceso por Código QR</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
          Cómo hacer funcionar la sorpresa en 4 pasos
        </h3>

        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
          La página ya está funcionando en vivo. Sigue esta guía para preparar la experiencia real para el <strong className="text-rose-300">5 de Octubre</strong>:
        </p>

        {/* Step by step guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center text-[11px]">1</span>
              <span>Personaliza tus datos</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              Toca "Modificar Textos" si quieres cambiar su nombre, fecha o fotos.
            </p>
          </div>

          <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-rose-300 font-semibold">
              <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-500/50 flex items-center justify-center text-[11px]">2</span>
              <span>Imprime o guarda el QR</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              Descarga el QR o pulsa "Imprimir Tarjeta" para recortar una linda postal.
            </p>
          </div>

          <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[11px]">3</span>
              <span>Prepara el lavarropas</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              Escribe en un papel la Pista #2 física y escóndela dentro del lavarropas.
            </p>
          </div>

          <div className="p-3.5 bg-stone-900/60 rounded-xl border border-stone-800 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500/50 flex items-center justify-center text-[11px]">4</span>
              <span>¡Día de la sorpresa!</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              El 5 de octubre dale la tarjeta; al escanearla con su móvil, ¡comienza el juego!
            </p>
          </div>
        </div>

        {/* Printable Physical Card Cardboard preview */}
        <div
          ref={printRef}
          className="bg-[#fcfbf9] text-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-300 shadow-xl mb-6 relative overflow-hidden"
        >
          {/* Subtle decorative border */}
          <div className="border border-dashed border-rose-400/60 p-4 rounded-xl text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-rose-700 text-xs uppercase tracking-wider font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Sorpresa de Cumpleaños #24</span>
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            </div>

            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
              Para ti, {config.partnerName}
            </div>

            <div className="text-xs text-stone-600 font-serif italic mb-4">
              5 de Octubre · Una sorpresa especial te espera
            </div>

            {/* QR Image Container */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-inner mb-4">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Código QR de Cumpleaños"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain mx-auto"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400">
                  Generando QR...
                </div>
              )}
            </div>

            <p className="text-xs text-stone-700 font-medium max-w-xs leading-snug">
              📱 Abre la cámara de tu teléfono, apunta a este código y prepárate para comenzar tu búsqueda del tesoro.
            </p>

            <div className="mt-3 pt-2 border-t border-stone-200/80 text-[11px] text-stone-500 font-serif italic">
              Con todo mi amor, {config.authorName} ❤️
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Tarjeta</span>
            </button>

            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download={`QR_Cumpleaños_${config.partnerName}.png`}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Imagen QR</span>
              </a>
            )}
          </div>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-xl text-xs font-medium flex items-center gap-2 border border-stone-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Enlace copiado!' : 'Copiar enlace directo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
