import * as request from "../../utils/AuthRequest";

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
