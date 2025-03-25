// @desc getting all the post share in the explore and home page
// @route GET /api/p/blogs
import prisma from "../lib/prisma.js";

const getAllBlog = async (req, res) => {
  try {
    const all_post = await prisma.post.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        users: { select: { username: true, name: true } },
        likes: { select: { likeuser: true } },
        save: { select: { userId: true } },
      },
    });

    if (!all_post) {
      return res.status(400).json({ error: "Cannot Fetch the post!" });
    }

    return res.status(200).json(all_post);
  } catch (err) {
    res.status(500).json({ error: `Failed to Get All Blog: ${err.message}` });
  }
};

// @desc getting all the post which was created by the user and show in user profile
// @desc GET /api/p/user_blog/:username
const getAllUserBlog = async (req, res) => {
  try {
    const { username } = req.params;
    const user_post = await prisma.users.findUnique({
      where: { username: username },
      include: { post: true },
    });

    if (!user_post) {
      return res
        .status(400)
        .json({ error: "Cannot find the userpost right now!" });
    }

    return res.status(200).json({ post: user_post.post });
  } catch (err) {
    res.status(500).json({ error: `Failed to Get User Blog: ${err.message}` });
  }
};

// @desc insert new blog
// @route POST /api/p/blog
const createBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body } = req.body;

    // insert the data into the post model
    const post = await prisma.post.create({
      data: {
        userId,
        title,
        body,
      },
    });

    // post don't create
    if (!post) {
      return res
        .status(400)
        .json({ error: "Something went wrong! Cannot create a post" });
    }

    return res.status(201).json({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.title,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to Create Blog: ${err.message}` });
  }
};

// @desc get the single blog
// @route GET /api/p/blog/:id
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        users: { select: { username: true, name: true } },
        likes: { select: { likeuser: true } },
        save: { select: { userId: true } },
      },
    });

    if (!post) {
      return res.status(400).json({ error: "Cannot find the Blog" });
    }

    return res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Failed to Get Single Blog: ${err.message}` });
  }
};

// @desc update the exisiting blog
// @route PUT /api/p/blog/:id
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    // search the post into the database
    const post = await prisma.post.findUnique({ where: { id: id } });

    // post don't exist in the database
    if (!post) {
      return res.status(404).json({ error: "Cannot find the post" });
    }

    // update the post into the database
    const updatePost = await prisma.post.update({
      where: { id: id },
      data: {
        title: title || post.title,
        body: body || post.body,
      },
    });

    if (!updatePost) {
      return res.status(400).json({ error: "Cannot update the post!" });
    }

    return res.status(200).json({
      id: updatePost.id,
      userId: updatePost.userId,
      title: updatePost.title,
      body: updatePost.body,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to Update Blog: ${err.message}` });
  }
};

// @desc delete the exisiting blog
// @route DELETE /api/p/blog/:id
const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.delete({ where: { id: id } });

    if (!post) {
      return res
        .status(400)
        .json({ error: "Something went wrong! Cannot delete the post" });
    }

    return res.status(200).json({ message: "Delete Post Successfully!" });
  } catch (err) {
    res.status(500).json({ error: `Failed to Delete Blog: ${err.message}` });
  }
};

export {
  getAllBlog,
  getSingleBlog,
  editBlog,
  removeBlog,
  createBlog,
  getAllUserBlog,
};
