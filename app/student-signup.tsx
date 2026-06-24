/**

 * Student Signup — KNUST student registration

 */



import { useRouter } from 'expo-router';

import React, { useState } from 'react';

import {

  Alert,

  KeyboardAvoidingView,

  Platform,

  ScrollView,

  StyleSheet,

  Text,

  View,

} from 'react-native';



import { AuthDivider } from '@/components/ui/AuthDivider';

import { Button } from '@/components/ui/Button';

import { FormPageHeader } from '@/components/ui/FormPageHeader';

import { InputField } from '@/components/ui/InputField';

import { SocialAuthButtons } from '@/components/ui/SocialAuthButtons';

import { TermsCheckbox } from '@/components/ui/TermsCheckbox';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { ApiError, getLocalApiHint, registerStudent } from '@/lib/api';
import { saveAuthSession } from '@/lib/authSession';



export default function StudentSignupScreen() {

  const router = useRouter();

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [indexNumber, setIndexNumber] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleCreateAccount = async () => {

    if (!firstName.trim() || !lastName.trim() || !indexNumber.trim() || !email.trim() || !password) {
      Alert.alert('Missing details', 'Fill in all required fields to create your account.');
      return;
    }

    if (!agreed) {
      Alert.alert('Terms required', 'Accept the VaultU terms and privacy policy to continue.');
      return;
    }

    try {
      setLoading(true);
      const session = await registerStudent({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        indexNumber: indexNumber.trim(),
        email: email.trim(),
        password,
      });
      await saveAuthSession(session);
      router.replace('/dashboard');
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : getLocalApiHint();
      Alert.alert('Signup failed', message);
    } finally {
      setLoading(false);
    }


  };



  return (

    <View style={styles.screen}>

      <FormPageHeader backTo="/role-select" title="Student Registration" />



      <KeyboardAvoidingView

        behavior={Platform.OS === 'ios' ? 'padding' : undefined}

        style={styles.flex}

      >

        <ScrollView

          contentContainerStyle={styles.scrollContent}

          keyboardShouldPersistTaps="handled"

          showsVerticalScrollIndicator={false}

        >

          <View style={styles.formCard}>

            <Text style={styles.heading}>Join VaultU</Text>

            <Text style={styles.subheading}>

              Create your campus finance account.

            </Text>



            <SocialAuthButtons variant="signup" />



            <AuthDivider label="or with email" uppercase />



            <View style={styles.nameRow}>

              <InputField

                containerStyle={styles.nameField}

                hideIcon

                label="First Name"

                onChangeText={setFirstName}

                placeholder="Kwame"

                required

                value={firstName}

              />

              <InputField

                containerStyle={styles.nameField}

                hideIcon

                label="Last Name"

                onChangeText={setLastName}

                placeholder="Asante"

                required

                value={lastName}

              />

            </View>



            <InputField

              hideIcon

              label="Student Index Number"

              onChangeText={setIndexNumber}

              placeholder="e.g. 6142424"

              required

              value={indexNumber}

            />



            <InputField

              autoCapitalize="none"

              autoComplete="email"

              hideIcon

              keyboardType="email-address"

              label="Email Address"

              onChangeText={setEmail}

              placeholder="you@st.knust.edu.gh"

              required

              textContentType="emailAddress"

              value={email}

            />



            <InputField

              hideIcon

              label="Password"

              onChangeText={setPassword}

              placeholder="Min. 8 characters"

              required

              secureTextEntry

              value={password}

            />



            <TermsCheckbox checked={agreed} onToggle={() => setAgreed(!agreed)} />



            <Button
              disabled={loading}
              loading={loading}
              onPress={handleCreateAccount}
              title="Create Account"
            />



            <Text style={styles.loginRow}>

              Already have an account?{' '}

              <Text

                onPress={() => router.replace('/login')}

                style={styles.loginLink}

              >

                Log in

              </Text>

            </Text>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </View>

  );

}



const styles = StyleSheet.create({

  screen: {

    flex: 1,

    backgroundColor: Colors.background,

  },

  flex: {

    flex: 1,

  },

  scrollContent: {

    paddingBottom: Spacing.xxxl,

  },

  formCard: {

    backgroundColor: Colors.white,

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    marginTop: -12,

    paddingHorizontal: Spacing.xl,

    paddingTop: Spacing.xxl,

    paddingBottom: Spacing.xxl,

    flex: 1,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: -2 },

    shadowOpacity: 0.04,

    shadowRadius: 8,

    elevation: 2,

  },

  heading: {

    fontFamily: Fonts.headingBold,

    fontSize: 22,

    color: Colors.textPrimary,

    marginBottom: Spacing.xs,

  },

  subheading: {

    fontFamily: Fonts.body,

    fontSize: 13,

    color: Colors.textTertiary,

    marginBottom: Spacing.xl,

    lineHeight: 18,

  },

  nameRow: {

    flexDirection: 'row',

    gap: Spacing.sm + 2,

  },

  nameField: {

    flex: 1,

  },

  loginRow: {

    fontFamily: Fonts.body,

    fontSize: 13,

    color: Colors.textTertiary,

    textAlign: 'center',

    marginTop: Spacing.lg,

  },

  loginLink: {

    fontFamily: Fonts.bodySemiBold,

    color: Colors.greenDark,

  },

});


