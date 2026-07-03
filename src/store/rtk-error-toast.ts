import { notify } from "@/lib/toast";
import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";

type ActionPayload = {
  status?: number;
  data?: {
    error: string;
  };
};

/**
 *  Middleware to handle rejected actions and display error notifications.
 *
 * @returns
 */
export const rtkErrorToast: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message = (action.payload as ActionPayload)?.data?.error;

    notify.error(message || "An error occurred");
  }

  return next(action);
};
