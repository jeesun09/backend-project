import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
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
  {
    timestamps: true,
  }
);

// This is a pre-save hook on the userSchema. It will run before the document is saved to the database.
userSchema.pre("save", async function (next) {
  // If the password field hasn't been modified, skip the rest of the function and call next() to continue the save operation.
  if (!this.isModified("password")) return next();

  // If the password field has been modified, hash the new password using bcrypt. The '10' is the saltRounds, which determines the complexity of the salt.
  this.password = await bcrypt.hash(this.password, 10);
  
  // Call next() to continue the save operation.
  next();
});

// This is a method on the userSchema that checks if a provided password matches the hashed password in the database.
userSchema.methods.isPasswordCorrect = async function (password) {
  // Use bcrypt's compare method to check if the provided password matches the hashed password.
  return await bcrypt.compare(password, this.password);
};

// This is a method on the userSchema that generates an access token for a user.
userSchema.methods.generateAccessToken = function () {
  // Use jsonwebtoken's sign method to create a new JWT. The payload includes the user's id, email, username, and full name.
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    // The secret key used to sign the token is stored in an environment variable for security.
    process.env.ACCESS_TOKEN_SECRET,
    {
      // The token will expire after the amount of time specified in the ACCESS_TOKEN_EXPIRY environment variable.
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// This is a method on the userSchema that generates a refresh token for a user.
userSchema.methods.generateRefreshToken = function () {
  // Use jsonwebtoken's sign method to create a new JWT. The payload only includes the user's id.
  return jwt.sign(
    {
      _id: this._id,
    },
    // The secret key used to sign the token is stored in an environment variable for security.
    process.env.REFRESH_TOKEN_SECRET,
    {
      // The token will expire after the amount of time specified in the REFRESH_TOKEN_EXPIRY environment variable.
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
