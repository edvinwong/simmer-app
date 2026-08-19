export type Category = 'Family' | 'Friend' | 'Coworker' | 'Stranger' | 'Institution';

export type Grudge = {
  id: number;
  who: string;
  what: string;
  category: Category;
  severity: number;
  added: number;
  status: 'active' | 'released';
  releasedAt?: number;
};

export type Screen = 'home' | 'add' | 'detail' | 'stats' | 'released';

export type FormState = {
  who: string;
  what: string;
  category: Category;
  severity: number;
};

export const CATEGORIES: Category[] = ['Family', 'Friend', 'Coworker', 'Stranger', 'Institution'];
