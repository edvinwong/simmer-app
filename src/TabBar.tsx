import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlameIcon, ReleasedIcon, StatsIcon } from './icons';
import { colors, fonts } from './theme';
import type { Screen } from './types';

export function TabBar({
  screen,
  onHome,
  onStats,
  onReleased,
}: {
  screen: Screen;
  onHome: () => void;
  onStats: () => void;
  onReleased: () => void;
}) {
  const isHome = screen === 'home';
  const isStats = screen === 'stats';
  const isReleased = screen === 'released';

  return (
    <View style={styles.bar}>
      <Pressable style={styles.item} onPress={onHome} accessibilityRole="tab" accessibilityState={{ selected: isHome }}>
        <FlameIcon size={20} color={isHome ? colors.accent700 : colors.neutral500} />
        <Text style={[styles.label, { color: isHome ? colors.accent700 : colors.neutral500 }]}>Grudges</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onStats} accessibilityRole="tab" accessibilityState={{ selected: isStats }}>
        <StatsIcon size={20} color={isStats ? colors.accent700 : colors.neutral500} />
        <Text style={[styles.label, { color: isStats ? colors.accent700 : colors.neutral500 }]}>Stats</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={onReleased} accessibilityRole="tab" accessibilityState={{ selected: isReleased }}>
        <ReleasedIcon size={20} color={isReleased ? colors.accent700 : colors.neutral500} />
        <Text style={[styles.label, { color: isReleased ? colors.accent700 : colors.neutral500 }]}>Released</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.neutral100,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
  item: { alignItems: 'center', gap: 3 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 10.5 },
});
