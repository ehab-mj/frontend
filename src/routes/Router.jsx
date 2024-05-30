import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import EditGamePage from "../Pages/EditGamePage";
import CreateGamePage from "../Pages/CreateGamePage";
import MyGamesPage from "../Pages/MyGamesPage";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import IsAdmin from "../guard/isAdmin";
import ProfilePage from "../Pages/ProfilePage";
import EditUserPage from "../Pages/EditUserPage";
import AboutUsPage from "../Pages/AboutPage/AboutUsPage";
import FavPage from "../Pages/Favorite/favoritePage";
import Error404 from "../Pages/404/Error404";
import UserInfo from "../sandbox/UserInfo";
import Forgetpassword from "../Pages/ForgetPass/Forgetpassword";
import ResetPassword from "../Pages/ForgetPass/ResetPassword";
import { Contact } from "../Layout/header/Contact";
import PageHeader from "../Layout/header/PageHeader";
import GamesDetailsPage from "../Pages/GamesPage/GamesDetailsPage";
import Cart from "../Pages/Cart/Cart";




const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.FORGETPASS} element={<Forgetpassword />} />
      <Route path={ROUTES.RESETPASSWORD} element={<ResetPassword />} />
      <Route path={`${ROUTES.DETAILS}/:id`} element={<GamesDetailsPage />} />
      <Route path={ROUTES.CART} element={<Cart />} />

      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.PAGEHEADER} element={<PageHeader />} />

      <Route
        path={`${ROUTES.EDITGAME}/:id`}
        element={
          <BizGuard>
            <EditGamePage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.CREATEGAME}
        element={
          <BizGuard>
            <CreateGamePage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.FAV}
        element={
          <AuthGuard>
            <FavPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITUSER}/:id`}
        element={
          <AuthGuard>
            <EditUserPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYGAMES}
        element={
          <BizGuard>
            <MyGamesPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <IsAdmin>
            {/* <SandboxPage /> */}
            <UserInfo />
          </IsAdmin>
        }
      ></Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
