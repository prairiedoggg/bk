const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 프로필 편집
router.put("/:userId/profile", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { name, comments, pictureUrl } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                profile: { name, comments, pictureUrl },
            },
            { new: true }
        );

        if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// 찜해둔 도서관 목록
router.get("/:userId/favoriteLibraries", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("favoriteLibraries");
        if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
        res.json(user.favoriteLibraries);
    } catch (error) {
        next(error);
    }
});

// 도서관 찜하기
router.post("/:userId/favoriteLibraries/:libraryId", async (req, res, next) => {
    try {
        const { userId, libraryId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");

        user.favoriteLibraries.push(libraryId);
        await user.save();
        res.status(200).send("도서관을 추가 했습니다.");
    } catch (error) {
        next(error);
    }
});

// 리뷰 쓴 리스트
router.get("/:userId/reviews", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path: "reviews",
            populate: { path: "library" },
        });
        if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
        res.json(user.reviews);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
