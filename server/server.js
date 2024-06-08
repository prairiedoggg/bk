const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");  // CORS 미들웨어 추가

const app = express();

const userRoutes = require("./routes/userRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const parkRoutes = require("./routes/parkRoutes");

// 환경 변수 로드
dotenv.config();

// MongoDB Atlas 연결 설정
mongoose
  .connect(
    `mongodb+srv://KimMIngyu:30PeEHk4ZN3JYlil@cluster0.wnsz2zq.mongodb.net/TEST`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("MongoDB에 성공적으로 연결되었습니다.");
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패 :", err);
  });

// CORS 설정 추가
app.use(cors());

// 미들웨어 설정
app.use(bodyParser.json());

// 클라이언트 정적 파일 서빙
app.use(express.static(path.join(__dirname, "../client/public")));


// 사용자와 도서관 라우트 설정
app.use("/api/users", userRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/parks", parkRoutes);

// 모든 요청에 대해 index.html 파일을 반환
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

// 서버 시작
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
