export interface PhotoMemory {
  id: string;
  url: string;
  title: string;
  date?: string;
  caption: string;
  rotation?: number;
}

export interface LoveMessage {
  id: string;
  category: string;
  title: string;
  text: string;
  iconName?: string;
}

export interface FirstClueData {
  riddleQuestion: string;
  riddleAcceptedAnswers: string[]; // e.g. ["lavarropas", "el lavarropas", "lavadora", "la lavadora", "lavarropa"]
  riddleHint: string;
  clueTitle: string;
  clueLocation: string;
  clueDescription: string;
  clueMission: string;
  physicalNoteReminder: string;
}

export interface BirthdayConfig {
  partnerName: string;
  authorName: string;
  age: number;
  birthDate: string; // "2002-10-05" - exact birth date to count days since she was born
  birthdayCelebrationDate: string; // "2026-10-05"
  greetingSubtitle: string;
  letterTitle: string;
  letterBody: string;
  footerMessage: string;
}

