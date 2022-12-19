import React from "react";
import styles from "@styles/components/FileUploader.module.scss";
import { ReactComponent as AttachmentIcon } from "@assets/icons/attachment.svg";
import { AttachmentImage } from "@/components/form/AttachmentImage";

interface IImageFileUploader {
  onFileSelectSuccess: (file: File) => void;
  onFileSelectError: (message: string) => void;
  text: string;
}

export const ImageFileUploader: React.FC<IImageFileUploader> = ({
  onFileSelectSuccess,
  onFileSelectError,
  text,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isSelected, setIsSelected] = React.useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;

    if (!filesList?.length) {
      onFileSelectError("Please choose an logo image!");
      return;
    }
    const file = filesList[0];

    if (!file.type.startsWith("image/")) {
      onFileSelectError("You can choose only image!");
      return;
    }

    setImageUrl(URL.createObjectURL(file));
    setIsSelected(true);
    onFileSelectSuccess(file);
  };

  const removeFile = () => {
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.value = "";
      setIsSelected(false);
      setImageUrl("");
    }
  };

  return (
    <>
      <div
        className={styles.fileUploader}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <>
          <AttachmentIcon />
          <p className={styles.fileUploaderText}>{text}</p>
          <input
            type="file"
            name="file-uploader"
            onChange={handleFileUpload}
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
          />
        </>
      </div>
      {isSelected && <AttachmentImage url={imageUrl} removeFile={removeFile} />}
    </>
  );
};
