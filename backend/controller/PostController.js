// controllers/postController.js
const asyncHandler = require("express-async-handler");
const Post = require("../model/postmodel.js");

// Fetch all posts
const Fetchpost = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});
const SinglePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(404).json({ message: "Id Manditory" });
  }
  try {
    const response = await Post.findById({ _id: postId });
    if (response) {
      res.status(200).json({
        message: `User Fetched in Id: ${postId}`,
        userId: response.userId,
        title: response.title,
        body: response.body,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// Add a new post
const AddnewPost = asyncHandler(async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const savedPost = await Post.create({ userId, title, body });
    res.status(201).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
});
//Updatepost
const UpdatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  const post = await Post.findById({ _id: postId });

  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }

  post.title = title;
  post.body = body;

  try {
    const updatedPost = await post.save();
    res.status(200).json({
      message: "Post Updated",
      title: updatedPost.title,
      body: updatedPost.body,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

const DeletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await Post.findByIdAndDelete({ _id: id });
    if (result) {
      res.status(200).json({ message: "Post Deleted" });
    } else {
      res.status(404).json({ message: "Id not Match" });
    }
  } else {
    res.status(404).json({ message: "Invalid Credentials" });
  }
});

module.exports = { Fetchpost, AddnewPost, UpdatePost, DeletePost, SinglePost };
