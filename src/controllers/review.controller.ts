import { Request, Response } from "express";
import Review from "../models/review.model";

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, bookTitle, reviewText, rating } = req.body;

  if (
    !name ||
    !bookTitle ||
    !reviewText ||
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5
  ) {
    res
      .status(400)
      .json({ message: "Invalid input. Rating must be between 1 and 5." });
    return;
  }

  try {
    const newReview = await Review.create({
      name,
      bookTitle,
      reviewText,
      rating,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, bookTitle, reviewText, rating } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      res
        .status(400)
        .json({ message: "Invalid rating. Must be between 1 and 5." });
      return;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { name, bookTitle, reviewText, rating },
      { new: true }
    );

    if (!updatedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAverageRatings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Aggregation pipeline to calculate the average rating for each book
    const averageRatings = await Review.aggregate([
      {
        $group: {
          _id: "$bookTitle",  // Group by bookTitle
          averageRating: { $avg: "$rating" },  // Calculate the average rating for the group
          count: { $sum: 1 }  // Count the number of reviews for each book
        }
      },
      {
        $project: {
          bookTitle: "$_id",  // Rename the _id field to bookTitle for clarity
          averageRating: 1,
          count: 1,
          _id: 0  // Exclude the _id field from the result
        }
      }
    ]);

    if (averageRatings.length === 0) {
       res.status(404).json({ message: "No reviews found to calculate average ratings." });
       return ;
    }

    res.status(200).json(averageRatings);  // Return the average ratings per book
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};
