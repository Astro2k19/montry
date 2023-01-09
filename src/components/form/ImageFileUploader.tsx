import React from "react";
import styles from "@styles/components/FileUploader.module.scss";
import { ReactComponent as AttachmentIcon } from "@assets/icons/attachment.svg";
import { AttachmentImage } from "@/components/form/AttachmentImage";

interface IImageFileUploader {
  onFileSelectSuccess: (imageData: string) => void;
  onFileSelectError: (message: string) => void;
  text: string;
  statePreviewImage?: string;
}

export const ImageFileUploader: React.FC<IImageFileUploader> = ({
  onFileSelectSuccess,
  onFileSelectError,
  text,
  statePreviewImage,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (statePreviewImage && statePreviewImage !== "") {
      setImageUrl(statePreviewImage);
      setIsSelected(true);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    let imageData: string = "";

    if (!filesList?.length) {
      onFileSelectError("Please choose an logo image!");
      return;
    }
    const file = filesList[0];

    if (!file.type.startsWith("image")) {
      onFileSelectError("You can choose only image!");
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      imageData = reader.result as string;

      if (imageData) {
        setImageUrl(imageData);
        setIsSelected(true);
        onFileSelectSuccess(imageData);
      }
    });

    reader.readAsDataURL(file);
  };

  const removeFile = () => {
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
