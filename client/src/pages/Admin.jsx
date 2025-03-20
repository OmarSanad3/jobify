import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");
    console.log(data);
    return data;
  } catch {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();
  console.log(jobs, users);

  return <div>
    <h1>Admin</h1>
    <h3>{jobs}</h3>
    <h3>{users }</h3>
  </div>;
};

export default Admin;
