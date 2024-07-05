import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("DB연결에 실패하였습니다.");
});

db.on("open", () => {
  console.log("DB연결에 성공하였습니다.");
});
