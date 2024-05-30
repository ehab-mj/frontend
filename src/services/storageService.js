const TOKEN = "token";

const isLocalStorage = () => {
  return localStorage.getItem(TOKEN);
};

const storeToken = (token, remeber) => {
  if (remeber) {
    localStorage.setItem(TOKEN, token);
    sessionStorage.removeItem(TOKEN);
  } else {
    sessionStorage.setItem(TOKEN, token);
    localStorage.removeItem(TOKEN);
  }
};
const getToken = () => {
  let token = isLocalStorage();
  if (token) {
    return token;
  } else {
    return sessionStorage.getItem(TOKEN);
  }
};

export { storeToken, getToken };
