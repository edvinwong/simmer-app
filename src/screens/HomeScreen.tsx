import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Button, Tag } from '../components';
import { FlameIcon } from '../icons';
import { colors, fonts } from '../theme';
import { CATEGORY_CLASS } from '../logic';
import type { Grudge } from '../types';

type ActiveRow = {
  grudge: Grudge;
  days: number;
  flames: string[];
};

export function HomeScreen({
  pettyScore,
  pettyLabel,
  activeRows,
  onOpenDetail,
  onAdd,
}: {
  pettyScore: number;
  pettyLabel: string;
  activeRows: ActiveRow[];
  onOpenDetail: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Simmer</Text>
        <Text style={styles.subtitle}>Where grudges go to marinate.</Text>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.scoreRow}>
            <View style={styles.scoreBadge}>
              <FlameIcon size={22} color={colors.accent700} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.scoreNumber}>{pettyScore}</Text>
              <Text style={styles.scoreLabel}>Petty Score — {pettyLabel}</Text>
            </View>
          </View>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Active grudges</Text>

      {activeRows.length > 0 ? (
        <View style={styles.list}>
          {activeRows.map((row) => (
            <Pressable key={row.grudge.id} onPress={() => onOpenDetail(row.grudge.id)}>
              <Card>
                <View style={styles.rowBetween}>
                  <Text style={styles.who}>{row.grudge.who}</Text>
                  <Tag variant={CATEGORY_CLASS[row.grudge.category]} fontSize={10}>
                    {row.grudge.category}
                  </Tag>
                </View>
                <Text style={styles.excerpt} numberOfLines={2}>
                  {row.grudge.what}
                </Text>
                <View style={styles.rowBetween}>
                  <View style={styles.flameRow}>
                    {row.flames.map((c, i) => (
                      <FlameIcon key={i} size={12} color={c} filled />
                    ))}
                  </View>
                  <Text style={styles.days}>Day {row.days} simmering</Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <Card>
            <Text style={[styles.excerpt, { textAlign: 'center' }]}>No grudges yet. Growth, we guess.</Text>
            <Button variant="secondary" onPress={onAdd} style={{ marginTop: 6 }}>
              Start one
            </Button>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 20, paddingBottom: 110 },
  header: { paddingHorizontal: 20, paddingBottom: 4 },
  title: { fontFamily: fonts.heading, fontSize: 32, color: colors.text, lineHeight: 34 },
  subtitle: { fontFamily: fonts.body, fontSize: 13, color: colors.neutral700, marginTop: 4 },
  section: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  scoreBadge: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.accent100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: { fontFamily: fonts.heading, fontSize: 26, color: colors.text },
  scoreLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.neutral700, marginTop: 2 },
  sectionTitle: { fontFamily: fonts.heading, fontSize: 15, color: colors.text, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 4 },
  list: { gap: 10, paddingHorizontal: 20, paddingTop: 6, paddingBottom: 24 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  who: { fontFamily: fonts.heading, fontSize: 16, color: colors.text },
  excerpt: { fontFamily: fonts.body, fontSize: 13, color: colors.text, opacity: 0.8, marginTop: 6, marginBottom: 10 },
  flameRow: { flexDirection: 'row', gap: 3 },
  days: { fontFamily: fonts.body, fontSize: 11, color: colors.neutral600 },
});
