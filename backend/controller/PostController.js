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

// Fetch a single post
const SinglePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ message: "Id Mandatory" });
  }
  try {
    const response = await Post.findById(postId);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
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

// Update a post
const UpdatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { title, body } = req.body;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title;
    post.body = body;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
});

// Delete a post
const DeletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const result = await Post.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
});

module.exports = { Fetchpost, SinglePost, AddnewPost, UpdatePost, DeletePost };
