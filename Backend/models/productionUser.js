import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      maxlength: 1500,
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

const ProductionUser = mongoose.model("ProductionUser", productionSchema);
export default ProductionUser;
