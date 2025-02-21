import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Review {
  id: number;
  cus_rev_id: number;
  shop_id: number;
  score: number;
  content: string;
  writeTime: string;
  owner_review?: string;
  reviewfile?: string;
  customer_nickname: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (shopId: number) => {
    const response = await axios.get(
      "http://localhost:8082/api-server/owner-review",
      {
        params: { shopId },
      }
    );
    return response.data.reviews;
  }
);

// ----
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch reviews";
      });
  },
});

export default reviewSlice.reducer;
