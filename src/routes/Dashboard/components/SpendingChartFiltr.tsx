import React from "react";
import styles from "@/scss/components/SpendingChartFilter.module.scss";
import classNames from "classnames/bind";
const filter = ["Today", "Week", "Month", "Year"];

let cx = classNames.bind(styles);
export const SpendingChartFiltr = () => {
  const [isActive, setIsActive] = React.useState(0);

  return (
    <ul className={styles.filtration}>
      {filter.map((item, index) => {
        const classes = cx({
          item: true,
          active: index === isActive,
        });

        return <li className={classes}>{item}</li>;
      })}
    </ul>
  );
};
