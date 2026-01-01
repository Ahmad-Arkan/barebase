import crypto from 'crypto';

export function generateToken(): { token: string; tokenHash: string } {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  return { token, tokenHash };
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function compareToken(tokenHash: string, token: string): boolean {
  const hashedInput = crypto.createHash('sha256').update(token).digest('hex');

  const bufferA = Buffer.from(tokenHash);
  const bufferB = Buffer.from(hashedInput);

  if (bufferA.length !== bufferB.length) return false;

  return crypto.timingSafeEqual(bufferA, bufferB);
}
