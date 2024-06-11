export const home = (req, res) => {
  return res.status(200).render('home');
}

export const getJoin = (req, res) => {
  return res.status(200).render('join');
}

export const postJoin = (req, res) => {
  return res.status(302).redirect('/');
}

export const getLogin = (req, res) => {
  return res.status(200).render('login');
}

export const postLogin = (req, res) => {
  return res.status(302).redirect('/');
}