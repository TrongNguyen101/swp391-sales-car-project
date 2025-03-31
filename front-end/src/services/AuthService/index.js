import * as request from "../../utils/AuthRequest";

/**
 * Login user with the provided details.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Object} The error response from the server if the request fails.
 */
export const postLogin = async (email, password) => {
  try {
    const response = await request.post(
      "api/Auth/Login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const confirmPassword = async (email, password) => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Auth/ConfirmPassword";
    const response = await request.post(
      enpoint,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/**
 * Registers a new user with the provided details.
 *
 * @param {string} fullname - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Object} The error response from the server if the request fails.
 */
export const postRegister = async (
  fullname,
  email,
  password,
  rePassword,
  phone,
  otp
) => {
  try {
    const response = await request.post(
      "api/Auth/Register",
      {
        fullname: fullname,
        email: email,
        password: password,
        rePassword: rePassword,
        phone: phone,
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const checkEmail = async (emailNeedToCheck) => {
  try {
    const enpoint = `api/Auth/checkEmailExist`;
    const response = await request.post(
      enpoint,
      {
        email: emailNeedToCheck,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postSendOTP = async (email) => {
  try {
    const enpoint = `api/Auth/SendOTP`;
    const response = await request.post(
      enpoint,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postVerifyOTP = async (email, otp) => {
  try {
    const response = await request.post(
      "api/Auth/VerifyOTP",
      {
        email: email,
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postResetPassword = async (
  email,
  newPassword,
  rePassword,
  OTPCode
) => {
  try {
    const enpoint = "api/Auth/ResetPassword";
    const response = await request.post(
      enpoint,
      {
        Email: email,
        Password: newPassword,
        RePassword: rePassword,
        OTP: OTPCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
