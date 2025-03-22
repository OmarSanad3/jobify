import { Form, Link, redirect } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    await customFetch.get("/users/current-user/");
    return redirect("/dashboard");
  } catch {
    return null;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow
          type={"text"}
          name={"name"}
          labelText={"first name"}
          defaultValue={"Omar"}
        />

        <FormRow
          type={"text"}
          name={"lastName"}
          labelText={"last name"}
          defaultValue={"Sanad"}
        />

        <FormRow type={"text"} name={"location"} defaultValue={"Port-Said"} />

        <FormRow type={"email"} name={"email"} defaultValue={"o@g.com"} />

        <FormRow type="password" name="password" defaultValue="Secret!1" />

        <SubmitBtn btnText="register" />

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data, {});
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
    return err;
  }
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Register;
