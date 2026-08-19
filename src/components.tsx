import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, shadow, space } from './theme';

export function Card({
  children,
  elevation = 'sm',
  style,
}: {
  children: React.ReactNode;
  elevation?: 'sm' | 'md' | 'lg' | 'none';
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        styles.card,
        elevation !== 'none' && shadow[elevation],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const TAG_STYLES: Record<'tag-accent' | 'tag-accent-2' | 'tag-neutral' | 'tag-outline', { bg: string; text: string; border?: string }> = {
  'tag-accent': { bg: colors.accent100, text: colors.accent800 },
  'tag-accent-2': { bg: colors.accent2_100, text: colors.accent2_800 },
  'tag-neutral': { bg: colors.neutral100, text: colors.neutral800 },
  'tag-outline': { bg: 'transparent', text: colors.accent, border: colors.accent },
};

export function Tag({
  variant,
  children,
  fontSize = 11,
}: {
  variant: 'tag-accent' | 'tag-accent-2' | 'tag-neutral' | 'tag-outline';
  children: React.ReactNode;
  fontSize?: number;
}) {
  const v = TAG_STYLES[variant];
  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: v.bg },
        v.border ? { borderWidth: 1, borderColor: v.border } : null,
      ]}
    >
      <Text style={{ color: v.text, fontSize, letterSpacing: 0.2 }}>{children}</Text>
    </View>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export function Button({
  children,
  onPress,
  variant = 'secondary',
  icon = false,
  block = false,
  disabled = false,
  accessibilityLabel,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: boolean;
  block?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'ghost' && styles.btnGhost,
        icon && styles.btnIcon,
        block && styles.btnBlock,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.btnText,
            variant === 'primary' && styles.btnTextPrimary,
            variant === 'ghost' && styles.btnTextGhost,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    gap: space[2],
    padding: space[3],
    borderRadius: radius.card,
    backgroundColor: colors.surface,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: space[2],
    paddingHorizontal: space[3] * 1.2,
    borderRadius: radius.pill,
  },
  btnPrimary: { backgroundColor: colors.accent },
  btnSecondary: { borderColor: colors.divider },
  btnGhost: { paddingHorizontal: space[1] },
  btnIcon: { width: 36, height: 36, padding: 0 },
  btnBlock: { width: '100%', marginTop: space[2] },
  btnDisabled: { opacity: 0.45 },
  btnPressed: { opacity: 0.85 },
  btnText: { fontFamily: fonts.heading, fontSize: 14, color: colors.text },
  btnTextPrimary: { color: colors.bg },
  btnTextGhost: { color: colors.accent },
});
