import { Link } from "react-router-dom";
import React from "react";
import { INavItem } from "@/navigation/components/Navigation";

export const NavItem: React.FC<INavItem> = ({ icon, path, title }) => {
  return (
    <li>
      <Link to={path}>
        {icon}
        <div>{title}</div>
      </Link>
    </li>
  );
};
