import React, { useEffect, useState } from "react";
import styles from "./TestDrive.module.scss"; // import style module
import { postTestDriveRegistration } from "../../services/TestDriveRegistrationService"; // Import hàm API

import * as adminCarServices from "../../services/AdminCarServices";

const VinFastLogo = "/logoJPG-removebg-preview.png";

const TestDriveRegistration = () => {
  const [listCar, setListCar] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    carId: "",
    description: "",
    subscribe: false,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Fetch data from server
  const fetchData = async () => {
    try {
      const response = await adminCarServices.userGetAllCars();
      if (response.statusCode !== 200) {
        setListCar([]);
      } else {
        console.log("all car:", response.data);
        setListCar(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isFormValid = () => {
    const { fullName, phone, email, carId, termsAccepted } = formData;
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
          alert("Registration successful! We will contact you soon.");
        } else {
          alert("Registration failed. Please try again later.");
        }
      } catch (error) {
        console.error("Registration failed. Please try again later.", error);
        alert("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div className={styles["testdrive-container"]}>
      {/* Cột bên trái hiển thị logo */}
      <div className={styles["left-section"]}>
        <img
          src={VinFastLogo}
          alt="VinFast Logo"
          className={styles["vinfast-logo"]}
        />
      </div>

      {/* Cột bên phải chứa form */}
      <div className={styles["right-section"]}>
        <h2 className={styles["form-title"]}>Test Drive Registration</h2>
        <p className={styles["subtitle"]}>
          Fill in your information to receive a great test drive experience with
          VinFast.
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
              {listCar.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.model}
                </option>
              ))}
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
