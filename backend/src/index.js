import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postsRouter from "./routers/postsRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/posts", postsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});