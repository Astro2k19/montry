import React from "react";
import { AiOutlineHome, GrTransaction, CgProfile } from "react-icons/all";
import { IconType } from "react-icons/lib";
import styles from "@styles/components/Navigation.module.scss";

interface INavList {
  title: string;
  icon: IconType;
  path: string;
}

const navList = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/home",
  },
  {
    title: "Transaction",
    icon: <GrTransaction />,
    path: "/transactions",
  },
  {
    title: "Profile",
    icon: <CgProfile />,
    path: "/profile",
  },
];

const Navigation = () => {
  const nav = navList.map((item) => {
    return (
      <li>
        <button>
          <div>{item.icon}</div>
          <div>{item.title}</div>
        </button>
      </li>
    );
  });

  return (
    <nav className={styles.nav}>
      <ul>{nav}</ul>
    </nav>
  );
};
export default Navigation;
