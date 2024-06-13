export const home = (req, res) => {
  return res.status(200).render('home', { pageTitle: 'Home' });
};

export const getJoin = (req, res) => {
  return res.status(200).render('join', { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
  const { body } = req;
  console.log(body);
  res.end();
  // return res.status(302).redirect('/');
};

export const getLogin = (req, res) => {
  return res.status(200).render('login', { pageTitle: 'Login' });
};

export const postLogin = (req, res) => {
  return res.status(302).redirect('/');
};
