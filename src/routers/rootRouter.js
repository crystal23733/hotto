import express from 'express';
import { getHome, getJoin, getLogin, postJoin, postLogin } from '../controllers/rootController.js';

const rootRouter = express.Router();

rootRouter.get('/', getHome);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);

export default rootRouter;