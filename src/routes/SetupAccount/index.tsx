import React from "react";
import { Button, ButtonType } from "@/components/ui/Button";
import { useNavigate } from "react-router";
import styles from "@styles/routes/Setup.module.scss";
import { SETUP_BALANCE_SCREEN } from "@/navigation/CONSTANTS";
import { ImageFileUploader } from "@/components/form/ImageFileUploader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPreviewAvatar } from "@/redux/slices/setupSlice";

const SetupAccountIndex = () => {
  const [selectedFileUrl, setSelectedFile] = React.useState<string | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { avatarPreview } = useAppSelector((state) => state.setup);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (avatarPreview.trim()) {
      setSelectedFile(avatarPreview);
    }
  }, []);

  const clickHandler = () => {
    if (selectedFileUrl) {
      dispatch(setPreviewAvatar(selectedFileUrl));
      navigate(SETUP_BALANCE_SCREEN);
    }
  };

  const onSuccessSelect = (imageUrl: string) => {
    setSelectedFile(imageUrl);
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
          statePreviewImage={avatarPreview}
          text={"Add profile photo"}
        />
      </div>
      <Button
        text={"Continue"}
        type={ButtonType.VIOLET}
        clickHandler={clickHandler}
      />
    </div>
  );
};
export default SetupAccountIndex;
