import { NavLink } from "react-router-dom";

import { useDashboardContext } from "../pages/DashboardLayout";
import navLinks from "../utils/links";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {navLinks.map(({ path, text, icon }) => {
        if (user.role !== "admin" && text === "admin") return null;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
