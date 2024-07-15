// *가입 정보의 양식이 유효한지 알기위해 불러온 함수
import { Request, Response } from "express";
import { conditional } from "../client/ts/modules/functions/join/joinCondition";
import User from "../model/userModel";

export const home = (req: Request, res: Response) => {
  return res.status(200).render("home", { pageTitle: "Home" });
};

export const getJoin = (req: Request, res: Response) => {
  return res.status(200).render("join", { pageTitle: "Join" });
};

export const postJoin = async (req: Request, res: Response): Promise<void> => {
  const JOIN = "Join";
  const { name, email, password, checkPassword, phone } = req.body;
  if (conditional.emailCon(email) === false) {
    return res.status(400).render("join", {
      pageTitle: JOIN,
      errmsg: "이메일 양식이 유효하지 않습니다.",
    });
  }
  if (password !== checkPassword) {
    return res.status(400).render("join", {
      pageTitle: JOIN,
      errmsg: "비밀번호가 동일하지 않습니다.",
    });
  }
  if (conditional.phoneCon(phone) === false) {
    return res.status(400).render("join", {
      pageTitle: JOIN,
      errmsg: "전화번호 양식이 유효하지 않습니다.",
    });
  }
  const existsName = await User.exists({ name });
  const existsEmail = await User.exists({ email });
  const existsPhone = await User.exists({ phone });
  try {
    await User.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    return res.status(201).redirect("/");
  } catch (error) {
    if (existsName) {
      return res.status(400).render("join", {
        pageTitle: JOIN,
        errmsg: "아이디가 이미 존재합니다.",
      });
    } else if (existsEmail) {
      return res.status(400).render("join", {
        pageTitle: JOIN,
        errmsg: "이메일이 이미 존재합니다.",
      });
    } else if (existsPhone) {
      return res.status(400).render("join", {
        pageTitle: JOIN,
        errmsg: "전화번호가 이미 존재합니다.",
      });
    }
  }
};

export const getLogin = (req: Request, res: Response) => {
  return res.status(200).render("login", { pageTitle: "Login" });
};

export const postLogin = (req: Request, res: Response) => {
  return res.status(302).redirect("/");
};
