import express from 'express';
import { getHome, getJoin, postJoin } from '../controllers/rootController.js';

const rootRouter = express.Router();

rootRouter.get('/', getHome);
rootRouter.route('/join').get(getJoin).post(postJoin);

export default rootRouter;