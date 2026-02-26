// Admin Authentication Utilities

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  return password === adminPassword;
}

export function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET not set in environment variables');
  }

  return secret;
}
