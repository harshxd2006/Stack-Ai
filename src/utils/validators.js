export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 number
  const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

export const checkPasswordStrength = (password) => {
  let score = 0;
  if (!password) return score;
  if (password.length > 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  // returns 0 to 5
  return Math.min(5, score);
};
