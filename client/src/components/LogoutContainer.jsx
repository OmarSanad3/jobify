import { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

import { useDashboardContext } from "../pages/DashboardLayout";
import styled from "styled-components";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);

  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogout((prevShowLogout) => !prevShowLogout);
        }}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout || "show-dropdown"}`}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    border-radius: var(--border-radius);
    background-color: var(--primary-500);
    text-align: center;
    visibility: hidden;
  }

  .dropdown.show-dropdown {
    visibility: visible;
  }

  .dropdown .dropdown-btn {
    cursor: pointer;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background-color: transparent;
    border: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    width: 100%;
    height: 100%;
  }
`;

export default LogoutContainer;
