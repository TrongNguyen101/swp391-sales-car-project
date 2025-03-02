export const validateOTP = (otp) => {
  if (!otp || otp.trim() === "") {
    return "OTP is required";
  } else if (!/^\d{6}$/.test(otp)) {
    return "OTP must be 6 digits long";
  }
  return null;
};