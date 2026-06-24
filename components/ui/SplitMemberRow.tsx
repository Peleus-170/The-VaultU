/**
 * SplitMemberRow — Member line in a bill split
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export type SplitStatus = 'paid' | 'owes';

interface SplitMemberRowProps {
  initials: string;
  name: string;
  isYou?: boolean;
  amount: string;
  status: SplitStatus;
  avatarBg: string;
  avatarColor: string;
  isLast?: boolean;
}

export function SplitMemberRow({
  initials,
  name,
  isYou = false,
  amount,
  status,
  avatarBg,
  avatarColor,
  isLast = false,
}: SplitMemberRowProps) {
  const paid = status === 'paid';

  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
        <Text style={[styles.initials, { color: avatarColor }]}>{initials}</Text>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {name}
        {isYou ? <Text style={styles.you}> (you)</Text> : null}
      </Text>

      <Text style={[styles.amount, paid ? styles.amountPaid : styles.amountOwes]}>
        {amount}
      </Text>

      <View style={[styles.badge, paid ? styles.badgePaid : styles.badgeOwes]}>
        <Text style={[styles.badgeText, paid ? styles.badgeTextPaid : styles.badgeTextOwes]}>
          {paid ? 'Paid' : 'Owes'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
  },
  rowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.inputBg,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: Fonts.headingBold,
    fontSize: 12,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  you: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
  },
  amount: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
  },
  amountPaid: {
    color: Colors.greenPrimary,
  },
  amountOwes: {
    color: Colors.errorDark,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgePaid: {
    backgroundColor: '#e8f5ed',
  },
  badgeOwes: {
    backgroundColor: Colors.goldBg,
  },
  badgeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
  },
  badgeTextPaid: {
    color: Colors.greenPrimary,
  },
  badgeTextOwes: {
    color: '#9a6f00',
  },
});
