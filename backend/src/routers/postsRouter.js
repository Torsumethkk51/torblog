import express from "express";

const postsRouter = express.Router();

postsRouter.get("/", (_, res) => {
  res.json({
    message: "Get all posts"
  });
});

postsRouter.get("/:id", (req, res) => {
  res.json({
    message: `Get blog id = ${req.params.id}`
  });
});

postsRouter.post("/", (req, res) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Created post successfully!",
    postData: {
      title: title,
      content: content
    }
  });
});

postsRouter.put("/:id", (req, res) => {
  const { title, content } = req.body;
  res.status(200).json({
    message: `Updated post id = ${req.params.id} successfully!`,
    updatedPostData: {
      title: title,
      content: content
    }
  });
});

postsRouter.delete("/:id", (req, res) => {
  res.status(200).json({
    message: `Deleted post id = ${req.params.id} successfully!`,
  });
});

export default postsRouter;