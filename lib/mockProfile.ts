/**
 * Mock profile data — mirrors Auth Service GET /api/v1/users/me until API is wired.
 */

export const MOCK_PROFILE = {
  firstName: 'Rexford',
  lastName: 'Apea',
  initials: 'RA',
  indexNumber: '6142424',
  email: 'rexford@st.knust.edu.gh',
  phone: '+233501234567',
  role: 'Student',
  campusLocation: 'KNUST Main Campus',
  memberSince: 'June 2026',
  balance: '487.50',
  saved: '85.00',
  activeSplits: 1,
} as const;

export function getShortName(profile = MOCK_PROFILE) {
  return `${profile.firstName} ${profile.lastName.charAt(0)}.`;
}
