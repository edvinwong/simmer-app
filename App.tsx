import { Caprasimo_400Regular } from '@expo-google-fonts/caprasimo';
import { Figtree_400Regular, Figtree_600SemiBold, Figtree_700Bold } from '@expo-google-fonts/figtree';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { PlusIcon } from './src/icons';
import { computeStats, daysBetween, flameColors, pettyLabel, seedGrudges } from './src/logic';
import { loadGrudges, saveGrudges } from './src/storage';
import { colors, shadow } from './src/theme';
import type { Category, FormState, Grudge, Screen } from './src/types';

import { AddScreen } from './src/screens/AddScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ReleasedScreen } from './src/screens/ReleasedScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { TabBar } from './src/TabBar';

SplashScreen.preventAutoHideAsync();

const EMPTY_FORM: FormState = { who: '', what: '', category: 'Family', severity: 3 };

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Caprasimo_400Regular,
    Figtree_400Regular,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });

  const [grudgesLoaded, setGrudgesLoaded] = useState(false);
  const [grudges, setGrudges] = useState<Grudge[]>([]);
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmingRelease, setConfirmingRelease] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    loadGrudges().then((stored) => {
      setGrudges(stored ?? seedGrudges());
      setGrudgesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!grudgesLoaded) return;
    saveGrudges(grudges);
  }, [grudges, grudgesLoaded]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const goHome = useCallback(() => {
    setScreen('home');
    setSelectedId(null);
    setConfirmingRelease(false);
  }, []);
  const goAdd = useCallback(() => {
    setForm(EMPTY_FORM);
    setScreen('add');
  }, []);
  const goStats = useCallback(() => setScreen('stats'), []);
  const goReleased = useCallback(() => setScreen('released'), []);
  const openDetail = useCallback((id: number) => {
    setSelectedId(id);
    setConfirmingRelease(false);
    setScreen('detail');
  }, []);

  const submitAdd = useCallback(() => {
    const who = form.who.trim();
    const what = form.what.trim();
    if (!who || !what) return;
    const nextId = grudges.reduce((max, g) => Math.max(max, g.id), 0) + 1;
    setGrudges((prev) => [
      ...prev,
      { id: nextId, who, what, category: form.category, severity: form.severity, added: Date.now(), status: 'active' },
    ]);
    goHome();
  }, [form, grudges, goHome]);

  const askRelease = useCallback(() => setConfirmingRelease(true), []);
  const cancelRelease = useCallback(() => setConfirmingRelease(false), []);
  const confirmRelease = useCallback(() => {
    setGrudges((prev) =>
      prev.map((g) => (g.id === selectedId ? { ...g, status: 'released', releasedAt: Date.now() } : g))
    );
    setScreen('released');
    setSelectedId(null);
    setConfirmingRelease(false);
  }, [selectedId]);
  const reheat = useCallback(() => {
    setGrudges((prev) =>
      prev.map((g) => (g.id === selectedId ? { ...g, severity: Math.min(5, g.severity + 1), added: Date.now() } : g))
    );
  }, [selectedId]);

  const now = Date.now();
  const activeRows = useMemo(
    () =>
      grudges
        .filter((g) => g.status === 'active')
        .sort((a, b) => b.severity - a.severity)
        .map((g) => ({ grudge: g, days: daysBetween(g.added, now), flames: flameColors(g.severity) })),
    [grudges, now]
  );
  const releasedRows = useMemo(
    () =>
      grudges
        .filter((g) => g.status === 'released')
        .sort((a, b) => (b.releasedAt ?? 0) - (a.releasedAt ?? 0))
        .map((g) => ({ grudge: g, heldDays: daysBetween(g.added, g.releasedAt ?? now) })),
    [grudges, now]
  );
  const score = useMemo(() => activeRows.reduce((s, r) => s + r.grudge.severity, 0) * 7, [activeRows]);
  const selectedGrudge = selectedId != null ? grudges.find((g) => g.id === selectedId) ?? null : null;
  const stats = useMemo(() => computeStats(grudges), [grudges]);

  if ((!fontsLoaded && !fontError) || !grudgesLoaded) {
    return null;
  }

  const showTabBar = screen === 'home' || screen === 'stats' || screen === 'released';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screenArea}>
        {screen === 'home' && (
          <HomeScreen pettyScore={score} pettyLabel={pettyLabel(score)} activeRows={activeRows} onOpenDetail={openDetail} onAdd={goAdd} />
        )}
        {screen === 'add' && (
          <AddScreen
            form={form}
            onChangeWho={(v) => setForm((f) => ({ ...f, who: v }))}
            onChangeWhat={(v) => setForm((f) => ({ ...f, what: v }))}
            onChangeCategory={(c: Category) => setForm((f) => ({ ...f, category: c }))}
            onChangeSeverity={(n: number) => setForm((f) => ({ ...f, severity: n }))}
            onCancel={goHome}
            onSubmit={submitAdd}
          />
        )}
        {screen === 'detail' && selectedGrudge && (
          <DetailScreen
            grudge={selectedGrudge}
            days={daysBetween(selectedGrudge.added, now)}
            flames={flameColors(selectedGrudge.severity)}
            confirmingRelease={confirmingRelease}
            onBack={goHome}
            onReheat={reheat}
            onAskRelease={askRelease}
            onCancelRelease={cancelRelease}
            onConfirmRelease={confirmRelease}
          />
        )}
        {screen === 'stats' && <StatsScreen stats={stats} />}
        {screen === 'released' && <ReleasedScreen releasedRows={releasedRows} />}

        {screen === 'home' && (
          <Pressable onPress={goAdd} accessibilityLabel="Add grudge" style={[styles.fab, shadow.lg]}>
            <PlusIcon size={20} color={colors.bg} />
          </Pressable>
        )}

        {showTabBar && <TabBar screen={screen} onHome={goHome} onStats={goStats} onReleased={goReleased} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  screenArea: { flex: 1, backgroundColor: colors.bg },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 88,
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
