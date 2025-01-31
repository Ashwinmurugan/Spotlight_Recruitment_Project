const mongoose = require("mongoose");

const jobApplicationSchema = newSchema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActorUser",
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
      },
    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Rejected", "Selected"],
      default: "Pending",
    },
    additionalNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
