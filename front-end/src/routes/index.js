import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import ProfilePage from "../pages/Profile";
import AccessoriesPage from "../pages/Accessories";
import AccessoryDetailPage from "../pages/AccessoryDetail";
import RegisterPage from "../pages/Register";
import CarDetailPage from "../pages/CarDetail";
import DepositPaymentPage from "../pages/DepositPayment";
import DepositPaymentResponsePage from "../pages/DepositPaymentResponse";
import TestDriveRegistration from "../pages/TestDriveRegistration";
import { DashboardLayout } from "../layouts";
import AccountTablePage from "../pages/AccountTable";
import CartPage from "../pages/Cart";

// Admin Manage Product
import CarsTablePage from "../pages/AdminManageProduct/CarsTable";
import CreateCarPage from "../pages/AdminManageProduct/CreateCar";
import AddCarImagePage from "../pages/AdminManageProduct/AddCarImage";
import UpdateCarPage from "../pages/AdminManageProduct/UpdateCar";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/profile", page: ProfilePage },
  { path: "/cars", page: CarsPage },
  { path: "/cars/:carId", page: CarDetailPage },
  { path: "/accessories", page: AccessoriesPage },
  { path: "/accessories/:accessoryId", page: AccessoryDetailPage },
  { path: "/cart", page: CartPage },
  { path: "/login", page: LoginPage, layout: null },
  { path: "/register", page: RegisterPage, layout: null },
  { path: "/deposit/:carId", page: DepositPaymentPage },
  { path: "/deposit-response", page: DepositPaymentResponsePage },
  { path: "/testdrivegistration", page: TestDriveRegistration },
  { path: "/reset-password", page: TestDriveRegistration },
  {
    path: "/dashboard/account",
    page: AccountTablePage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/cars",
    page: CarsTablePage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/create-new-car",
    page: CreateCarPage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/add-car-image",
    page: AddCarImagePage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/edit-car/:carId",
    page: UpdateCarPage,
    layout: DashboardLayout,
  },
];

export { publicRoutes };
