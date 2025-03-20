import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import customFetch from "../utils/customFetch";
import { StatsItem } from "../components";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

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

  return (
    <Wrapper>
      <StatsItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Admin;
