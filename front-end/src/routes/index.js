import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import ProfilePage from "../pages/Profile";
import AccessoriesPage from "../pages/Accessories";
import RegisterPage from "../pages/Register";
import CarDetailPage from "../pages/CarDetail";
import DepositPaymentPage from "../pages/DepositPayment";
import DepositPaymentResponsePage from "../pages/DepositPaymentResponse";
import DashBoardPage from "../pages/DashBoard";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/profile", page: ProfilePage },
  { path: "/cars", page: CarsPage },
  { path: "/cars/:carId", page: CarDetailPage },
  { path: "/accessories", page: AccessoriesPage },
  { path: "/login", page: LoginPage, layout: null },
  { path: "/register", page: RegisterPage, layout: null },
  { path: "/deposit/:carId", page: DepositPaymentPage },
  { path: "/deposit-response", page: DepositPaymentResponsePage },
  { path: "/dashboard", page: DashBoardPage },
];

export { publicRoutes };
