import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Tag } from '../components';
import { BackIcon, ClockIcon, FlameIcon } from '../icons';
import { colors, fonts } from '../theme';
import { CATEGORY_CLASS } from '../logic';
import type { Grudge } from '../types';

export function DetailScreen({
  grudge,
  days,
  flames,
  confirmingRelease,
  onBack,
  onReheat,
  onAskRelease,
  onCancelRelease,
  onConfirmRelease,
}: {
  grudge: Grudge;
  days: number;
  flames: string[];
  confirmingRelease: boolean;
  onBack: () => void;
  onReheat: () => void;
  onAskRelease: () => void;
  onCancelRelease: () => void;
  onConfirmRelease: () => void;
}) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Button variant="ghost" icon accessibilityLabel="Back" onPress={onBack}>
          <BackIcon size={16} color={colors.text} />
        </Button>
      </View>

      <View style={styles.body}>
        <Tag variant={CATEGORY_CLASS[grudge.category]} fontSize={11}>
          {grudge.category}
        </Tag>
        <Text style={styles.who}>{grudge.who}</Text>
        <View style={styles.flameRow}>
          {flames.map((c, i) => (
            <FlameIcon key={i} size={16} color={c} filled />
          ))}
        </View>

        <Card style={{ marginTop: 16 }}>
          <Text style={styles.quote}>&ldquo;{grudge.what}&rdquo;</Text>
        </Card>

        <View style={styles.simmerRow}>
          <ClockIcon size={14} color={colors.neutral700} />
          <Text style={styles.simmerText}>Simmering for {days} days</Text>
        </View>

        {!confirmingRelease && (
          <View style={styles.actionsRow}>
            <Button variant="secondary" onPress={onReheat} style={{ flex: 1 }}>
              Reheat
            </Button>
            <Button variant="primary" onPress={onAskRelease} style={{ flex: 1 }}>
              Release
            </Button>
          </View>
        )}

        {confirmingRelease && (
          <Card style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={styles.confirmTitle}>Let it go?</Text>
            <Text style={[styles.simmerText, { textAlign: 'center' }]}>
              This is permanent. (You can always start a new one.)
            </Text>
            <View style={styles.actionsRow}>
              <Button variant="ghost" onPress={onCancelRelease} style={{ flex: 1 }}>
                Never mind
              </Button>
              <Button variant="primary" onPress={onConfirmRelease} style={{ flex: 1 }}>
                Release it
              </Button>
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 20, paddingBottom: 110 },
  header: { paddingHorizontal: 20, paddingBottom: 4 },
  body: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 100 },
  who: { fontFamily: fonts.heading, fontSize: 26, color: colors.text, marginTop: 10 },
  flameRow: { flexDirection: 'row', gap: 4, marginTop: 8 },
  quote: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22.5, color: colors.text, opacity: 0.85 },
  simmerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  simmerText: { fontFamily: fonts.body, fontSize: 13, color: colors.neutral700 },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  confirmTitle: { fontFamily: fonts.heading, fontSize: 16, color: colors.text },
});
