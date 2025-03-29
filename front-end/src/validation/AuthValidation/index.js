export const validateFullname = (fullname) => {
  if (!fullname || fullname.trim() === "") {
    return "Fullname is required";
  } else if (/\d/.test(fullname)) {
    return "Fullname should not contain numbers";
  } else if (fullname.trim().split(/\s+/).length < 2) {
    return "Fullname must contain at least two words";
  } else if (/^\s|\s$/.test(fullname)) {
    return "Fullname should not start or end with a space";
  }
  return null;
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

  const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/; 

  if (!phone) {
    return "Phone is required";
  }

  if (!phoneRegex.test(phone)) {
    return "Phone number is invalid";
  }

  return null;
};