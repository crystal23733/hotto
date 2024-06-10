import path from 'path';
import { __dirname } from "../modules/findDirectory.js";

export const getHome = (req, res) => {
  const filePath = path.join(__dirname, 'public', 'home.html');
  return res.status(200).sendFile(filePath);
}

export const getJoin = (req, res) => {
  const filePath = path.join(__dirname, 'public', 'join.html');
  return res.status(200).sendFile(filePath);
}

export const postJoin = (req, res) => {
  return res.status(302).redirect('/');
}

export const getLogin = (req, res) => {
  const filePath = path.join(__dirname, 'public', 'login.html');
  return res.status(200).sendFile(filePath);
}

export const postLogin = (req, res) => {
  return res.status(302).redirect('/');
}