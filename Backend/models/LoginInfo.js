const mongoose = require("mongoose");

const LoginInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["actor", "director"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "role",
    },
  },
  { timestamps: true }
);

const LoginInfo = mongoose.model("LoginInfo", LoginInfoSchema);
module.exports = LoginInfo;
