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
