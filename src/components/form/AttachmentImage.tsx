import React from "react";
import styles from "@styles/components/FileUploader.module.scss";
import { IoIosClose } from "react-icons/all";

interface IAttachmentImage {
  url: string;
  removeFile: (e: React.MouseEvent) => void;
}

export const AttachmentImage: React.FC<IAttachmentImage> = ({
  url,
  removeFile,
}) => {
  if (!url) null;

  return (
    <div className={styles.uploadedAttachment}>
      <img src={url} alt="uploaded image" />
      <div className={styles.removeAttachment} onClick={removeFile}>
        <IoIosClose />
      </div>
    </div>
  );
};
