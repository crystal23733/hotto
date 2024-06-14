// *가입 정보의 양식이 유효한지 알기위해 불러온 함수
import { conditional } from '../../public/js/modules/functions/join/joinCondition.js';
import User from '../model/userModel.js';

export const home = (req, res) => {
  return res.status(200).render('home', { pageTitle: 'Home' });
};

export const getJoin = (req, res) => {
  return res.status(200).render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res) => {
  const { name, email, password, checkPassword, phone } = req.body;
  if (conditional.emailCon(email) === false) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errmsg: '이메일 양식이 유효하지 않습니다.',
    });
  }
  if (password !== checkPassword) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errmsg: '비밀번호가 동일하지 않습니다.',
    });
  }
  if (conditional.phoneCon(phone) === false) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errmsg: '전화번호 양식이 유효하지 않습니다.',
    });
  }
  const existsUser = await User.find({ name, email, phone });
  try {
    await User.create({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    return res.status(201).redirect('/');
  } catch (error) {
    if (existsUser) {
      return res
        .status(400)
        .render('join', {
          pageTitle: 'Join',
          errmsg: '아이디 or 이메일 or 전화번호가 존재합니다.',
        });
    }
  }
};

export const getLogin = (req, res) => {
  return res.status(200).render('login', { pageTitle: 'Login' });
};

export const postLogin = (req, res) => {
  return res.status(302).redirect('/');
};
