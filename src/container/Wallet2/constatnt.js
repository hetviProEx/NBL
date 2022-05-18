const WalletConst = {
  entries: "entries",
  show: "Show",
  search: "Search...",
  add: "Add",
  tranHistory: "Transaction History",
  maxValue: "Please enter less than 50 lakhs",
  wallet: "'s Wallet",
  withDra: "Withdraw",
  requst:" Request"
};
const TopRowData = [
  { value: "4000", name: "Total amount" },
  { value: "3500", name: "Unpaid amount" },
  { value: "3000", name: "Paid amount" },
  { value: "2500", name: "Available amount" },
];
const TabsConst = [{ name: "Transaction" }, { name: "Withdraw" }];
const TransData = [
  {
    TranId: "125463878",
    prdc: "NBL",
    type: "CR",
    amount: "100",
    date: "2022-05-10",
  },
  {
    TranId: "125463878",
    prdc: "NBL",
    type: "DB",
    amount: "200",
    date: "2022-05-10",
  },
  {
    TranId: "125463878",
    prdc: "NBL",
    type: "CR",
    amount: "300",
    date: "2022-05-10",
  },
  {
    TranId: "125463878",
    prdc: "NBL",
    type: "DB",
    amount: "50",
    date: "2022-05-10",
  },
];
const WithData = [
  {
    requestDate: "2022-05-10",
    reqAprAmount: "90",
    status: 0,
    reqAmount: "100",
  },
  {
    requestDate: "2022-05-10",
    reqAprAmount: "100",
    status: 1,
    reqAmount: "200",
  },
  {
    requestDate: "2022-05-10",
    reqAprAmount: "200",
    status: 2,
    reqAmount: "300",
  },
  { requestDate: "2022-05-10", reqAprAmount: "25", status: 3, reqAmount: "50" },
];

export { WalletConst, TopRowData, TabsConst, TransData, WithData };
