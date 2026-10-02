import { PhotoMemory, LoveMessage, FirstClueData, BirthdayConfig } from '../types';

import heroImg from '../assets/images/birthday_celebration_hero_1790965104676.jpg';
import memoriesImg from '../assets/images/romantic_polaroid_memories_1790965115027.jpg';
import clueImg from '../assets/images/treasure_hunt_clue_letter_1790965125338.jpg';
import laundryImg from '../assets/images/scavenger_laundry_hint_1790965134744.jpg';

export const initialConfig: BirthdayConfig = {
  partnerName: 'Mi Amor',
  authorName: 'Luciano',
  age: 24,
  birthDate: '2002-10-05', // 5 de octubre de 2002 -> Cumple 24 el 5 de octubre de 2026
  birthdayCelebrationDate: '2026-10-05',
  greetingSubtitle: 'Hoy celebramos 24 vueltas al sol de la persona más maravillosa y especial que ilumina mi vida cada día.',
  letterTitle: 'Carta especial para ti en tus 24 años',
  letterBody: `Amor de mi vida,

Si estás leyendo estas líneas en tu teléfono, significa que escaneaste el código QR que preparé en secreto solo para ti.

Hoy cumples 24 años y no encuentro suficientes palabras para agradecer todo lo que significas para mí: tu ternura, tu mirada brillante, tus abrazos que sanan cualquier mal día y esa energía única con la que llenas cada rincón de mi vida.

Este día quiero que sea inolvidable. Por eso, además de los recuerdos y palabras de esta página, he preparado una búsqueda del tesoro. Para descubrir dónde se oculta tu primera pista física, tendrás que resolver el acertijo que te espera más abajo. ¡Muchos éxitos en la búsqueda!`,
  footerMessage: 'Creado con todo el amor por Luciano para hacer de tu cumpleaños número 24 un recuerdo imborrable para siempre.',
};

export const initialFirstClue: FirstClueData = {
  riddleQuestion: 'Doy vueltas y vueltas sin parar pero nunca me mareo. Me trago ropa sucia, me encanta hacer burbujas perfumadas con suavizante y te devuelvo todo limpio y reluciente. A veces me quedo con algún calcetín solitario... ¿Quién soy?',
  riddleAcceptedAnswers: [
    'lavarropas',
    'el lavarropas',
    'lavadora',
    'la lavadora',
    'el lavarropa',
    'lavarropa',
    'lavadora de ropa',
    'maquina de lavar',
  ],
  riddleHint: 'Piensa en el electrodoméstico donde la ropa hace torbellinos de agua y jabón.',
  clueTitle: '¡Acertijo Resuelto! Tu Primera Pista',
  clueLocation: 'El Lavarropas',
  clueDescription: '¡Correcto! Tu primera pista física está escondida adentro del lavarropas (revisa con cuidado el tambor o el borde de la puerta).',
  clueMission: 'Ve hacia allí ahora mismo. En ese sobre encontrarás la siguiente pista manuscrita que te guiará al resto de la aventura hasta tu regalo sorpresa final.',
  physicalNoteReminder: 'Nota: A partir de aquí la búsqueda continúa en el mundo real siguiendo las notas de papel que vayas encontrando.',
};

export const initialPhotos: PhotoMemory[] = [
  {
    id: 'photo-1',
    url: memoriesImg,
    title: 'Nuestra primera gran aventura',
    date: 'Un recuerdo imborrable',
    caption: 'Ese día en el que descubrí que cada risa compartida contigo tiene el poder de detener el tiempo por completo.',
    rotation: -2,
  },
  {
    id: 'photo-2',
    url: heroImg,
    title: 'Tus 24 primaveras',
    date: '5 de Octubre',
    caption: 'Llegas a tus 24 años con una luz que no para de crecer. Admiro tu fuerza, tu ternura y esa sonrisa que me desarma.',
    rotation: 2,
  },
  {
    id: 'photo-3',
    url: clueImg,
    title: 'Complicidad sin palabras',
    date: 'Cada atardecer juntos',
    caption: 'No hay mapa que iguale el viaje de caminar a tu lado. Gracias por ser mi lugar seguro en cualquier tormenta.',
    rotation: -1,
  },
  {
    id: 'photo-4',
    url: laundryImg,
    title: 'La chispa de lo cotidiano',
    date: 'Nuestros pequeños rituales',
    caption: 'Incluso las tardes comunes o doblar la ropa son mágicas cuando estás tú cerca cantando o haciéndome bromas.',
    rotation: 3,
  },
];

export const initialLoveMessages: LoveMessage[] = [
  {
    id: 'msg-1',
    category: 'Para Recordar Siempre',
    title: 'Tu risa contagiosa',
    text: 'Esa risa espontánea que tienes cuando algo te hace mucha gracia es literalmente mi sonido favorito en todo el universo.',
  },
  {
    id: 'msg-2',
    category: 'Tu Esencia',
    title: 'Tu corazón generoso',
    text: 'La ternura con la que tratas a los que amas y esa empatía tan genuina me inspiran a ser una mejor persona cada día.',
  },
  {
    id: 'msg-3',
    category: 'Nuestra Historia',
    title: 'El refugio en tus abrazos',
    text: 'No importa lo caótico que sea el mundo afuera; cuando me abrazas, todo vuelve a encajar en su sitio perfecto.',
  },
  {
    id: 'msg-4',
    category: 'El Futuro',
    title: 'Por todos los sueños que vienen',
    text: 'A tus 24 años tienes el mundo por conquistar, y prometo estar a tu lado aplaudiéndote en cada logro y sosteniéndote siempre.',
  },
];
