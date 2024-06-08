const router = require("express").Router();
const {
  Fetchpost,
  AddnewPost,
  UpdatePost,
  SinglePost,
  DeletePost,
} = require("../controller/PostController.js");
router.get("/post", Fetchpost);
router.get("/post/:id", SinglePost);
router.post("/newpost", AddnewPost);
router.put("/updatepost/:id", UpdatePost);
router.delete("/deletepost/:id", DeletePost);
module.exports = router;
