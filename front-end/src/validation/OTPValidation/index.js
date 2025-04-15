export const validateOTP = (otp) => {
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      return "OTP is required";
    } else if (trimmedOtp.length !== 6) {
      return "OTP must be 6 characters long";
    } else if (!/^\d+$/.test(trimmedOtp)) {
      return "OTP should contain only numbers";
    }
    return null;
  };