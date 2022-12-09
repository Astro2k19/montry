import React from "react";
import { Button, ButtonType } from "@/components/ui/Button";
import { useNavigate } from "react-router";
import styles from "@styles/routes/Setup.module.scss";

const SetupAccountIndex = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.setupIndexPage}>
      <div className={styles.setupIndexContent}>
        <h3>Let’s setup your account!</h3>
        <p>Account can be your bank, credit card or your wallet.</p>
      </div>
      <Button
        text={"Let’s go"}
        type={ButtonType.VIOLET}
        clickHandler={() => navigate("/setup-balance")}
      />
    </div>
  );
};
export default SetupAccountIndex;
