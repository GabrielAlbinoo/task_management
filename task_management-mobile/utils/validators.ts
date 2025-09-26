export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email.trim());
}

export function hasMinLength(value: string, minLength: number): boolean {
  return (value ?? '').length >= minLength;
}

export function hasMinTrimmedLength(value: string, minLength: number): boolean {
  return (value ?? '').trim().length >= minLength;
}




