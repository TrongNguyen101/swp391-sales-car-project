import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import ProfilePage from "../pages/Profile";
import AccessoriesPage from "../pages/Accessories";
import RegisterPage from "../pages/Register";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/profile", page: ProfilePage },
  { path: "/cars", page: CarsPage },
  { path: "/accessories", page: AccessoriesPage },
  { path: "/login", page: LoginPage, layout: null },
  { path: "/register", page: RegisterPage, layout: null },
];

export { publicRoutes };
