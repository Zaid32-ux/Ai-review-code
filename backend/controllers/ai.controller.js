import axios from "axios";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Prompt } from "../Model/promptSchema.js";
import aiService from "../services/ai.service.js";

// ---------------- GENERATE REVIEW ----------------
export const getReview = catchAsyncErrors(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required!",
    });
  }

  const review = await aiService(code);

  const prompt = await Prompt.create({
    code,
    review,
  });

  res.status(201).json({
    success: true,
    message: "Review generated successfully!",
    prompt,
  });
});

// ---------------- GET ALL PROMPTS ----------------
export const getPastPrompts = catchAsyncErrors(async (req, res) => {
  const prompts = await Prompt.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    prompts,
  });
});

// ---------------- UPDATE REVIEW ----------------
export const updateReview = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID!",
    });
  }

  const aiResponse = await axios.post(
    "http://localhost:4000/ai/get-review",
    { code }
  );

  const newReview = aiResponse.data.review;

  const updatedPrompt = await Prompt.findByIdAndUpdate(
    id,
    {
      code,
      review: newReview,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPrompt) {
    return res.status(404).json({
      success: false,
      message: "Prompt not found!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Review updated successfully!",
    prompt: updatedPrompt,
  });
});

// ---------------- DELETE REVIEW ----------------
export const deleteReview = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const prompt = await Prompt.findById(id);

  if (!prompt) {
    return res.status(404).json({
      success: false,
      message: "Prompt not found!",
    });
  }

  await prompt.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});