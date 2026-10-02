import React, { useState } from 'react';
import { X, Save, RotateCcw, Upload, Plus, Trash2, Check, Sparkles, BookOpen, MessageSquare, Compass, Image as ImageIcon } from 'lucide-react';
import { BirthdayConfig, PhotoMemory, FirstClueData, LoveMessage } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
  photos: PhotoMemory[];
  onSavePhotos: (newPhotos: PhotoMemory[]) => void;
  clueData: FirstClueData;
  onSaveClueData: (newClueData: FirstClueData) => void;
  messages: LoveMessage[];
  onSaveMessages: (newMessages: LoveMessage[]) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  photos,
  onSavePhotos,
  clueData,
  onSaveClueData,
  messages,
  onSaveMessages,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'letter' | 'riddle' | 'messages' | 'photos'>('general');
  const [tempConfig, setTempConfig] = useState<BirthdayConfig>({ ...config });
  const [tempClue, setTempClue] = useState<FirstClueData>({ ...clueData });
  const [tempMessages, setTempMessages] = useState<LoveMessage[]>([...messages]);
  const [tempPhotos, setTempPhotos] = useState<PhotoMemory[]>([...photos]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New photo draft state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // New message draft state
  const [newMsgCategory, setNewMsgCategory] = useState('');
  const [newMsgTitle, setNewMsgTitle] = useState('');
  const [newMsgText, setNewMsgText] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl && !newPhotoTitle) return;
    const newEntry: PhotoMemory = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
      title: newPhotoTitle || 'Momento especial',
      caption: newPhotoCaption || 'Un instante que guardo en mi corazón.',
      date: newPhotoDate || '5 de Octubre',
      rotation: Math.floor(Math.random() * 5) - 2,
    };
    setTempPhotos([newEntry, ...tempPhotos]);
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoDate('');
    setNewPhotoUrl('');
  };

  const handleDeletePhoto = (id: string) => {
    setTempPhotos(tempPhotos.filter((p) => p.id !== id));
  };

  const handleAddMessage = () => {
    if (!newMsgTitle || !newMsgText) return;
    const newMsg: LoveMessage = {
      id: `msg-${Date.now()}`,
      category: newMsgCategory || 'Especial para ti',
      title: newMsgTitle,
      text: newMsgText,
    };
    setTempMessages([...tempMessages, newMsg]);
    setNewMsgCategory('');
    setNewMsgTitle('');
    setNewMsgText('');
  };

  const handleDeleteMessage = (id: string) => {
    setTempMessages(tempMessages.filter((m) => m.id !== id));
  };

  const handleSaveAll = () => {
    onSaveConfig(tempConfig);
    onSaveClueData(tempClue);
    onSaveMessages(tempMessages);
    onSavePhotos(tempPhotos);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-stone-950 border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalización Total</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Modifica Todos los Textos, Acertijo y Fotos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 py-3 border-b border-stone-800/80 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'general'
                ? 'bg-rose-950/70 text-rose-200 border border-rose-800/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            1. Contador & Portada
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-rose-950/70 text-rose-200 border border-rose-800/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            2. Carta del Sobre
          </button>
          <button
            onClick={() => setActiveTab('riddle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'riddle'
                ? 'bg-rose-950/70 text-rose-200 border border-rose-800/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            3. Acertijo & Pista 1 (Lavarropas)
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-rose-950/70 text-rose-200 border border-rose-800/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            4. Palabras de Amor ({tempMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-rose-950/70 text-rose-200 border border-rose-800/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            5. Fotos Reales ({tempPhotos.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-2">
          {/* TAB 1: General & Birth Counter */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Nombre o apodo de tu novia:
                  </label>
                  <input
                    type="text"
                    value={tempConfig.partnerName}
                    onChange={(e) => setTempConfig({ ...tempConfig, partnerName: e.target.value })}
                    placeholder="Ej: Mi Amor, Vale, Cami..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Tu nombre (remitente):
                  </label>
                  <input
                    type="text"
                    value={tempConfig.authorName}
                    onChange={(e) => setTempConfig({ ...tempConfig, authorName: e.target.value })}
                    placeholder="Ej: Luciano"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
                <div>
                  <label className="block text-xs font-medium text-rose-300 mb-1">
                    Fecha de nacimiento (para el contador):
                  </label>
                  <input
                    type="date"
                    value={tempConfig.birthDate}
                    onChange={(e) => setTempConfig({ ...tempConfig, birthDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">Calcula los días transcurridos desde que nació.</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Edad que cumple:
                  </label>
                  <input
                    type="number"
                    value={tempConfig.age}
                    onChange={(e) => setTempConfig({ ...tempConfig, age: parseInt(e.target.value) || 24 })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Día de su cumpleaños:
                  </label>
                  <input
                    type="date"
                    value={tempConfig.birthdayCelebrationDate}
                    onChange={(e) => setTempConfig({ ...tempConfig, birthdayCelebrationDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Frase de bienvenida / subtítulo:
                </label>
                <textarea
                  rows={2}
                  value={tempConfig.greetingSubtitle}
                  onChange={(e) => setTempConfig({ ...tempConfig, greetingSubtitle: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Mensaje del pie de página:
                </label>
                <input
                  type="text"
                  value={tempConfig.footerMessage}
                  onChange={(e) => setTempConfig({ ...tempConfig, footerMessage: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Letter inside the digital envelope */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Título de la carta:
                </label>
                <input
                  type="text"
                  value={tempConfig.letterTitle}
                  onChange={(e) => setTempConfig({ ...tempConfig, letterTitle: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Cuerpo de la carta (se revelará al abrir el sobre con lacre):
                </label>
                <textarea
                  rows={9}
                  value={tempConfig.letterBody}
                  onChange={(e) => setTempConfig({ ...tempConfig, letterBody: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl p-4 text-sm text-stone-100 font-serif leading-relaxed focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Riddle & First Clue */}
          {activeTab === 'riddle' && (
            <div className="space-y-5">
              <div className="bg-amber-950/20 border border-amber-800/40 p-4 rounded-2xl space-y-3">
                <div className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                  Acertijo para desbloquear la Pista del Lavarropas
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Pregunta del acertijo:
                  </label>
                  <textarea
                    rows={3}
                    value={tempClue.riddleQuestion}
                    onChange={(e) => setTempClue({ ...tempClue, riddleQuestion: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Palabras aceptadas como respuesta correcta (separadas por coma):
                  </label>
                  <input
                    type="text"
                    value={tempClue.riddleAcceptedAnswers.join(', ')}
                    onChange={(e) =>
                      setTempClue({
                        ...tempClue,
                        riddleAcceptedAnswers: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    Ej: lavarropas, el lavarropas, lavadora, la lavadora
                  </span>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Pista de ayuda si se traba:
                  </label>
                  <input
                    type="text"
                    value={tempClue.riddleHint}
                    onChange={(e) => setTempClue({ ...tempClue, riddleHint: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl space-y-3">
                <div className="text-xs uppercase font-semibold text-rose-300 tracking-wider">
                  Contenido de la Primera Pista (Tras resolver el acertijo)
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Lugar físico donde esconderás la nota:
                  </label>
                  <input
                    type="text"
                    value={tempClue.clueLocation}
                    onChange={(e) => setTempClue({ ...tempClue, clueLocation: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Instrucción para buscarla:
                  </label>
                  <textarea
                    rows={2}
                    value={tempClue.clueDescription}
                    onChange={(e) => setTempClue({ ...tempClue, clueDescription: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">
                    Mensaje de misión:
                  </label>
                  <input
                    type="text"
                    value={tempClue.clueMission}
                    onChange={(e) => setTempClue({ ...tempClue, clueMission: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Love Messages */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              {/* Add message box */}
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                <div className="text-xs uppercase font-semibold text-amber-300 tracking-wider">
                  Agregar una Nueva Dedicatoria / Frase
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMsgCategory}
                    onChange={(e) => setNewMsgCategory(e.target.value)}
                    placeholder="Categoría (ej: Tu Sonrisa, Lo Que Amo de Ti)"
                    className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100"
                  />
                  <input
                    type="text"
                    value={newMsgTitle}
                    onChange={(e) => setNewMsgTitle(e.target.value)}
                    placeholder="Título breve"
                    className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100"
                  />
                </div>
                <textarea
                  rows={2}
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  placeholder="Escribe lo que sientes..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100"
                />
                <button
                  onClick={handleAddMessage}
                  disabled={!newMsgTitle || !newMsgText}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Frase</span>
                </button>
              </div>

              {/* Existing messages list */}
              <div className="space-y-3">
                <div className="text-xs text-stone-400 font-medium">Dedicatorias actuales:</div>
                {tempMessages.map((msg, index) => (
                  <div key={msg.id} className="p-3 bg-stone-900/40 border border-stone-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-rose-300 font-semibold">{msg.category}</span>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-stone-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={msg.title}
                      onChange={(e) => {
                        const updated = [...tempMessages];
                        updated[index].title = e.target.value;
                        setTempMessages(updated);
                      }}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-100 font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={msg.text}
                      onChange={(e) => {
                        const updated = [...tempMessages];
                        updated[index].text = e.target.value;
                        setTempMessages(updated);
                      }}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-xs text-stone-300 italic"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Photos */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Upload box */}
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                <div className="text-xs uppercase font-semibold text-rose-300 tracking-wider">
                  Subir o Agregar Foto de Ambos
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl cursor-pointer transition-colors border border-stone-700">
                    <Upload className="w-4 h-4 text-rose-400" />
                    <span>Seleccionar foto de tu dispositivo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {newPhotoUrl && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Imagen cargada
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="Título (ej: Nuestro primer viaje juntos)"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100"
                />
                <input
                  type="text"
                  value={newPhotoDate}
                  onChange={(e) => setNewPhotoDate(e.target.value)}
                  placeholder="Fecha o lugar (ej: Octubre 2024)"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100"
                />
                <textarea
                  rows={2}
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  placeholder="Dedicatoria para esta foto..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-100"
                />

                <button
                  onClick={handleAddPhoto}
                  disabled={!newPhotoUrl && !newPhotoTitle}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Guardar Foto en Polaroid</span>
                </button>
              </div>

              {/* Photos List */}
              <div className="space-y-3">
                <div className="text-xs text-stone-400 font-medium">Fotos actuales:</div>
                {tempPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="flex items-center justify-between gap-3 p-3 bg-stone-900/40 border border-stone-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-12 h-12 object-cover rounded-lg border border-stone-700"
                      />
                      <div>
                        <input
                          type="text"
                          value={photo.title}
                          onChange={(e) => {
                            const updated = [...tempPhotos];
                            updated[index].title = e.target.value;
                            setTempPhotos(updated);
                          }}
                          className="font-semibold text-xs text-stone-100 bg-transparent border-b border-stone-700 pb-0.5"
                        />
                        <div className="text-[11px] text-stone-400 mt-1 truncate max-w-xs">{photo.caption}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas restaurar todos los textos y datos originales?')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Predeterminados</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? '¡Guardado con éxito!' : 'Guardar Todos los Cambios'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
