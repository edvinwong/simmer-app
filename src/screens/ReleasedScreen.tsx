import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Tag } from '../components';
import { colors, fonts } from '../theme';
import { CATEGORY_CLASS } from '../logic';
import type { Grudge } from '../types';

export function ReleasedScreen({ releasedRows }: { releasedRows: { grudge: Grudge; heldDays: number }[] }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Released</Text>
        <Text style={styles.subtitle}>Look at you, letting things go.</Text>
      </View>

      {releasedRows.length > 0 ? (
        <View style={styles.list}>
          {releasedRows.map((row) => (
            <Card key={row.grudge.id}>
              <View style={styles.rowBetween}>
                <Text style={styles.who}>{row.grudge.who}</Text>
                <Tag variant={CATEGORY_CLASS[row.grudge.category]} fontSize={10}>
                  {row.grudge.category}
                </Tag>
              </View>
              <Text style={styles.caption}>Held for {row.heldDays} days, then released.</Text>
            </Card>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <Card>
            <Text style={[styles.caption, { textAlign: 'center', fontSize: 13 }]}>
              Nothing released yet. Hold on tight.
            </Text>
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
  title: { fontFamily: fonts.heading, fontSize: 26, color: colors.text },
  subtitle: { fontFamily: fonts.body, fontSize: 13, color: colors.neutral700, marginTop: 4 },
  section: { paddingHorizontal: 20, paddingTop: 14 },
  list: { gap: 10, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 100 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  who: { fontFamily: fonts.heading, fontSize: 15, color: colors.neutral600, textDecorationLine: 'line-through' },
  caption: { fontFamily: fonts.body, fontSize: 12, color: colors.text, opacity: 0.8, marginTop: 6 },
});
