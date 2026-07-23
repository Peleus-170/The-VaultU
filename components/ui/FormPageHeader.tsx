/**
 * FormPageHeader — Back button + centered title (e.g. Student Registration)
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface FormPageHeaderProps {
  title: string;
  backTo?: string;
}

export function FormPageHeader({ title, backTo }: FormPageHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo as never);
      return;
    }
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={handleBack}
        style={styles.backBtn}
      >
        <Ionicons color={Colors.white} name="arrow-back" size={18} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: Fonts.heading,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginRight: 36,
  },
  spacer: {
    width: 0,
  },
});
