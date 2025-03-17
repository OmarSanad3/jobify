import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import styled from "styled-components";

import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue="Software Engineer II"
          />
          <FormRow type="text" name="company" defaultValue="Microsoft" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "add job"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post("/jobs/", data);
    if (res.status != 201) throw new Error("HI");
    toast.success("Added Job", { theme: "dark" });
    return redirect("all-jobs");
  } catch (err) {
    toast.error(err?.response?.data?.message, { theme: "dark" });
    return redirect("/dashboard");
  }
};

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background-color: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    min-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default AddJob;
