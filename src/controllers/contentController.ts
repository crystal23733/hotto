import { Request, Response } from "express";

export const getPick = (req: Request, res: Response) => {
  return res.status(200).render("pick", { pageTitle: "로또번호 생성" });
};
