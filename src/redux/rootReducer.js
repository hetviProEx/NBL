import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app/reducer";
import login from "./login/reducer";
import partner from "./partner/reducer";
import product from "./product/reducer";
import subscribe from "./subscribe/reducer";
import wallet from "./wallet/reducer";
import user from "./user/reducer";
import crm from "./crm/reducer";
import cms from "./cms/reducer";
import dashBoard from "./dashBoard/reducer";
import setLeads from "./setLeads/reducer";
import media from "./media/reducer";
import commission from "./commission/reducer";
import promo from "./promo/reducer";
import poc from "./poc/reducer";
const rootReducer = (history) =>
  combineReducers({
    app,
    login,
    partner,
    user,
    product,
    subscribe,
    wallet,
    crm,
    cms,
    dashBoard,
    setLeads,
    media,
    commission,
    promo,
    poc,
    router: connectRouter(history),
  });
export default rootReducer;
