import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  const { id } = params;
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job Deleted!");
  } catch (err) {
    toast.error(err.response.data.message);
  }
  return redirect("../all-jobs");
};
