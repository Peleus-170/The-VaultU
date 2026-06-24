/**
 * Screen 3 — Role Select
 * -----------------------
 * Green header with account type cards below.
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RoleCard } from '@/components/ui/RoleCard';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const ICON_BG = '#e8f5ed';

export default function RoleSelectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* Integrated green header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <View style={styles.headerCircle} />

        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Ionicons color={Colors.white} name="arrow-back" size={18} />
        </Pressable>

        <Text style={styles.headerTitle}>Who are you?</Text>
        <Text style={styles.headerSub}>
          Choose your account type to get started.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RoleCard
          description="Manage your allowance, budget with envelopes, and split bills with friends."
          icon={<Ionicons color={Colors.greenPrimary} name="school" size={26} />}
          iconBg={ICON_BG}
          onPress={() => router.push('/student-signup')}
          title="Student"
        />

        <RoleCard
          description="List your products or services and receive payments directly to MoMo."
          icon={<Ionicons color={Colors.greenPrimary} name="storefront" size={26} />}
          iconBg={ICON_BG}
          onPress={() => router.push('/vendor-signup')}
          title="Campus Vendor"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.greenDark,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl + 4,
    overflow: 'hidden',
  },
  headerCircle: {
    position: 'absolute',
    top: -30,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 26,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  headerSub: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
    maxWidth: 300,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
});
