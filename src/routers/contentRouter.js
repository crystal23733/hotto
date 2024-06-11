import express from 'express';
import { getPick } from '../controllers/contentController.js';

const contentRouter = express.Router();

contentRouter.get('/pick', getPick);

export default contentRouter;