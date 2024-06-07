// 서버 설정 및 라우팅 파일 불러오기
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const userRoutes = require("./routes/userRoutes");
const libraryRoutes = require("./routes/libraryRoutes");

// 환경 변수 로드
dotenv.config();

// MongoDB Atlas 연결 설정
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.wnsz2zq.mongodb.net/library_db`,
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
    // 데이터베이스에서 도서관 정보를 조회합니다.
    const data = await libraryCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            도서관명: 1,
            구명: 1,
            주소: 1,
            전화번호: 1,
            운영시간: 1,
            "정기 휴관일": 1,
            "홈페이지 URL": 1,
            위도: 1,
            경도: 1
          }
        }
      )
      .toArray();

    // NaN 값을 null로 대체합니다.
    data.forEach((doc) => {
      for (let key in doc) {
        if (typeof doc[key] === "number" && isNaN(doc[key])) {
          doc[key] = null;
        }
      }
    });

    console.log(`Fetched data: ${JSON.stringify(data)}`); // 디버깅을 위한 출력
    res.json(data); // 데이터를 JSON 형식으로 반환합니다.
  } catch (error) {
    console.error(`Error fetching data: ${error}`); // 에러가 발생하면 로그를 출력합니다.
    next(error); // 에러 핸들링을 위해 next 호출
  }
});

// 공원 위치 데이터를 반환하는 엔드포인트
app.get("/api/park_locations", async (req, res, next) => {
  try {
    // 데이터베이스에서 공원 정보를 조회합니다.
    const data = await parkCollection
      .find(
        {},
        {
          projection: {
            _id: 0,
            공원명: 1,
            공원개요: 1,
            공원주소: 1,
            전화번호: 1,
            지역: 1,
            "X좌표(WGS84)": 1,
            "Y좌표(WGS84)": 1
          }
        }
      )
      .toArray();

    // NaN 값을 null로 대체합니다.
    data.forEach((doc) => {
      for (let key in doc) {
        if (typeof doc[key] === "number" && isNaN(doc[key])) {
          doc[key] = null;
        }
      }
    });

    res.json(data); // 데이터를 JSON 형식으로 반환합니다.
  } catch (error) {
    console.error(`Error fetching data: ${error}`); // 에러가 발생하면 로그를 출력합니다.
    next(error); // 에러 핸들링을 위해 next 호출
  }
});

// 라우터 설정
app.use("/api/users", userRoutes);
app.use("/api/libraries", libraryRoutes);

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
