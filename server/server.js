const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const userRoutes = require("./routes/userRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
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

// 도서관 위치 데이터를 반환하는 엔드포인트
app.get("/api/library_locations", async (req, res, next) => {
  try {
    // 도서관 정보를 조회하고 일부 필드를 선택
    const data = await Library.find().select(
      "-_id name district address phone url hours holidays latitude longitude"
    );
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    next(error);
  }
});

// 공원 위치 데이터를 반환하는 엔드포인트
app.get("/api/park_locations", async (req, res, next) => {
  try {
    // 공원 정보를 조회하고 일부 필드를 선택
    const data = await Park.find().select(
      "-_id name district address managing_department phone latitude longitude"
    );
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    next(error);
  }
});

// 사용자와 도서관 라우트 설정
app.use("/api/users", userRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/reviews", reviewRoutes);

// 루트 경로로 들어오는 요청에 대해 index.html 파일을 응답
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
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
