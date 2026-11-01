// ============================================================
// Model: User
// Stores registered user accounts.
// Every other collection references this model via userId.
// Password is automatically hashed before saving using bcrypt.
// ============================================================

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ── Schema definition — defines the shape of a user document ──
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    // Email must be unique — used as login identifier
    // unique: true already creates an index, so no separate index() call needed
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Normalize to lowercase before saving
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },

    // Password stored as bcrypt hash — never plain text
    // select: false means password is excluded from queries by default
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    // Role controls what the user can access
    // creator = normal user, admin = full access
    role: {
      type: String,
      enum: ["creator", "admin"],
      default: "creator",
    },

    // Allows soft-disabling an account without deleting it
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// ── unique: true on email field already creates an index automatically ──
// No separate index needed — adding one would cause a duplicate index warning

// ── Pre-save hook — runs before every save operation ──
// Hashes the password only when it has been modified or is new
userSchema.pre("save", async function (next) {
  // Skip hashing if the password field was not changed
  if (!this.isModified("password")) return next();

  // Hash the password with a salt of 12 rounds
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Instance method — compares a plain text password with the stored hash ──
// Used during login to verify the entered password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ── Export the model ──
const User = mongoose.model("User", userSchema);
export default User;
