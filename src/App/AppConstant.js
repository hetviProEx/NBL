const FormValidation = {
  name: "Please enter Name",
  nameValid: "Please enter alphabet character",
  alphaOrNumValid: "Please enter alphabet or number character",
  nameMin: "Please enter at least 3 characters.",
  emailRequired: "Email Is Required",
  messageRequired: "Message Is Required",
  emailInvalid: "Please enter valid email address.",
  sameuser: "Username already used. please change it.",
  mobileRequired: "Mobaile No. Is Required",
  mobileInvalid: "Please enter valid mobile number.",
  pinInvalid: "Only 6 character allowed.",
  passwordMin: "Password must be at least 6 characters",
  aadharInvalid: "Please enter 12 numbers.",
  passwordInvalid:
    "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character",
  repatePWD:
    "Both 'New Password' & 'Conform New Password' need to be the same.",
  alphaValid: "Only alphabets are allowed for this field",
  gstvalid: "Enter valid GST no.",
  panValid: "Enter valid pan no.",
  alphaNumValid:
    "Please enter only alphanumeric letters. Special characters are not allowed",
};
const pwdMatch =
  /^(?=.*[aA-zZ])(?=.*\d)(?=.*[@$*#?&^_()[\]])[aA-zZ\d@$*#?&^_()[\]]{8,}$/;
const gstConst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panConst = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/; 
const ButtonConst = {
  next: "Next",
  cancel: "Cancel",
  save: "Save",
  add: "Add",
  edit: "Edit",
  submit: "Submit",
  delete: "Delete",
  download: "Download",
  answer: "Answer",
  decline: "Decline",
  upload: "Upload",
  logout: "Logout",
  select: "Select",
  payment: "Payment",
  update: "Update",
  search: "search...",
  previous: "Previous",
  updatePWD: "Update Password",
  genLicence: "Generate Licence",
  saveAddOther: "Save & Add Other",
  dowExTamp: "Download Excel Template",
  upExTamp: "Upload File",
};
const ConfirmConst = {
  no: "No",
  yes: "Yes",
  header: "Log out",
  message: "Are you sure you want to log-out?",
};
const RemoveConst = {
  no: "No ",
  que: " ?",
  yes: "Yes",
  danger: "danger",
  header: "Delete ",
  remove:"Remove",
  logout: "Log-out",
  logMessage: "Are you sure you want to logout?",
  deleteMessage: "Are you sure you want to remove ",
  dropText: "Drop image here or click to browse file here",
};
const ComConst = { req: "*", colon: " : " };
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export {
  FormValidation,
  ButtonConst,
  ConfirmConst,
  RemoveConst,
  Months,
  gstConst,
  panConst,
  pwdMatch,
  ComConst,
  Days,
};
