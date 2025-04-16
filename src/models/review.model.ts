import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  name: string;
  bookTitle: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    bookTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
