import User from '../model/userModel.js';

export const home = (req, res) => {
  return res.status(200).render('home', { pageTitle: 'Home' });
};

export const getJoin = (req, res) => {
  return res.status(200).render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res) => {
  const { name, email, password, phone } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });
  return res.status(201).redirect('/');
};

export const getLogin = (req, res) => {
  return res.status(200).render('login', { pageTitle: 'Login' });
};

export const postLogin = (req, res) => {
  return res.status(302).redirect('/');
};
