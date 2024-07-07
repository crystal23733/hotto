import express from "express";
import { getLottoData } from "../controllers/apiController.js";

const apiRouter = express.Router();

apiRouter.get("/lotto-data", getLottoData);

export default apiRouter;
