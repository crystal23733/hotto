import path from 'path';
import { __dirname } from "../modules/findDirectory.js";

export const getHome = (req, res) => {
  const filePath = path.join(__dirname, 'public', 'home.html');
  return res.status(200).sendFile(filePath);
}

export const postHome = (req, res) => {
  return res.redirect('/');
}