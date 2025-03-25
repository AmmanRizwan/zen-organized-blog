import bcrypt from "bcryptjs";
import generateToken from "../lib/generateToken.js";
import prisma from "../lib/prisma.js";

// @desc user login get in with existing user
// @route POST /api/auth/login
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find the user from the database
    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    // user don't exist in the database
    if (!user) {
      return res.status(404).json({ error: "Cannot find the User" });
    }

    // compare the entered password and the hash password
    const verify = await bcrypt.compare(password, user.password);

    if (verify) {
      // generate a token for the user for long time login
      generateToken(user.id, res);
      return res.status(200).json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }

    return res.status(400).json({ error: "Invalid password!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Login Error: Failed to Login the User, ${err}` });
  }
};

// @desc user signup create an new user
// @route POST /api/auth/signup
const Signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // find the user with the exisiting email
    const existingUser = await prisma.users.findUnique({
      where: { email: email },
    });

    // existing email is found
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exist" });
    }

    const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validEmail = regular.test(email);

    if (!validEmail) {
      return res.status(400).json({
        error: "Invalid Email",
      });
    }

    // user don't provide a password or password is not in a specific length
    if (!password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be greather than 6 character." });
    }

    // hash password for secure the user data
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create the data
    const user = await prisma.users.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashPassword,
      },
    });

    if (user) {
      // generate a token for the user for long time login
      generateToken(user.id, res);
      return res.status(201).json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }

    return res
      .status(400)
      .json({ message: "Something went Wrong! Cannot create a user" });
  } catch (err) {
    res.status(500).json({ error: `SignUp Error: Failed to SignUp User` });
  }
};

// @desc user logout
// @route POST /api/auth/logout
const Logout = async (req, res) => {
  try {
    // clear the token to remove the login signature.
    res.cookie("blog_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (err) {
    res.status(500).json({ error: `Logout Error: Failed to Logout User` });
  }
};

// @desc user profile show the detail of the user
// @route GET /api/auth/profile/:username
const Profile = async (req, res) => {
  try {
    // find user by his username
    const username = req.params.username;

    // traverse the data without password
    const user = await prisma.users.findUnique({
      where: { username: username },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // user don't exisit
    if (!user) {
      return res
        .status(400)
        .json({ error: "Cannot find the user from the database" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: `Profile Error: Failed to Fetch the Profile of the User`,
    });
  }
};

// @desc user update the existing detail of the user
// @route PUT/PATCH /api/auth/update
const UpdateProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const { name, username, email, bio } = req.body;

    // find the authenticated user
    const user = await prisma.users.findUnique({ where: { id: id } });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Cannot find the user from the database" });
    }

    // update the given detail and provide the previous detail if user don't update an field.
    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: {
        name: name || user.name,
        username: username || user.username,
        email: email || user.email,
        bio: bio || user.bio,
      },
    });

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "User Detail Update Successfully" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: `Update Profile: Failed to Update the User Profile` });
  }
};

// @desc user change password with the verify of the existing password
// @route POST /api/auth/change
const changePass = async (req, res) => {
  try {
    const id = req.user.id;
    const { exist_password, new_password } = req.body;

    // find the user to update the existing password
    const user = await prisma.users.findUnique({ where: { id: id } });

    if (!user) {
      return res.status(400).json({
        error: "Cannot find the user! Please provide the user id.",
      });
    }

    // compare the entered password to the exising password
    const verify = await bcrypt.compare(exist_password, user.password);

    // previous password not match with the user password
    if (!verify) {
      return res.status(400).json({
        error: "Current Password don't match with the existing password",
      });
    }

    // check the new password length is greather than 6 character.
    if (new_password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be greather than 6 character." });
    }

    const salt = await bcrypt.genSalt(10);

    // secure the new password by hashing
    const password = await bcrypt.hash(new_password, salt);

    // update the password
    const updatePassword = await prisma.users.update({
      where: { id: id },
      data: { password },
    });

    if (!updatePassword) {
      return res
        .status(400)
        .json({ error: "Cannot update the existing password" });
    }
    return res.status(200).json({ message: "Update Password Successfully" });
  } catch (err) {
    res.status(500).json({
      error: `Change Password: ${err.message}`,
    });
  }
};

// @desc user forgot password
// @route PATCH /api/auth/forgot
const forgotPass = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Cannot find the username. Invalid username" });
    }

    if (password.length < 6) {
      return res
        .status(200)
        .json({ error: "Password must be greather than 6 character." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updatePass = await prisma.users.update({
      where: { username: username },
      data: {
        password: hashPassword,
      },
    });

    if (!updatePass) {
      return res
        .status(200)
        .json({ message: "Sorry! We cannot Changed Password" });
    }

    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (err) {
    res.status(500).json({
      error: `Forgot Password: Failed to Forgot the Password for the User.`,
    });
  }
};

export {
  Login,
  Logout,
  Signup,
  Profile,
  UpdateProfile,
  changePass,
  forgotPass,
};
