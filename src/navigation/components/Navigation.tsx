import React from "react";
import { ReactComponent as HomeIcon } from "@assets/icons/Home.svg";
import { ReactComponent as TransactionIcon } from "@assets/icons/transaction.svg";
import { ReactComponent as UserIcon } from "@assets/icons/user.svg";
import styles from "@styles/components/Navigation.module.scss";
import { NavItem } from "@/navigation/components/NavItem";
import { AddAccounts } from "@/navigation/components/AddAccounts";

export interface INavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navList = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    title: "Transaction",
    icon: <TransactionIcon />,
    path: "/transactions",
  },
  {
    title: "Profile",
    icon: <UserIcon />,
    path: "/profile",
  },
  {
    title: "Profile",
    icon: <UserIcon />,
    path: "/profile",
  },
];

const Navigation = () => {
  const halfWayIndex = Math.ceil(navList.length / 2);
  const LeftNavPart = () => (
    <ul>
      {navList.slice(0, halfWayIndex).map((item) => (
        <NavItem {...item} />
      ))}
    </ul>
  );

  const RightNavPart = () => (
    <ul>
      {navList.slice(halfWayIndex).map((item) => (
        <NavItem {...item} />
      ))}
    </ul>
  );

  return (
    <nav className={styles.nav}>
      <LeftNavPart />
      <AddAccounts />
      <RightNavPart />
    </nav>
  );
};
export default Navigation;
