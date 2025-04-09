import { isRejected } from "@reduxjs/toolkit";
import type { Middleware, SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CustomError extends SerializedError {
  code?: string;
  message?: string;
  data?: {
    message?: string;
    code?: string;
  };
}

/**
 * Middleware to handle all API errors in one place
 * Shows error toast notifications and logs to console
 */
export const rtkQueryErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const error = action.error as CustomError;

    // Handle Supabase specific errors
    if (error.data) {
      toast.error(
        `Error: ${error?.data.code || "400"} - ${error.data.message}` ||
          "An error occurred"
      );
    } else {
      toast.error(
        `Error: ${error.code || "400"} - ${error.message}` ||
          "An unexpected error occurred"
      );
    }
  }

  return next(action);
};
