export const SearchByEmailValidate = (value) => {
  const trimmedValue = value.toLowerCase().trim();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue) ||
    /\.\./.test(trimmedValue)
  ) {
    return "Email is invalid";
  } else if (/\s/.test(trimmedValue)) {
    return "Email should not contain space";
  } else if (
    /^[!@#$%^&*(),.?":{}|<>]|[!@#$%^&*(),.?":{}|<>]$/.test(trimmedValue)
  ) {
    return "Email is incorect format";
  }
  return null;
};

export const SearchByFullnameValidate = (value) => {
  const trimmedValue = value.toLowerCase().trim();
  if (/\d/.test(trimmedValue)) {
    return "Fullname should not contain numbers";
  } else if (trimmedValue.trim().split(/\s+/).length < 2) {
    return "Fullname must contain at least two words";
  } else if (/^\s|\s$/.test(trimmedValue)) {
    return "Fullname should not start or end with a space";
  }
  return null;
};

export const SearchByPhoneValidate = (value) => {
  const trimmedValue = value.toLowerCase().trim();
  if (!/^\d{10}$/.test(trimmedValue)) {
    return "Phone number is invalid";
  }
  return null;
};
