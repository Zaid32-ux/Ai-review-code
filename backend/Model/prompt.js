import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;