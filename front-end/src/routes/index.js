import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import AccessoriesPage from "../pages/Accessories";
import AccessoryDetailPage from "../pages/AccessoryDetail";
import RegisterPage from "../pages/Register";
import CarDetailPage from "../pages/CarDetail";
import CreateURLPaymentOfDepositPage from "../pages/CreateURLPaymentOfDeposit";
import DepositPaymentResponsePage from "../pages/PaymentResponse";
import TestDriveRegistration from "../pages/TestDriveRegistration";
import { DashboardLayout, ProfileUserLayout } from "../layouts";
import AccountTablePage from "../pages/AccountTable";
import CartPage from "../pages/Cart";

// Transaction
import ViewHistoryPaymentPage from "../pages/ViewHistoryPayment";
import AdminManageDepositTransactionsPage from "../pages/AdminManageDepositTransactions";
import AdminManageAccessoryTransactionsPage from "../pages/AdminManageAccessoryTransactions";


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

// Admin Manage Test Driven
import AdminManageTestDrivenPage from "../pages/AdminManageTestDriven";
import UpdateAccessoryPage from "../pages/AdminManageAccessories/UpdateAccessory";
import AdminManageImportExportPage from "../pages/AdminManageImportExport";
import AdminManageAccessoryTransactionsDetailPage from "../pages/AdminManageAccessoryTransactionsDetail";
import PersonalInfoPage from "../pages/PersonalInfor";
const publicRoutes = [
  { path: "/", page: HomePage },
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
  { path: "/deposit-transaction-history", page: ViewHistoryPaymentPage, layout: ProfileUserLayout },
  { path: "/profile", page: PersonalInfoPage, layout: ProfileUserLayout },

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

  {
    path: "/dashboard/edit-accessory/:accessoryId",
    page: UpdateAccessoryPage,
    layout: DashboardLayout,
  },

  // Admin Manage Import export history route
  {
    path: "/dashboard/import-export-history",
    page: AdminManageImportExportPage,
    layout: DashboardLayout,
  },

  // Admin manage deposit transaction routes
  { path: "/dashboard/deposit-transactions-history", page: AdminManageDepositTransactionsPage, layout: DashboardLayout },

  // Admin manage accessory routes
  { path: "/dashboard/accessory-transactions-history", page: AdminManageAccessoryTransactionsPage, layout: DashboardLayout },
  { path: "/dashboard/accessory-transactions-detail/:invoiceId", page: AdminManageAccessoryTransactionsDetailPage, layout: DashboardLayout },


  // Admin manage test driven routes
  { path: "/dashboard/test-driven-register", page: AdminManageTestDrivenPage, layout: DashboardLayout },

];

export { publicRoutes };
