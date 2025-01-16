import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import CarsPage from "../pages/Cars";
import ProfilePage from "../pages/Profile";

const publicRoutes = [
  { path: "/", page: HomePage },
  { path: "/profile", page: ProfilePage },
  { path: "/cars", page: CarsPage },
  { path: "/login", page: LoginPage, layout: null },
];

export { publicRoutes };
