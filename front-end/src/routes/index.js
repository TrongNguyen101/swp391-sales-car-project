import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import ProfilePage from "../pages/Profile";
import AccessoriesPage from "../pages/Accessories";
import AccessoryDetailPage from "../pages/AccessoryDetail";
import RegisterPage from "../pages/Register";
import CarDetailPage from "../pages/CarDetail";
import CreateURLPaymentOfDepositPage from "../pages/CreateURLPaymentOfDeposit";
import DepositPaymentResponsePage from "../pages/PaymentResponse";
import TestDriveRegistration from "../pages/TestDriveRegistration";
import { DashboardLayout } from "../layouts";
import AccountTablePage from "../pages/AccountTable";
import CartPage from "../pages/Cart";

// Invoice
import ViewHistoryPaymentPage from "../pages/ViewHistoryPayment";
import AdminManageDepositTransactionsPage from "../pages/AdminManageDepositTransactions";

// Admin Manage Cars
import CarsTablePage from "../pages/AdminManageCars/CarsTable";
import CreateCarPage from "../pages/AdminManageCars/CreateCar";
import AddCarImagePage from "../pages/AdminManageCars/AddCarImage";
import UpdateCarPage from "../pages/AdminManageCars/UpdateCar";
import AdminDetailCarPage from "../pages/AdminManageCars/AdminDetailCar";

// Admin Manage Accessories
import AccessoriesTablePage from "../pages/AdminManageAccessories/AccessoriesTable";
import CreateAccessoryPage from "../pages/AdminManageAccessories/CreateAccessory";
import AdminAccessoryDetailPage from "../pages/AdminManageAccessories/AdminAccessoryDetail";
import CreateURLPaymentOfAccessoryPage from "../pages/CreateURLPaymentOfAccessory";

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
  { path: "/deposit/:carId", page: CreateURLPaymentOfDepositPage },
  { path: "/deposit-response", page: DepositPaymentResponsePage },
  { path: "/testdrivegistration", page: TestDriveRegistration },
  { path: "/reset-password", page: TestDriveRegistration },

  { path: "/invoice/:userId", page: CreateURLPaymentOfAccessoryPage },
  { path: "/invoice-history", page: ViewHistoryPaymentPage },

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
  {
    path: "/dashboard/detail-car/:carId",
    page: AdminDetailCarPage,
    layout: DashboardLayout,
  },

  // Admin Manage Accessories routes
  {
    path: "/dashboard/accessories",
    page: AccessoriesTablePage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/create-new-accessory",
    page: CreateAccessoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/dashboard/accessory-detail/:accessoryId",
    page: AdminAccessoryDetailPage,
    layout: DashboardLayout,
  },

  // Admin Manage Invoices routes
  { path: "/dashboard/deposit-transactions-history", page: AdminManageDepositTransactionsPage, layout: DashboardLayout },
];

export { publicRoutes };
