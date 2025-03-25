import prisma from "../lib/prisma.js";
const likeUnlikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Debuging process
    // const manyLike = await prisma.likes.findMany({});

    // find the userId and postId to Identify that the user is liked or not.
    const likes = await prisma.likes.findFirst({
      where: { postId: id, userId: userId },
    });

    // the like query is null it mean that the user not liked the post
    if (likes === null) {
      const insertLike = await prisma.likes.create({
        data: {
          likeuser: userId,
          isLiked: true,
          postId: id,
          userId: userId,
        },
      });
      // Debugging process
      const findLike = await prisma.likes.findUnique({
        where: { id: insertLike.id },
      });
      if (findLike) {
        return res.status(200).json(findLike);
      }
    }
    // the liked user found then unliked it.
    if (likes.likeuser === userId) {
      const removeLike = await prisma.likes.delete({
        where: { id: likes.id },
      });
      return res.status(200).json({ message: "User Unlike the Blog" });
    }
  } catch (err) {
    res.status(500).json({ error: `Failed to Like Unlike: ${err.message}` });
  }
};

const showAllLikeBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const likedBlog = await prisma.likes.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            users: { select: { username: true, name: true } },
            likes: true,
            save: { select: { userId: true } },
          },
        },
        users: { select: { username: true, name: true } },
      },
    });

    if (!likedBlog) {
      return res.status(400).json({ error: "Failed to Fetch the Liked Blog" });
    }

    res.status(200).json(likedBlog);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to Show Liked Blog: ${err.message}` });
  }
};

const findLikedUser = async (req, res) => {
  try {
    const id = req.user.id;

    const findLiked = await prisma.likes.findFirst({
      where: { userId: id },
    });

    if (!findLiked) {
      return res.status(400).json({ error: `Cannot find the liked user` });
    }

    res.status(200).json(findLiked);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to Find Liked User, ${err.message}` });
  }
};

export { likeUnlikeBlog, showAllLikeBlog, findLikedUser };
