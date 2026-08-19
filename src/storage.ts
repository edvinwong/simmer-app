import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Grudge } from './types';

const KEY = 'simmer.grudges.v1';

export async function loadGrudges(): Promise<Grudge[] | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Grudge[];
  } catch {
    return null;
  }
}

export async function saveGrudges(grudges: Grudge[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(grudges));
}
