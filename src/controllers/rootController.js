export const home = (req, res) => {
  return res.status(200).render('home');
}

export const getJoin = (req, res) => {
  return res.status(200).render('join');
}

export const postJoin = (req, res) => {
  return res.status(302).redirect('/');
}

// export const getLogin = (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'login.html');
//   return res.status(200).sendFile(filePath);
// }

// export const postLogin = (req, res) => {
//   return res.status(302).redirect('/');
// }