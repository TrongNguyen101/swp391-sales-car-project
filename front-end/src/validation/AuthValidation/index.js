export const validateFullname = (fullname) => {
  // Early return for non-string or undefined input
  if (typeof fullname !== "string" || fullname === undefined || fullname === null) {
    return "Fullname must be a valid string";
  }
  const trimmed = fullname.trim(); // Trim once for efficiency

  // Check if empty
  if (trimmed === "") {
    return "Fullname is required";
  }

  // Check length (optional max limit)
  if (trimmed.length > 50) {
    return "Fullname must not exceed 50 characters";
  }

  // Check for invalid characters (allow letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return "Fullname can only contain letters, spaces, hyphens, and apostrophes";
  }

  // Split into words (handle multiple spaces)
  const words = trimmed.split(/\s+/).filter(word => word.length > 0);

  // Check word count (configurable minimum)
  const minWords = 2; // Could be a parameter if flexibility is needed
  if (words.length < minWords) {
    return `Fullname must contain at least ${minWords} words`;
  }

  // Check each word's minimum length
  const minWordLength = 1; // Adjust as needed
  if (words.some(word => word.length < minWordLength)) {
    return `Each word in Fullname must be at least ${minWordLength} character(s)`;
  }

  // Check for leading/trailing spaces (already handled by trim, but explicit for clarity)
  if (fullname !== trimmed) {
    return "Fullname should not start or end with a space";
  }

  return null; // Valid
};

export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /\.\./.test(email)) {
    return "Email is invalid";
  } else if (/\s/.test(email)) {
    return "Email should not contain space";
  } else if (/^[!@#$%^&*(),.?":{}|<>]|[!@#$%^&*(),.?":{}|<>]$/.test(email)) {
    return "Email is incorect format";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (password.length > 20) {
    return "Password must be at most 20 characters long";
  } else if (/\s/.test(password)) {
    return "Password should not contain spaces";
  } else if (
    !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)
  ) {
    return "Password must contain at least one uppercase letter, one number, and one special character";
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Confirm Password is required";
  } else if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

export const validatePhone = (phone) => {

  const trimmed = phone.trim(); // Remove leading/trailing spaces

  // Check if empty
  if (trimmed === "") {
    return "Phone number is required";
  }

  const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/;
  if (!phone) {
    return "Phone is required";
  }
  if (!phoneRegex.test(phone)) {
    return "Phone number is invalid";
  }

  if (phone !== trimmed) {
    return "Phone number should not start or end with a space";
  }

  return null;
};

export const validateAddress = (address) => {
  // Check for valid string input
  if (typeof address !== "string" || address === undefined || address === null) {
    return "Address must be a valid string";
  }
  const trimmed = address.trim(); // Trim once for efficiency
  // Check if empty
  if (trimmed === "") {
    return "Address is required";
  }
  // Check maximum length (e.g., 100 characters)
  if (trimmed.length > 100) {
    return "Address must not exceed 100 characters";
  }
  // Check for valid characters (letters, numbers, spaces, hyphens, periods, commas)
  if (!/^[a-zA-Z0-9\s.,'-]+$/.test(trimmed)) {
    return "Address can only contain letters, numbers, spaces, commas, periods, hyphens, and apostrophes";
  }
  // Check for leading/trailing spaces
  if (address !== trimmed) {
    return "Address should not start or end with a space";
  }

  return null; // Valid
};

export const validateInput = (input) => {
  const trimmed = input.trim(); // Trim once for efficiency
  if (trimmed === "") {
    return "Input is required";
  }
  if (input !== trimmed) {
    return "Input should not start or end with a space";
  }
  return null; // Valid
}