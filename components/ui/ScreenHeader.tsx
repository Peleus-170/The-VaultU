/**
 * ScreenHeader — Dark green title bar for main app screens
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface HeaderAction {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  accessibilityLabel: string;
}

interface ScreenHeaderProps {
  title: string;
  actions?: HeaderAction[];
}

export function ScreenHeader({ title, actions = [] }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <Text style={styles.title}>{title}</Text>
      {actions.length > 0 ? (
        <View style={styles.actions}>
          {actions.map((action) => (
            <Pressable
              key={action.accessibilityLabel}
              accessibilityLabel={action.accessibilityLabel}
              accessibilityRole="button"
              onPress={action.onPress}
              style={styles.iconBtn}
            >
              <Ionicons color={Colors.white} name={action.icon} size={17} />
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg + 2,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: Colors.white,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 32,
  },
});
