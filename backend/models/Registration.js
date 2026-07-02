import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
    },

    college: {
      type: String,
      trim: true,
    },

    course: {
      type: String,
      trim: true,
    },

    semester: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    photo: {
      type: String,
    },

    resume: {
      type: String,
    },

    agree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;