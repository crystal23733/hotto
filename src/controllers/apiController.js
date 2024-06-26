import { lottoDataFunc } from '../API/lottoDataFunc.js';

export const getLottoData = (req, res) => {
  try {
    const data = lottoDataFunc();
    console.log(data);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: '데이터를 읽어오는데에 실패하였습니다.' });
  }
};
