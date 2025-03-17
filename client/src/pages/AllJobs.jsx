import { useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs/");
    return data;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    return err;
  }
};

const AllJobsContext = createContext({
  jobs: [],
});

const AllJobs = () => {
  const { jobs } = useLoaderData();
  console.log(jobs);

  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
