import mongoose, { Connection } from "mongoose";

mongoose.connect(process.env.DB_URL as string);

const db: Connection = mongoose.connection;

db.on("error", () => {
  console.log("DB연결에 실패하였습니다.");
});

db.once("open", () => {
  console.log("DB연결에 성공하였습니다.");
});
