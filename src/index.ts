import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import reviewRoutes from "./routes/review.routes";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ->  http://localhost:${PORT}/api/v1/reviews`);
});
