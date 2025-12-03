export interface Beat {
  id: string;
  title: string;
  producer: string;
  bpm: number;
  key: string;
  price: number;
  tags: string[];
  cover: string;
  audioMock: string; // Placeholder for audio URL
  mood: string;
  genre: string;
}

export interface CartItem extends Beat {
  licenseType: 'Basic' | 'Premium' | 'Exclusive';
}

export enum ViewState {
  BROWSE = 'BROWSE',
  LYRICS = 'LYRICS',
}
