import generateUniqueNumbers from "../modules/API/generateUniqueNumbers.js";

export const getLottoData = async (req, res) => {
  generateUniqueNumbers().then((history) => {
    console.log(history);
  });
};
