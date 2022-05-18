import {
  income,
  leads,
  monthlySale,
  activeCust,
  vizman,
  ezeo,
  eVoting,
  act,
  eAuction,
  iPing,
} from "components/Images";

const TopRowData = [
  { value: "-", name: "Income", img: income },
  { value: "3500", name: "leads", img: leads },
  { value: "5500", name: "Monthly sale", img: monthlySale },
  { value: "25", name: "Active Customer", img: activeCust },
];
const Products = [
  { img: vizman, class: "vizShadow" },
  { img: ezeo, class: "ezShadow" },
  { img: eVoting, class: "eVShadow" },
  { img: act, class: "actShadow" },
  { img: eAuction, class: "eAuShadow" },
  { img: iPing, class: "iPShadow" },
];
const DashConst = {
  name: "Name",
  accManDetail: "Account manager details",
  contNum: "Contact Number",
  emid: "Email ID",
  refCode: "Referral Code",
  hotSellPro: "Hot Selling Product",
  test: "Testimonial",
  author: "-Allen Canvoian",
  share: "Share",
  customer: "Customer Report",
  topSel: "Weekly Top Seller",
  report: "Sales Report",
  tran: "Transactions",
  refcode: "Referral Code",
  code: "51415614566",
  dummy: "Lorem Ipsum is simply dummy text",
  time: "20 Hours ago",
  content:
    " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  invite: "Invite freinds to get",
  free: " Free ",
  bonus: "bonuses!",
  pragraph:
    "Get a IDR 100,000 voucher by inviting your friends to fund #BecomeMember",
};
export { TopRowData, Products, DashConst };
