// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기
// todo express 대체하기
// todo 서버 모듈화 진행
import express from 'express';
import rootRouter from './routers/rootRouter.js';

const app = express();

// *css나 js같은 정적 파일을 폴더에서 전달할 수 있는지 확인하는 모든 수신 요청을 받아들이는 미들웨어. 파라미터로는 정적 파일에 대한 폴더 이름을 받는다.
app.use(express.static('public'));

app.use('/', rootRouter);

export default app;