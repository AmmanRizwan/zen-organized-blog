import prisma from "../lib/prisma.js";

const saveBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // debugging process
    // const saveMany = await prisma.save.findMany();
    // console.log(saveMany);

    const saveBlog = await prisma.save.findFirst({
      where: { postData: id, userId: userId },
    });

    // blog is not saved by the user add into the save
    if (saveBlog === null) {
      const insertBlog = await prisma.save.create({
        data: {
          postData: id,
          isSaved: true,
          userId: userId,
          postId: id,
        },
      });
      return res.status(201).json({ message: "Saved The Blog" });
    }

    // blog is saved by the user then removed
    if (saveBlog.postData === id) {
      const removeBlog = await prisma.save.delete({
        where: { id: saveBlog.id },
      });
      return res.status(200).json({ message: "UnSave The Blog" });
    }
  } catch (err) {
    res.status(500).json({ error: `Failed to Save:${err.message}` });
  }
};

const showAllSavedBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const findSaved = await prisma.save.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            users: { select: { username: true, name: true } },
            likes: true,
            save: { select: { userId: true } },
          },
        },
        user: { select: { username: true, name: true } },
      },
    });

    if (!findSaved) {
      return res.status(400).json({ error: "Failed to fetch the saved blog" });
    }
    return res.status(200).json(findSaved);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to Fetch the Saved Blog: ${err.message}` });
  }
};

export { saveBlog, showAllSavedBlog };
