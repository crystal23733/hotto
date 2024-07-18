import express, { Router } from "express";
import { getLottoData } from "../controllers/apiController";

const apiRouter: Router = express.Router();

apiRouter.get("/lotto-data", getLottoData);

export default apiRouter;
