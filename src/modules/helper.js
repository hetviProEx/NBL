export const getAuthUserID = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth?.prj === "nblPartner" && auth?.userId) return auth.userId;
    return false;
  }
  return false;
};
export const getAuthType = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth?.type) return auth.type;
    return false;
  }
  return false;
};
export const getAuthUserName = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth?.userName) return auth.userName;
    return false;
  }
  return false;
};
export const getAuthRole = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth?.role) return auth.role;
    return false;
  }
  return false;
};
export const getAuthDate = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth?.date) return auth.date;
    return false;
  }
  return false;
};
