import { Platform } from 'react-native';

const DEFAULT_AUTH_URL = 'http://localhost:8081';
const DEFAULT_WALLET_URL = 'http://localhost:8082';
const DEFAULT_BUDGET_URL = 'http://localhost:8083';
const DEFAULT_SPLIT_URL = 'http://localhost:8085';
const DEFAULT_API_GATEWAY_URL = 'http://localhost:8080';

export const API_GATEWAY_URL =
  process.env.EXPO_PUBLIC_API_GATEWAY_URL || DEFAULT_API_GATEWAY_URL;

export const AUTH_SERVICE_URL =
  process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || API_GATEWAY_URL || DEFAULT_AUTH_URL;

export const WALLET_SERVICE_URL =
  process.env.EXPO_PUBLIC_WALLET_SERVICE_URL || API_GATEWAY_URL || DEFAULT_WALLET_URL;

export const BUDGET_SERVICE_URL =
  process.env.EXPO_PUBLIC_BUDGET_SERVICE_URL || API_GATEWAY_URL || DEFAULT_BUDGET_URL;

export const SPLIT_SERVICE_URL =
  process.env.EXPO_PUBLIC_SPLIT_SERVICE_URL || API_GATEWAY_URL || DEFAULT_SPLIT_URL;

export type UserRole = 'STUDENT' | 'VENDOR';

export type Profile = {
  id: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
  businessName?: string | null;
  indexNumber?: string | null;
  phone?: string | null;
  email: string;
  campusLocation?: string | null;
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  tokenType: 'Bearer';
  expiresInSeconds: number;
  user: Profile;
};

export type StudentRegisterPayload = {
  firstName: string;
  lastName: string;
  indexNumber: string;
  email: string;
  password: string;
};

export type VendorRegisterPayload = {
  businessName: string;
  phone: string;
  email: string;
  campusLocation: string;
  password: string;
};

export type Wallet = {
  id: string;
  userId: string;
  email: string;
  balance: number;
  currency: 'GHS';
  createdAt: string;
};

export type WalletTransaction = {
  id: string;
  type: 'TOP_UP' | 'WITHDRAWAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  amount: number;
  balanceAfter: number;
  description: string;
  reference: string;
  createdAt: string;
};

export type BudgetSummary = {
  totalBudgeted: number;
  totalSpent: number;
  totalRemaining: number;
  spentPercent: number;
};

export type Envelope = {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentUsed: number;
  icon: string;
  color: string;
  createdAt: string;
};

export type SplitMember = {
  id: string;
  userId?: string | null;
  name: string;
  initials: string;
  amount: number;
  status: 'OWES' | 'PAID';
  isYou: boolean;
};

export type SplitBill = {
  id: string;
  title: string;
  totalAmount: number;
  perPersonAmount: number;
  outstandingAmount: number;
  settledCount: number;
  memberCount: number;
  status: 'OPEN' | 'CLOSED';
  createdByYou: boolean;
  members: SplitMember[];
  createdAt: string;
};

type RequestOptions = RequestInit & {
  token?: string;
};

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(
  baseUrl: string,
  path: string,
  { token, headers, ...options }: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      data?.message || 'Something went wrong. Please try again.',
      response.status,
      data?.fields
    );
  }

  return data as T;
}

export function registerStudent(payload: StudentRegisterPayload) {
  return request<AuthResponse>(AUTH_SERVICE_URL, '/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ role: 'STUDENT', ...payload }),
  });
}

export function registerVendor(payload: VendorRegisterPayload) {
  return request<AuthResponse>(AUTH_SERVICE_URL, '/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ role: 'VENDOR', ...payload }),
  });
}

export function login(email: string, password: string) {
  return request<AuthResponse>(AUTH_SERVICE_URL, '/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getMyWallet(token: string) {
  return request<Wallet>(WALLET_SERVICE_URL, '/api/v1/wallets/me', { token });
}

export function getMyTransactions(token: string) {
  return request<WalletTransaction[]>(WALLET_SERVICE_URL, '/api/v1/transactions/me', {
    token,
  });
}

export function requestTopUp(token: string, amount: number, momoPhone?: string) {
  return request<WalletTransaction>(WALLET_SERVICE_URL, '/api/v1/wallets/me/top-ups', {
    method: 'POST',
    token,
    body: JSON.stringify({
      amount,
      momoPhone,
      description: 'MoMo top-up',
    }),
  });
}

export function requestWithdrawal(token: string, amount: number, momoPhone?: string) {
  return request<WalletTransaction>(WALLET_SERVICE_URL, '/api/v1/wallets/me/withdrawals', {
    method: 'POST',
    token,
    body: JSON.stringify({
      amount,
      momoPhone,
      description: 'MoMo withdrawal',
    }),
  });
}

export function getBudgetSummary(token: string) {
  return request<BudgetSummary>(BUDGET_SERVICE_URL, '/api/v1/budgets/me/summary', {
    token,
  });
}

export function getMyEnvelopes(token: string) {
  return request<Envelope[]>(BUDGET_SERVICE_URL, '/api/v1/envelopes/me', {
    token,
  });
}

export function createDefaultEnvelopes(token: string) {
  return request<Envelope[]>(BUDGET_SERVICE_URL, '/api/v1/envelopes/defaults', {
    method: 'POST',
    token,
  });
}

export function createEnvelope(
  token: string,
  payload: { name: string; budgetAmount: number; icon?: string; color?: string }
) {
  return request<Envelope>(BUDGET_SERVICE_URL, '/api/v1/envelopes', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export function fundEnvelope(token: string, envelopeId: string, amount: number) {
  return request<Envelope>(BUDGET_SERVICE_URL, `/api/v1/envelopes/${envelopeId}/fund`, {
    method: 'POST',
    token,
    body: JSON.stringify({ amount }),
  });
}

export function spendFromEnvelope(token: string, envelopeId: string, amount: number) {
  return request<Envelope>(BUDGET_SERVICE_URL, `/api/v1/envelopes/${envelopeId}/spend`, {
    method: 'POST',
    token,
    body: JSON.stringify({ amount }),
  });
}

export function getActiveSplit(token: string) {
  return request<SplitBill | null>(SPLIT_SERVICE_URL, '/api/v1/splits/me/active', {
    token,
  });
}

export function createDefaultSplit(token: string) {
  return request<SplitBill>(SPLIT_SERVICE_URL, '/api/v1/splits/defaults', {
    method: 'POST',
    token,
  });
}

export function settleMySplitShare(token: string, splitId: string) {
  return request<SplitBill>(SPLIT_SERVICE_URL, `/api/v1/splits/${splitId}/settle`, {
    method: 'POST',
    token,
  });
}

export function getLocalApiHint() {
  if (Platform.OS === 'web') {
    return 'Backend not reachable. Make sure Docker is running.';
  }

  return 'Backend not reachable. If you are using Expo Go on your phone, set the API URLs to your computer IP address.';
}
