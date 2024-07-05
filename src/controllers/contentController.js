export const getPick = (req, res) => {
  return res.status(200).render("pick", { pageTitle: "로또번호 생성" });
};
