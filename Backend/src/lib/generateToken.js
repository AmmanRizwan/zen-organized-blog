import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_TOKEN, {
    expiresIn: "30d",
  });

  res.cookie("blog_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
