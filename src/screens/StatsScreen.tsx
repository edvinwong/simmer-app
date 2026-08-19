import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components';
import { colors, fonts } from '../theme';

export type StatsData = {
  score: number;
  label: string;
  longestWho: string;
  longestDays: number;
  topCategoryName: string;
  topCategoryCount: number;
  releasedCount: number;
  catBars: { name: string; count: number; pct: number }[];
};

export function StatsScreen({ stats }: { stats: StatsData }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Petty Report</Text>
      </View>

      <View style={styles.body}>
        <Card>
          <Text style={styles.kicker}>Petty Score</Text>
          <Text style={styles.bigNumber}>{stats.score}</Text>
          <Text style={styles.caption}>{stats.label}</Text>
        </Card>

        <View style={styles.pairRow}>
          <Card style={{ flex: 1 }}>
            <Text style={styles.kicker}>Longest simmering</Text>
            <Text style={styles.cardTitle}>{stats.longestWho}</Text>
            <Text style={styles.captionSm}>{stats.longestDays} days and counting</Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text style={styles.kicker}>Usual suspect</Text>
            <Text style={styles.cardTitle}>{stats.topCategoryName}</Text>
            <Text style={styles.captionSm}>{stats.topCategoryCount} grudges and rising</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.kicker}>Breakdown by offender type</Text>
          <View style={{ gap: 10, marginTop: 6 }}>
            {stats.catBars.map((bar) => (
              <View key={bar.name}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>{bar.name}</Text>
                  <Text style={styles.barLabel}>{bar.count}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${bar.pct}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.kicker}>Emotional growth events</Text>
          <Text style={styles.midNumber}>{stats.releasedCount}</Text>
          <Text style={styles.captionSm}>Grudges released back into the wild</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 20, paddingBottom: 110 },
  header: { paddingHorizontal: 20, paddingBottom: 4 },
  title: { fontFamily: fonts.heading, fontSize: 26, color: colors.text },
  body: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 100, gap: 12 },
  kicker: { fontFamily: fonts.body, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent },
  bigNumber: { fontFamily: fonts.heading, fontSize: 34, color: colors.text },
  midNumber: { fontFamily: fonts.heading, fontSize: 22, color: colors.text },
  caption: { fontFamily: fonts.body, fontSize: 13, color: colors.text, opacity: 0.8 },
  captionSm: { fontFamily: fonts.body, fontSize: 12, color: colors.text, opacity: 0.8 },
  cardTitle: { fontFamily: fonts.heading, fontSize: 15, color: colors.text },
  pairRow: { flexDirection: 'row', gap: 12 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.text },
  barTrack: { height: 8, borderRadius: 999, backgroundColor: colors.accent2_100, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 999, backgroundColor: colors.accent2_500 },
});
