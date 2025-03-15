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

export const validatePhone = (phone) => {
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

  if (!phone || phone.trim() === "") {
    return "Phone number is required";
  } else if (!phoneRegex.test(phone)) {
    return "Invalid phone number format";
  }
  return null;
};
