// *join html 선택자
import JoinInfo from "./interface/JoinInfo";

export const joinForm = document.getElementById("join-form") as HTMLElement;
export const join:JoinInfo = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  checkPassword: document.getElementById("checkPassword"),
  phone: document.getElementById("phone"),
};
export const joinStatusBox:JoinInfo = {
  name: document.getElementById("name-box"),
  email: document.getElementById("email-box"),
  password: document.getElementById("password-box"),
  checkPassword: document.getElementById("checkPassword-box"),
  phone: document.getElementById("phone-box"),
};
