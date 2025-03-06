import React from "react";

import { Link } from "react-router-dom";

import { FormRow, Logo } from "../components";
import styled from "styled-components";

const Register = () => {
  return (
    <Wrapper>
      <form action="" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow
          type={"text"}
          name={"firstName"}
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

        <FormRow type="password" name="password" defaultValue="Serect!1" />

        <button type="submit" className="btn btn-block">
          Register
        </button>

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
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
