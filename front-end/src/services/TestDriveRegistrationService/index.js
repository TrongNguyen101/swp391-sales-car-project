import * as request from "../../utils/TestDriveRequest";

/**
 * Gửi yêu cầu đăng ký lái thử lên backend.
 *
 * @param {string} fullName - Họ và tên của người đăng ký.
 * @param {string} phone - Số điện thoại của người đăng ký.
 * @param {string} email - Địa chỉ email của người đăng ký.
 * @param {string} carId - Mẫu xe mà người dùng muốn lái thử.
 * @param {string} description - Yêu cầu bổ sung (nếu có).
 * @returns {Promise<Object>} Phản hồi từ server.
 * @throws {Object} Phản hồi lỗi từ server nếu có sự cố xảy ra.
 */
export const postTestDriveRegistration = async (
  fullName,
  phone,
  email,
  carId,
  description
) => {
  try {
    // Log the request payload
    console.log("Request payload:", {
      fullName,
      phone,
      email,
      carId,
      description,
    });

    const response = await request.post(
      "api/TestDriveRegistration", // Endpoint của controller
      {
        fullName: fullName,
        phone: phone,
        email: email,
        carId: carId,
        description: description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error response from server:", error.response);
    return error.response;
  }
};

export const adminGetAllTestDriveRegistration = async () => {
  try {
    const response = await request.get("/api/TestDriveRegistration");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminUpdateStatusTestDriveRegistration = async (
  idTestRegister,
  testRegisterData
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await request.put(
      `/api/TestDriveRegistration/updateStatus/${idTestRegister}`,
      testRegisterData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
