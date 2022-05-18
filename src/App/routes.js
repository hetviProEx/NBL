import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getAuthUserID } from "modules/helper";
import CMS from "container/CMS";
import Login from "container/Login";
import Leads from "container/Leads";
import Sales from "container/Sales";
import Error from "container/Error";
import Wallet from "container/Wallet2";
import Support from "container/Support";
import PDFpage from "container/PDFpage";
import Profile from "container/Profile";
import Products from "container/Products";
import Partners from "container/Partners";
import UserList from "container/UserList";
import MediaKit from "container/MediaKit";
import PromoCode from "container/PromoCode";
import Dashboard from "container/Dashboard";
import ContactUs from "container/ContactUs";
import NewUser from "container/UserAddEdit";
import LeadsView from "container/LeadView";
import MyBusiness from "container/MyBusiness";
import AdminLeads from "container/AdminLeads";
import AdminSales from "container/AdminSales";
import PageLoader from "components/PageLoader";
import Certificate from "container/Certificate";
import PackageList from "container/PackageList";
import PointContact from "container/PointContact"
import AdminProduct from "container/AdminProduct";
//import Registration from "container/Registration";
import SalesAddEdit from "container/SalesAddEdit";
import ProductDetail from "container/ProductDetail";
import KnowledgeBase from "container/KnowledgeBase";
import DataExtension from "container/DataExtension";
import AdminProspect from "container/AdminProspect";
import ForgetPassword from "container/ForgetPassword";
import ChangePassword from "container/ChangePassword";
import PackageAddEdit from "container/PackageAddEdit";
import PartnerAddEdit from "container/PartnerAddEdit";
import CommissionCode from "container/CommissionCode";
import WithdrawRequest from "container/WithdrawRequest";

