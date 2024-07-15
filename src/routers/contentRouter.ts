import express, { Router } from "express";
import { getPick } from "../controllers/contentController";

const contentRouter: Router = express.Router();

contentRouter.get("/pick", getPick);

export default contentRouter;
