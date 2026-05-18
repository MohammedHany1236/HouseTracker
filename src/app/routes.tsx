import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Properties } from "./pages/Properties";
import { PropertyDetails } from "./pages/PropertyDetails";
import { DealReview } from "./pages/DealReview";
import { Alerts } from "./pages/Alerts";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/properties",
    Component: Properties,
  },
  {
    path: "/property/:id",
    Component: PropertyDetails,
  },
  {
    path: "/deal-review/:id",
    Component: DealReview,
  },
  {
    path: "/alerts",
    Component: Alerts,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);
