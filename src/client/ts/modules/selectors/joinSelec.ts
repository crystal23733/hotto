// *join html 선택자
import { getInputElement, JoinInput } from "./interface/JoinInput";
import JoinStatusInterface from "./interface/JoinStatusInterface";

export const joinForm = document.getElementById("join-form") as HTMLElement;
export const join: JoinInput = {
  name: getInputElement("name"),
  email: getInputElement("email"),
  password: getInputElement("password"),
  checkPassword: getInputElement("checkPassword"),
  phone: getInputElement("phone"),
};
export const joinStatusBox: JoinStatusInterface = {
  name: document.getElementById("name-box"),
  email: document.getElementById("email-box"),
  password: document.getElementById("password-box"),
  checkPassword: document.getElementById("checkPassword-box"),
  phone: document.getElementById("phone-box"),
};
