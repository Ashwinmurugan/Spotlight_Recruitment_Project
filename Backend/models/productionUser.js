const mongoose = new require("mongoose");

const productionSchema = newSchema(
  {
    production_type: {
      type: String,
      enum: ["director", "production team", "other"],
      required: true,
    },
    production_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: false,
      match: /^[0-9]{10}$/,
    },
    license: {
      type: String,
      default: null,
    },
    socialLinks: {
      instagram: { type: String, default: null },
      facebook: { type: String, default: null },
      youtube: { type: String, default: null },
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const production = mongoose.model("production", productionSchema);
export default production;
