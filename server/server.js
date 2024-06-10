const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const mypageRoutes = require("./routes/mypageRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const postRoutes = require("./routes/postRoutes");
const libraryLocationRoutes = require("./routes/libraryLocationRoutes");
const parkLocationRoutes = require("./routes/parkLocationRoutes");
const errorHandler = require("./middlewares/errorHandler");
const Library = require("./models/librarySchema");
const Park = require("./models/parkSchema");

// 환경 변수 로드
dotenv.config();

// MongoDB Atlas 연결 설정
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.wnsz2zq.mongodb.net/TEST`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// 미들웨어 설정
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 라우트 설정
app.use("/api/mypage", mypageRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/library_locations", libraryLocationRoutes);
app.use("/api/park_locations", parkLocationRoutes);

// 루트 경로로 들어오는 요청에 대해 index.html 파일을 응답
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// 에러 핸들링 미들웨어
app.use(errorHandler);

// 서버 시작
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