// import ResetPassword from "container/ResetPwd";
// const type = localStorage?.auth && JSON.parse(localStorage.auth).role;
const routes = [
  {
    path: "/login",
    exact: true,
    AuthRoute: false,
    component: Login,
  },
  {
    path: "/login/admin",
    exact: true,
    AuthRoute: false,
    component: Login,
  },
  // {
  //   path: "/login/user",
  //   exact: true,
  //   AuthRoute: false,
  //   component: Login,
  // },
  // {
  //   path: "/registration",
  //   exact: true,
  //   AuthRoute: false,
  //   component: Registration,
  // },
  {
    path: "/forget-password",
    exact: true,
    AuthRoute: false,
    component: ForgetPassword,
  },
  {
    path: "/forget-password/admin",
    exact: true,
    AuthRoute: false,
    component: ForgetPassword,
  },
  {
    path: "/forget-password/user",
    exact: true,
    AuthRoute: false,
    component: ForgetPassword,
  },
  {
    path: "/change-password",
    exact: true,
    AuthRoute: true,
    component: ChangePassword,
  },
  {
    path: "/",
    exact: true,
    AuthRoute: true,
    component: Partners,
  },
  {
    path: "/",
    exact: true,
    Admin: false,
    AuthRoute: true,
    component: Dashboard,
  },
  {
    path: "/dashboard",
    exact: true,
    AuthRoute: true,
    component: Dashboard,
  },
  {
    path: "/support",
    exact: true,
    AuthRoute: true,
    component: Support,
  },
  {
    path: "/media-kit",
    exact: true,
    AuthRoute: true,
    component: MediaKit,
  },
  {
    path: "/my-business",
    exact: true,
    AuthRoute: true,
    component: MyBusiness,
  },
  {
    path: "/leads",
    exact: true,
    AuthRoute: true,
    component: Leads,
  },
  {
    path: "/leads/:id",
    exact: true,
    AuthRoute: true,
    component: LeadsView,
  },
  {
    path: "/admin-leads/:id",
    exact: true,
    AuthRoute: true,
    component: AdminLeads,
  },
  {
    path: "/products",
    exact: true,
    AuthRoute: true,
    component: Products,
  },
  {
    path: "/sales",
    exact: true,
    AuthRoute: true,
    component: Sales,
  },
  {
    path: "/sales/new",
    exact: true,
    AuthRoute: true,
    component: SalesAddEdit,
  },
  {
    path: "/sales/new/:id",
    exact: true,
    AuthRoute: true,
    component: SalesAddEdit,
  },
  {
    path: "/users",
    exact: true,
    AuthRoute: true,
    component: UserList,
  },
  {
    path: "/user/new",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/edit-user/:id",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/productDetail/:name/:id",
    exact: true,
    AuthRoute: true,
    component: ProductDetail,
  },
  {
    path: "/profile",
    exact: true,
    AuthRoute: true,
    component: Profile,
  },
  {
    path: "/wallet",
    exact: true,
    AuthRoute: true,
    component: Wallet,
  },
  {
    path: "/wallet/:id",
    exact: true,
    AuthRoute: true,
    component: Wallet,
  },
  {
    path: "/knowledge-base",
    exact: true,
    AuthRoute: true,
    component: KnowledgeBase,
  },
  {
    path: "/partners",
    exact: true,
    AuthRoute: true,
    component: Partners,
  },
  {
    path: "/partner/new",
    exact: true,
    AuthRoute: true,
    component: PartnerAddEdit,
  },
  {
    path: "/partner/edit/:id",
    exact: true,
    AuthRoute: true,
    component: PartnerAddEdit,
  },
  {
    path: "/users",
    exact: true,
    AuthRoute: true,
    component: UserList,
  },
  {
    path: "/user/new",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/product/new",
    exact: true,
    AuthRoute: true,
    component: AdminProduct,
  },
  {
    path: "/product/edit/:id",
    exact: true,
    AuthRoute: true,
    component: AdminProduct,
  },
  {
    path: "/product",
    exact: true,
    AuthRoute: true,
    component: Products,
  },
  {
    path: "/package-list/:name/:id",
    exact: true,
    AuthRoute: true,
    component: PackageList,
  },
  {
    path: "/package/:name/new/:id",
    exact: true,
    AuthRoute: true,
    component: PackageAddEdit,
  },
  {
    path: "/package/:name/edit/:id/:editid",
    exact: true,
    AuthRoute: true,
    component: PackageAddEdit,
  },
  {
    path: "/sales/:id",
    exact: true,
    AuthRoute: true,
    component: AdminSales,
  },
  {
    path: "/certificate",
    exact: true,
    AuthRoute: true,
    component: Certificate,
  },
  {
    path: "/contact-us",
    exact: true,
    AuthRoute: true,
    component: ContactUs,
  },
  {
    path: "/result",
    exact: true,
    AuthRoute: true,
    component: PDFpage,
  },
  {
    path: "/promo-code",
    exact: true,
    AuthRoute: true,
    component: PromoCode,
  },
  {
    path: "/commission",
    exact: true,
    AuthRoute: true,
    component: CommissionCode,
  },
  {
    path: "/withdraw-request",
    exact: true,
    AuthRoute: true,
    component: WithdrawRequest,
  },
  {
    path: "/prospect/:id",
    exact: true,
    AuthRoute: true,
    component: AdminProspect,
  },
  {
    path: "/extension-data",
    exact: true,
    AuthRoute: true,
    component: DataExtension,
  },
  {
    path: "/cms",
    exact: true,
    AuthRoute: true,
    component: CMS,
  },
  {
    path: "/point-of-contact",
    exact: true,
    AuthRoute: true,
    component: PointContact,
  },
];
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (getAuthUserID()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
};
const RestrictedRoute = ({ component: Component, publicAccess, ...rest }) => {
  if (getAuthUserID()) {
    return (
      <Route
        {...rest}
        render={(props) =>
          publicAccess ? <Component {...props} /> : <Redirect to={"/"} />
        }
      />
    );
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {routes.map((route, index) => {
            return !route.AuthRoute ? (
              <RestrictedRoute {...route} key={index} />
            ) : (
              <PrivateRoute {...route} key={index} />
            );
          })}
          <Route render={(props) => <Error />} />
        </Switch>
      </Suspense>
    );
  }
}
export default Routes;
