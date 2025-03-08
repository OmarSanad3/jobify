import { NavLink } from "react-router-dom";

import { useDashboardContext } from "../pages/DashboardLayout";
import navLinks from "../utils/links";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {navLinks.map(({ path, text, icon }) => {
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
