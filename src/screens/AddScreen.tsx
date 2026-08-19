import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components';
import { FlameIcon, XIcon } from '../icons';
import { ACTIVE_FLAME, IDLE_FLAME, colors, fonts } from '../theme';
import { CATEGORIES } from '../types';
import type { Category, FormState } from '../types';

export function AddScreen({
  form,
  onChangeWho,
  onChangeWhat,
  onChangeCategory,
  onChangeSeverity,
  onCancel,
  onSubmit,
}: {
  form: FormState;
  onChangeWho: (v: string) => void;
  onChangeWhat: (v: string) => void;
  onChangeCategory: (c: Category) => void;
  onChangeSeverity: (n: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const cannotSubmit = !(form.who.trim().length > 0 && form.what.trim().length > 0);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Button variant="ghost" icon accessibilityLabel="Cancel" onPress={onCancel}>
          <XIcon size={16} color={colors.text} />
        </Button>
        <Text style={styles.title}>New Grudge</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Who wronged you</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. My dentist"
            placeholderTextColor={colors.neutral500}
            value={form.who}
            onChangeText={onChangeWho}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>What happened</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Take your time. Be specific."
            placeholderTextColor={colors.neutral500}
            value={form.what}
            onChangeText={onChangeWhat}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((name) => {
              const selected = form.category === name;
              return (
                <Pressable
                  key={name}
                  onPress={() => onChangeCategory(name)}
                  style={[
                    styles.chip,
                    selected ? styles.chipSelected : styles.chipOutline,
                  ]}
                >
                  <Text style={{ color: selected ? colors.accent800 : colors.accent, fontSize: 11 }}>{name}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>How much does this haunt you</Text>
          <View style={styles.chipRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} onPress={() => onChangeSeverity(n)} accessibilityLabel={`Severity ${n}`}>
                <FlameIcon size={26} color={n <= form.severity ? ACTIVE_FLAME : IDLE_FLAME} filled />
              </Pressable>
            ))}
          </View>
        </View>

        <Button variant="primary" block disabled={cannotSubmit} onPress={onSubmit} style={{ marginTop: 4 }}>
          Log the grudge
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 20, paddingBottom: 110 },
  header: { paddingHorizontal: 20, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontFamily: fonts.heading, fontSize: 22, color: colors.text },
  form: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 100, gap: 16 },
  field: { gap: 5 },
  label: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(32,30,29,0.7)' },
  input: {
    width: '100%',
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 999,
  },
  textarea: { minHeight: 90, borderRadius: 16, paddingTop: 10 },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  chip: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  chipSelected: { backgroundColor: colors.accent100 },
  chipOutline: { borderWidth: 1, borderColor: colors.accent },
});
