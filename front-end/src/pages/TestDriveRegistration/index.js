import React, { useState } from 'react';
import styles from './TestDrive.module.scss'; // import style module
import { postTestDriveRegistration } from "../../services/TestDriveRegistrationService"; // Import hàm API

const VinFastLogo = "/logoJPG-removebg-preview.png";

const TestDriveRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    carId: '',
    description: '',
    subscribe: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const isFormValid = () => {
    const { fullName, phone, email, carId, termsAccepted,} = formData;
    return fullName && phone && email && carId && termsAccepted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        // Gọi API đăng ký lái thử với các thông tin cần thiết
        const response = await postTestDriveRegistration(
          formData.fullName,
          formData.phone,
          formData.email,
          formData.carId,
          formData.description
        );

        // Kiểm tra kết quả trả về (giả sử status 200 là thành công)
        if (response && response.status === 200) {
          alert("Đăng ký lái thử thành công!");
        } else {
          alert("Đăng ký thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi đăng ký lái thử:", error);
        alert("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
      }
    }
  };

  return (
    <div className={styles["testdrive-container"]}>
      {/* Cột bên trái hiển thị logo */}
      <div className={styles["left-section"]}>
        <img src={VinFastLogo} alt="VinFast Logo" className={styles["vinfast-logo"]} />
      </div>

      {/* Cột bên phải chứa form */}
      <div className={styles["right-section"]}>
        <h2 className={styles["form-title"]}>Test Drive Registration</h2>
        <p className={styles["subtitle"]}>
          Fill in your information to receive a great test drive experience with VinFast.
        </p>
        
        <form onSubmit={handleSubmit} className={styles["testdrive-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="fullName">
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              maxLength="80"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="phone">
              Phone Number <span>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="carId">
              Car Model <span>*</span>
            </label>
            <select
              id="carId"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              required
            >
              <option value="">Select Car Model</option>
              <option value="1">VF 3</option>
              <option value="2">VF 5</option>
              <option value="3">VF 6</option>
              <option value="4">VF 7</option>
              <option value="5">VF 8</option>
              <option value="6">VF 9</option>
            </select>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description">Additional Requirements</label>
            <textarea
              id="description"
              name="description"
              maxLength="50"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles["checkbox-group"]}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <span>I agree to the Terms & Policies</span>
          </div>

          <button
            type="submit"
            className={styles["submit-button"]}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>

        <div className={styles["hotline"]}>
          <p>
            Hotline: <strong>1900 23 23 89</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestDriveRegistration;
