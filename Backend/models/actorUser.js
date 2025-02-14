import mongoose from 'mongoose';
const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    experience: {
      type: String,
      default: "Fresher",
    },
    profile_video: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 1500,
    },
    applied_jobs: [
      {
        job_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const Actor = mongoose.model("Actor", actorSchema);
export default Actor;
