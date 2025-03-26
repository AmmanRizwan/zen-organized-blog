// Module
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// User Defined Module (UDM)
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import saveRouter from "./routes/save.routes.js";

// Access Environment Variable
dotenv.config();
const port = process.env.PORT;

const app = express();
// Cross Site Resource Sharing
app.use(
  cors({
    origin: "https://zen-organized-blog-server.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/p", blogRouter);
app.use("/api/b", commentRouter);
app.use("/api/l", likeRouter);
app.use("/api/user", saveRouter);

// Starting Endpoint.
app.get("/", (req, res) => {
  res.json({ message: "Server is ready to work!" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
