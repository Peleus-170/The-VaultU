/**
 * Screen 1 — Splash / Welcome
 * ----------------------------
 * Introduces VaultU with feature tags and onboarding actions.
 */

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FeatureTag } from '@/components/ui/FeatureTag';
import { Button } from '@/components/ui/Button';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const FEATURE_TAGS = ['Envelopes', 'Savings', 'Bill Split', 'MoMo'];

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[Colors.greenDark, Colors.greenPrimary, Colors.greenBright]}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.5, 1]}
        start={{ x: 0.3, y: 0 }}
        style={[styles.hero, { paddingTop: insets.top + Spacing.xxxl }]}
      >
        {/* Decorative background circles */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />

        <View style={styles.logoWrap}>
          <Ionicons color={Colors.white} name="shield-checkmark" size={36} />
        </View>

        <Text style={styles.title}>
          Vault<Text style={styles.titleAccent}>U</Text>
        </Text>

        <Text style={styles.tagline}>
          Your campus financial companion.{'\n'}
          Budget smart. Save real. Split easy.
        </Text>

        {/* Feature pills — 3 on first row, 1 centered below */}
        <View style={styles.tagsWrap}>
          <View style={styles.tagRow}>
            {FEATURE_TAGS.slice(0, 3).map((tag) => (
              <FeatureTag key={tag} label={tag} />
            ))}
          </View>
          <View style={styles.tagRowCenter}>
            <FeatureTag label={FEATURE_TAGS[3]} />
          </View>
        </View>
      </LinearGradient>

      {/* White bottom sheet with rounded top corners */}
      <View
        style={[
          styles.bottom,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
      >
        <Button
          onPress={() => router.push('/role-select')}
          style={styles.primaryBtn}
          title="Get Started"
        />
        <Button
          onPress={() => router.push('/login')}
          title="I already have an account"
          variant="outline"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.greenPrimary,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl,
    overflow: 'hidden',
  },
  circleTopRight: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.xxl,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 36,
    color: Colors.white,
    marginTop: Spacing.lg,
  },
  titleAccent: {
    color: Colors.greenMint,
  },
  tagline: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: Spacing.sm + 2,
    lineHeight: 21,
    maxWidth: 280,
  },
  tagsWrap: {
    marginTop: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  tagRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottom: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    gap: Spacing.md,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  primaryBtn: {
    backgroundColor: Colors.greenDark,
  },
});
