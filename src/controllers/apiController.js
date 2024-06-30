import lottoData from '../modules/API/lottoData.js';

export const getLottoData = async (req, res) => {
  lottoData().then((history) => {
    console.log('Loaded history:', history); // 처리된 history Set을 출력
  });
};
