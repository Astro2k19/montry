import React from "react";
import { Button, ButtonType } from "@/components/ui/Button";
import { useNavigate } from "react-router";
import styles from "@styles/routes/Setup.module.scss";
import {
  SETUP_BALANCE_SCREEN,
  SETUP_LOGO_SCREEN,
} from "@/navigation/CONSTANTS";
import { ImageFileUploader } from "@/components/form/ImageFileUploader";

const SetupAccountIndex = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const navigate = useNavigate();

  const onSuccessSelect = (file: File) => {
    setSelectedFile(file);
  };

  const onErrorSelect = (message: string) => {
    alert(message);
  };

  return (
    <div className={styles.setupIndexPage}>
      <div className={styles.setupIndexContent}>
        <h3>Let’s setup your account!</h3>
        <p>Account can be your bank, credit card or your wallet.</p>
        <p>Setup your profile photo.</p>
        <ImageFileUploader
          onFileSelectSuccess={onSuccessSelect}
          onFileSelectError={onErrorSelect}
          text={"Add profile logo"}
        />
      </div>
      <Button
        text={"Continue"}
        type={ButtonType.VIOLET}
        clickHandler={() =>
          navigate(SETUP_BALANCE_SCREEN, { state: selectedFile })
        }
      />
    </div>
  );
};
export default SetupAccountIndex;
