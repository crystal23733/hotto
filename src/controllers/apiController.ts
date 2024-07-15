import generateUniqueNumbers from "../modules/API/generateUniqueNumbers";

export const getLottoData = async ():Promise<void> => {
  generateUniqueNumbers().then((history) => {
    console.log(history);
  });
};
