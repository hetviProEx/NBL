export const configVar = { BASE_URL: "http://192.168.1.102/" }; //"https://partnerapi.naapbooks.com/"}; // "https://partnerapi.naapbooks.com/"}; // "https://partnerapi.naapbooks.com/"}; //  "http://192.168.29.24/" };//

export const apiConstant = {
  AUTH_LOGIN: "api/Admin​/Login/",
  AUTH_LOGOUT: "api/Account/Logout/",
  FORGET_PASSWORD: "api/Admin​/ForgotPassword​/",
  PARTNER_LOGIN: "​api​/Partner​/Login​/",
  FORGET_PARTNER_PASSWORD: "api/Partner​/ForgotPassword​/",
};
export const dashBoardConst = {
  GET_DASHBOARD: "api/Dashboard/GetPartnerDashboard/",
};
export const crmConst = {
  SAVE_PROSPECT: "api​/CRM/SaveProspect​",
  GET_PROSPECT: "api​/CRM/GetProspectList",
  DELETE_PROSPECT: "api​/CRM/DeleteProspect​/",
  GET_CUSTOMER: "api​/CRM/GetCustomerList/",
  GET_LEAD_CUSTOMER: "api/CRM/GetLeadCustomer/",
  GET_LEAD_TYPE: "api​/CRM/GetLeadTypeList",
  GET_PRODUCT: "api​/CRM/GetProductList",
  SAVE_LEADS: "api​/CRM/SaveLeads​/",
  GET_LEADS: "api​/CRM/GetLeadsList",
  DELETE_LEAD: "api​/CRM/DeleteLead​/",
  GET_PRODUCT_BY_CUSTOMER: "api​/CRM/GetProductListByCustomer​/",
  SAVE_DEMO: "api​/CRM/SaveDemo",
  GET_DEMO: "api​/CRM/GetDemoList",
  DELETE_DEMO: "api​/CRM/DeleteDemo​/",
  GET_PARTNER_PRODUCT: "api​/CRM/GetPartnerProductList/",
  GET_PRODUCT_SUBSCRIPTION: "api​/CRM/GetProductSubscription/",
  GET_LEAD_CUSTOMER: "api​/CRM/GetLeadCustomer/",
  SAVE_SALES: "api​/CRM/SaveSales",
  GET_SALES: "api​/CRM/GetSalesList",
  GET_SALES_BY_ID: "api/CRM/GetSalesbyId/",
  DELETE_SALES: "api/CRM/DeleteSalesById/",
  GET_SALES_DASHBOARD: "​api​/CRM/GetSalesDashboard​/",
  GET_DOWNLOAD: "​api​/CRM/DownloadFile",
  IMPORT_PROSPECT: "api/CRM/ImportProspect",
  SET_PROSPECT: "api/CRM/IsActiveProspect/",
  SET_LEAD: "api/CRM/IsActiveLead/",
  SET_DEMO: "api/CRM/IsActiveDemo/",
  GET_LEADS_MEETING: "api/CRM/GetLeadsMeetingById/",
};
export const partnerConst = {
  SAVE_PARTNER: "api​/Partner/SavePartner",
  GET_PARTNERS: "api​/Partner/GetPartnerList",
  DELETE_PARTNER: "api​/Partner/DeletePartner/",
  GET_PARTNER_BY_ID: "api​/Partner/GetPartnerbyId​/",
};
export const partnerUsersConst = {
  SAVE_CONTACTUS: "api​/PartnerUsers/SaveContactus​",
  SAVE_SUPPORT: "api​/PartnerUsers/SaveSupport",
};
export const productConst = {
  SAVE_PRODUCT: "api​/Product/SaveProduct",
  GET_PRODUCT: "api​/Product/GetProductList",
  DELETE_PRODUCT: "api​/Product/DeleteProduct​/",
};
export const subscribeConst = {
  PACKAGE: "api​/Subscribe​/Package",
  SAVE_PRODUCT_PACKAGE: "api​/Subscribe​/SaveProductPackage​",
  GET_PRODUCT_PACKAGE: "api​/Subscribe​/GetProductPackageList​/",
  DELETE_PRODUCT_PACKAGE: "api​/Subscribe​/DeleteProductPackage​/",
  GET_PACKAGE_BY_ID: "api​/Subscribe​/GetPackageByProductId​/",
};
export const weatherConst = {
  WEATHER_FORECAST: "​/WeatherForecast/",
};
export const userConst = {
  GET_USER_RIGHTS: "api​/Users/GetUserRights",
  SAVE_USER: "api​/Users/SaveUser",
  GET_USERS: "api​/Users/GetUserList",
  DELETE_USER: "api​/Users/DeleteUser​/",
  GET_USER_BY_ID: "api​/Users/GetUserDataById​/",
};
export const WalletConst = {
  ADD_WITHDARAW_MONEY: "api​/Wallet/AddWithdrawMoney/",
  TARANSACTION_HISTORY: "api​/Wallet/TransactionHistoryList",
  CURRENTBALANCE: "api​/Wallet/CurrentBalence/",
  GET_WALLET_DATA_ID: "api/Wallet/GetWalletDataBy/",
  SAVE_WITHDRAW: "api/Wallet/SavePartnerWithdrawer",
  GET_WITHDRAW_LIST: "api/Wallet/GetPartnerWithdrawerList",
  DELETE_WITHDRAW_REQUEST: "api/Wallet/DeletePartnerWithdrawer/",
  GET_PARTNER_TRANSACTION: "api/Wallet/GetPartnerTransactionList",
  SAVE_WITHDRAW_REQUESTS: "api/Wallet/SaveAdminWithdrawer",
  GET_WITHDRAW_REQUESTS: "api/Wallet/GetAdminWithdrawerList",
};
export const mediaConst = {
  SAVE_MEDIA: "api/Media/SaveMedia",
  GET_MEDIA: "api/Media/GetMediaList",
  DELETE_MEDIA: "api/Media/DeleteMedia/",
  GET_MEDIA_DOWNLOAD: "api/Media/Downloaddoc/",
};
export const commissionConst = {
  SAVE_COMMISSION: "api/Commission/SaveCommission",
  GET_COMMISSION: "api/Commission/GetCommissionList",
  DELETE_COMMISSION: "api/Commission/DeleteCommission/",
  SAVE_COMMISSION_MANAGE: "api/Commission/SaveCommissionManage",
  GET_COMMISSION_MANAGE: "api/Commission/GetCommissionManageList",
  GET_COMMISSION_BY_ID: "api/Commission/GetCommissionSalesDetails/",
};
export const pocConst = {
  SAVE_POC: "api/POC/SavePOC",
  GET_POC: "api/POC/GetPOCList",
  DELETE_POC: "api/POC/DeletePOCById/",
};
export const promoConst = {
  SAVE_PROMOCODE: "api/Promo/SavePromocode",
  GET_PROMO: "api/Promo/GetPromoList",
  DELETE_PROMO: "api/Promo/DeletePromo/",
};
export const cmsConst = {
  GET_LOGINIMAGES: "api/CMS/LoginImageList",
  SAVE_LOGINIMAGE: "api/CMS/SaveLoginImage",
  DELETE_LOGINIMAGES: "api/CMS/DeleteLoginImage/",
  GET_TESTIMONIAL: "api/CMS/GetTestimonialList",
  SAVE_TESTIMONIAL: "api/CMS/SaveTestimonial",
  DELETE_TESTIMONIAL: "api/CMS/DeleteTestimonial/",
  GET_TESTIMONIAL_BY_ID: "api/CMS/GetTestimonialbyId/",
  SAVE_OFFERS: "api/CMS/SaveOffers",
  GET_OFFERLIST: "api/CMS/OfferList",
  GET_OFFER_BY_ID: "api/CMS/GetOfferbyId/",
  DELETE_OFFER: "api/CMS/DeleteOfferById/",
  SAVE_CATEGORY: "api/CMS/SaveCategory",
  CATEGORY_LIST: "api/CMS/GetCategoryList",
  SAVE_KNOWLEDGE: "api/CMS/SaveKnowledge",
  KNOWLEDGE_LIST: "api/CMS/KnowledgeList",
  DELETE_KNOWLEDGE: "api/CMS/DeleteKnowledgeById/",
  KNOWLEDGE_BY_ID: "api/CMS/GetKnowledgeById/",
};
