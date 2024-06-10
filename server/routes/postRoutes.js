const express = require("express");
const router = express.Router();
const Post = require("../models/postSchema");

// 게시물 목록 조회 (페이지네이션)
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().skip(skip).limit(limit).populate("author");

    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      posts
    });
  } catch (error) {
    next(error);
  }
});

// 내가 쓴 댓글 목록
router.get("/myComments/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const comments = await Comment.find({ user: userId }).populate(
      "user",
      "username profile.pictureUrl"
    );
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
