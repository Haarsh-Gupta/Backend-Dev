import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { emit } from "nodemon";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "User name must be unique"],
      lowercase: true,
      tirm: true,
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email name must be unique"],
      lowercase: true,
    },

    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      tirm: true,
      index: true,
    },

    avatar: {
      type: String, // cloudinary url
      required: [true, "Username is required"],
    },

    coverImage: {
      type: String, // cloudinary url
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// this pre hook use to do somthing before doing something like save

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

// .methods is use to inject custom methods or functions

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefrestToken = function () {};

export const User = mongoose.model("User", userSchema);
