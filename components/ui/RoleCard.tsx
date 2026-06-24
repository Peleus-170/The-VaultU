/**
 * RoleCard — Selectable role option (Student / Campus Vendor)
 * -----------------------------------------------------------
 * Tappable card used on the Role Select screen.
 */

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface RoleCardProps {
  /** Main role title */
  title: string;
  /** Short description below the title */
  description: string;
  /** Icon element inside the colored circle */
  icon: React.ReactNode;
  /** Background color for the icon container */
  iconBg: string;
  /** Called when the user selects this role */
  onPress: () => void;
}

export function RoleCard({
  title,
  description,
  icon,
  iconBg,
  onPress,
}: RoleCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    padding: Spacing.xxl,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textTertiary,
    lineHeight: 19,
  },
});
