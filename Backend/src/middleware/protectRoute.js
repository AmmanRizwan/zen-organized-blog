import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.blog_token;
    // token don't exist in the cookie
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, No Token" });
    }

    const dispatch = await jwt.verify(token, process.env.SECRET_TOKEN);

    // provided token not valid for user
    if (!dispatch) {
      return res.status(401).json({ error: "Not a valid token" });
    }

    const user = await prisma.users.findUnique({
      where: { id: dispatch.userId },
      select: {
        id: true,
        email: true,
      },
    });

    // user don't exist from the database
    if (!user) {
      res.status(401).json({ error: "Not Found the user!" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default protect;
