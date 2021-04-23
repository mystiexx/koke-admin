import { PROTECTED_PATHS } from "./constants";
import { PUBLIC_PATHS } from "./constants";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from './pages/Users/Users'
import Login from './pages/Login/Login'
import Members from './pages/Members/Members'
import EditUser from "./pages/Users/EditUser";
import Shop from './pages/Shop/Shop'
import Orders from "./pages/Orders/Orders";

const {
  DASHBOARD,
  MEMBERS,
  USERS,
  EDIT,
  SHOP,
  ORDER
} = PROTECTED_PATHS;

const { LOGIN } = PUBLIC_PATHS;

export const SUB_ROUTES = [
  { path: DASHBOARD, page: Dashboard, exact: true },
  { path: USERS, page: Users, exact: true },
  { path: MEMBERS, page: Members, exact: true },
  { path: EDIT, page: EditUser, exact: true },
  { path: SHOP, page: Shop, exact: true },
  { path: ORDER, page:Orders, exact: true },

];
/**
 * Our application's public paths are contained here
 * @constant
 */
export const PUBLIC_ROUTES = [
  {
    path: LOGIN,
    page: Login
  },
];
