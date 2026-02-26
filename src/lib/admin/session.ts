// Admin Session Management with JWT

import { cookies } from 'next/headers';
import { getSessionSecret } from './auth';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface SessionPayload {
  isAuthenticated: boolean;
  expiresAt: number;
}

// Simple base64 encoding/decoding for JWT-like tokens
function base64Encode(str: string): string {
  return Buffer.from(str).toString('base64url');
}

function base64Decode(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf-8');
}

// Create a simple signature using the secret
function createSignature(data: string, secret: string): string {
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
}

// Create a session token
export function createSessionToken(): string {
  const secret = getSessionSecret();
  const payload: SessionPayload = {
    isAuthenticated: true,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadStr = base64Encode(JSON.stringify(payload));
  const signature = createSignature(`${header}.${payloadStr}`, secret);

  return `${header}.${payloadStr}.${signature}`;
}

// Verify and decode a session token
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const secret = getSessionSecret();
    const [header, payloadStr, signature] = token.split('.');

    if (!header || !payloadStr || !signature) {
      return null;
    }

    // Verify signature
    const expectedSignature = createSignature(`${header}.${payloadStr}`, secret);
    if (signature !== expectedSignature) {
      return null;
    }

    // Decode and parse payload
    const payload: SessionPayload = JSON.parse(base64Decode(payloadStr));

    // Check expiration
    if (payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// Set session cookie
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

// Get session from cookie
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

// Clear session cookie
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Check if user is authenticated (for use in API routes)
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session?.isAuthenticated === true;
}
