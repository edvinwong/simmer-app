import { ACTIVE_FLAME, IDLE_FLAME } from './theme';
import type { Category, Grudge } from './types';

const DAY = 86400000;

export const daysAgo = (n: number) => Date.now() - n * DAY;

export const daysBetween = (a: number, b: number) => Math.max(0, Math.floor((b - a) / DAY));

export const flameColors = (sev: number) =>
  [1, 2, 3, 4, 5].map((n) => (n <= sev ? ACTIVE_FLAME : IDLE_FLAME));

export function pettyLabel(score: number) {
  if (score <= 0) return 'Suspiciously at peace';
  if (score <= 40) return 'Mildly salty';
  if (score <= 90) return 'Certified petty';
  if (score <= 150) return 'Legendary grudge holder';
  return 'Do not anger this person';
}

export const CATEGORY_CLASS: Record<Category, 'tag-accent' | 'tag-accent-2' | 'tag-neutral' | 'tag-outline'> = {
  Family: 'tag-accent',
  Friend: 'tag-accent-2',
  Coworker: 'tag-neutral',
  Stranger: 'tag-outline',
  Institution: 'tag-neutral',
};

export function seedGrudges(): Grudge[] {
  return [
    { id: 1, who: 'The Barista', what: 'Wrote "Kevin" on my cup. My name is Kelvin. I spelled it out loud.', category: 'Stranger', severity: 2, added: daysAgo(9), status: 'active' },
    { id: 2, who: 'My Roommate', what: 'Used the good spoon — the one good spoon — for cottage cheese.', category: 'Friend', severity: 4, added: daysAgo(41), status: 'active' },
    { id: 3, who: 'Mom', what: 'Still brings up the 2004 science fair. I was ten. The volcano worked.', category: 'Family', severity: 5, added: daysAgo(1200), status: 'active' },
    { id: 4, who: 'The DMV', what: 'Made me take a number, then called a different number, then denied everything.', category: 'Institution', severity: 3, added: daysAgo(23), status: 'active' },
    { id: 5, who: 'Dave from Accounting', what: 'Replied-all with "per my last email." Everyone saw that.', category: 'Coworker', severity: 3, added: daysAgo(6), status: 'active' },
    { id: 6, who: 'Jake (ex-friend)', what: 'Borrowed my phone charger junior year of college. Never seen again.', category: 'Friend', severity: 1, added: daysAgo(2400), status: 'released', releasedAt: daysAgo(14) },
  ];
}

export function computeStats(grudges: Grudge[]) {
  const now = Date.now();
  const active = grudges.filter((g) => g.status === 'active');
  const released = grudges.filter((g) => g.status === 'released');
  const score = active.reduce((s, g) => s + g.severity, 0) * 7;

  let longest: { who: string; days: number } | null = null;
  active.forEach((g) => {
    const d = daysBetween(g.added, now);
    if (!longest || d > longest.days) longest = { who: g.who, days: d };
  });

  const catCounts: Partial<Record<Category, number>> = {};
  active.forEach((g) => {
    catCounts[g.category] = (catCounts[g.category] ?? 0) + 1;
  });
  const catBars = (Object.keys(catCounts) as Category[])
    .map((name) => ({ name, count: catCounts[name] ?? 0 }))
    .sort((a, b) => b.count - a.count);
  const maxCount = catBars.length ? catBars[0].count : 1;
  const catBarsWithPct = catBars.map((c) => ({ ...c, pct: Math.round((c.count / maxCount) * 100) }));
  const topCategory = catBars[0] ?? null;

  return {
    score,
    label: pettyLabel(score),
    longestWho: longest ? (longest as { who: string; days: number }).who : '—',
    longestDays: longest ? (longest as { who: string; days: number }).days : 0,
    topCategoryName: topCategory ? topCategory.name : '—',
    topCategoryCount: topCategory ? topCategory.count : 0,
    releasedCount: released.length,
    catBars: catBarsWithPct,
  };
}
