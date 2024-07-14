import { Request, Response } from "express";
import generateUniqueNumbers from "../modules/API/generateUniqueNumbers";

export const getLottoData = async (req: Request, res: Response) => {
  generateUniqueNumbers().then((history) => {
    console.log(history);
  });
};
