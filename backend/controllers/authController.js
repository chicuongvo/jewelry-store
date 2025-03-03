import bcrypt from "bcryptjs";
import { signUpValidator } from "../validation/userValidation.js";
import { prisma } from "../config/db.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import passport from "passport";

export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.users.findMany();

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await prisma.users.findUnique({
      omit: {
        password: true,
      },
      where: { user_id },
    });

    if (user) {
      return res.status(200).json({ success: true, data: user });
    }

    return res.status(404).json({ success: false, message: "User not found" });
  } catch (error) {
    console.log("Error get user: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const signUp = async (req, res) => {
  const data = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    await signUpValidator.validateAsync(data);

    const [checkEmail, checkUsername, checkPhoneNumber] = await Promise.all([
      await prisma.users.findUnique({ where: { email: data.email } }),
      await prisma.users.findUnique({ where: { username: data.username } }),
      await prisma.users.findUnique({
        where: { phone_number: data.phone_number },
      }),
    ]);

    if (checkEmail) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    if (checkUsername) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    if (checkPhoneNumber) {
      return res
        .status(409)
        .json({ success: false, message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.users.create({
      data: {
        username: data.username,
        phone_number: data.phone_number,
        email: data.email,
        password: hashedPassword,
        role: data.role ? data.role : "USER",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Sign up sucesfully", data: newUser });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }
    console.log("Error signing up: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const signIn = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide identifier and password",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone_number: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(406)
        .json({ success: false, message: "Incorrect password" });
    }

    generateTokenAndSetCookie(user.user_id, user.role, res);

    return res.json({
      success: true,
      data: {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    console.log("Error sign in:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const signInGoogle = async (req, res, next, user) => {
  try {
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    generateTokenAndSetCookie(user.user_id, user.role, res);

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });

    return res
      .status(200)
      .json({ success: true, message: "Sign out successfully" });
  } catch (error) {
    console.log("Error sign out:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
