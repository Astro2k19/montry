import { NavLink } from "react-router-dom";
import React from "react";
import { INavItem } from "@/navigation/components/Navigation";
import styles from "@/scss/components/Navigation.module.scss";

export const NavItem: React.FC<INavItem> = ({ icon, path, title }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        {icon}
        <div>{title}</div>
      </NavLink>
    </li>
  );
};
