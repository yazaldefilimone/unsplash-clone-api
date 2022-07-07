import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  label: String,
  url: String,
  userId: String,
});

export const imageModel = mongoose.model("Image", imageSchema);
