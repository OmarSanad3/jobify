import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user/");
    return data;
  } catch (err) {
    console.log(err);
    return redirect("/login");
  }
};

const DashboardContext = createContext({
  user: {},
  showSidebar: false,
  isDarkTheme: false,
  toggleSidebar: () => {},
  toggleDarkTheme: () => {},
  logoutUser: () => {},
});

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const handleToggleDarkTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => {
      document.body.classList.toggle("dark-theme", !prevIsDarkTheme);
      localStorage.setItem("dark-theme", !prevIsDarkTheme);
      return !prevIsDarkTheme;
    });
  };

  const handleToggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  const handleLogoutUser = async () => {
    try {
      const { data } = await customFetch.post("/auth/logout");
      toast.success(data.message);
      return navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        showSidebar,
        toggleSidebar: handleToggleSidebar,
        toggleDarkTheme: handleToggleDarkTheme,
        logoutUser: handleLogoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

const Wrapper = styled.div`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
