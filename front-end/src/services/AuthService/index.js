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

/**
 * Registers a new user with the provided details.
 *
 * @param {string} fullname - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Promise<Object>} The response from the server.
 * @throws {Object} The error response from the server if the request fails.
 */
export const postRegister = async (fullname, email, password) => {
  try {
    const response = await request.post(
      "api/Auth/Register",
      {
        fullname: fullname,
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

export const postSendOTP = async (email) => {
  try {
    const response = await request.post(
      "api/Auth/SendOTP",
      {
        email: email,
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
    return response;
  } catch (error) {
    return error.response;
  }
};
