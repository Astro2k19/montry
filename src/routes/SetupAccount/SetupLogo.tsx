import React from "react";
import styles from "@styles/routes/SetupAccount.module.scss";
import { TopBar, TopBarTypes } from "@/navigation/components/TopBar";
import { SETUP_ACCOUNT_SCREEN } from "@/navigation/CONSTANTS";
import { ImageFileUploader } from "@/components/form/ImageFileUploader";

const SetupLogo = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const onSuccessSelect = (file: File) => {
    setSelectedFile(file);
  };

  const onErrorSelect = (message: string) => {
    alert(message);
  };

  return (
    <div className={styles.root}>
      <TopBar
        text={"Add logotype"}
        type={TopBarTypes.LIGHT}
        backPath={SETUP_ACCOUNT_SCREEN}
      />
      <div>
        <ImageFileUploader
          onFileSelectSuccess={onSuccessSelect}
          onFileSelectError={onErrorSelect}
          text={"Add profile logo"}
        />
      </div>
    </div>
  );
};
export default SetupLogo;
