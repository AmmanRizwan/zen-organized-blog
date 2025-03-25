import prisma from "../lib/prisma.js";
// @desc getting all the comment of the selected blog
// @route GET /api/b/blog/comment/:id
const getAllComment = async (req, res) => {
  try {
    const { id } = req.params;

    const all_comment = await prisma.comment.findMany({
      orderBy: { createdAt: "asc" },
      where: { postId: id },
      include: { users: { select: { username: true } } },
    });

    if (!all_comment) {
      return res.status(400).json({ error: "Cannot fetch the comments" });
    }

    return res.status(200).json(all_comment);
  } catch (err) {
    res.status(500).json({ error: `Get All Comment: ${err.message}` });
  }
};

// @desc get the single comment from the database
// @route GET /api/b/comment/:id
const singleComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({ where: { id: id } });

    if (!comment) {
      return res.status(400).json({ error: "cannot find the comment" });
    }
    return res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: `Get Comment: ${err.message}` });
  }
};

// @desc insert new comment into the database
// @route POST /api/b/comment/:id (id reference to the post id)
const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content: content,
        userId: userId,
        postId: id,
      },
    });

    if (!comment) {
      return res
        .status(400)
        .json({ error: "Cannot insert a comment into the post!" });
    }

    return res.status(201).json({
      id: comment.id,
      userId: comment.userId,
      postId: comment.postId,
      content: content,
    });
  } catch (err) {
    res.status(500).json({ error: `Create Comment: ${err.message}` });
  }
};

// @desc update the comment for the authenticated user
// @route PUT /api/b/comment/:id
const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await prisma.comment.findUnique({ where: { id: id } });

    if (!comment) {
      return res
        .status(404)
        .json({ error: "Cannot find the comment in the server" });
    }

    if (comment.userId !== req.user.id) {
      return res.status(404).json({ error: "You cannot update this comment!" });
    }

    const updateComment = await prisma.comment.update({
      where: { id: id },
      data: {
        content: content || comment.content,
      },
    });

    if (!updateComment) {
      return res.status(404).json({ error: "Failed to update the comment" });
    }

    return res.status(200).json({
      id: updateComment.id,
      userId: updateComment.userId,
      postId: updateComment.postId,
      content: updateComment.content,
    });
  } catch (err) {
    res.status(500).json({ error: `Update Comment: ${err.message}` });
  }
};

// @desc delete the comment for the authenticated user
// @route DELETE /api/b/comment/:id
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({ where: { id: id } });

    if (comment.userId !== req.user.id) {
      return res.status(404).json({ error: "You cannot delete this comment!" });
    }

    if (!comment) {
      return res.status(404).json({ error: "failed to delete the comment" });
    }

    const delete_comment = await prisma.comment.delete({ where: { id: id } });

    return res.status(200).json({ message: "Comment Delete Successfully!" });
  } catch (err) {
    res.status(500).json({ error: `Delete Comment: ${err.message}` });
  }
};

export {
  getAllComment,
  singleComment,
  createComment,
  editComment,
  deleteComment,
};
