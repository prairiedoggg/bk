// 내가 쓴 글 목록
router.get("/myPosts/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate(
      "user",
      "username profile.pictureUrl"
    );
    res.json(posts);
  } catch (error) {
    next(error);
  }
});
