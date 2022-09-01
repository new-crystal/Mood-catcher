import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, opt) => {
  return cookies.set(name, value, { ...opt });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};
