import React from "react";
import styles from "@/scss/components/Avatar.module.scss";
import { useGetSpecificUserFieldQuery } from "@/redux/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { AvatarSkeleton } from "./AvatarSkeleton";

export const Avatar = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const {
    isLoading,
    data: src,
    isSuccess,
  } = useGetSpecificUserFieldQuery({
    fieldName: "imageUrl",
    uid: authUser?.uid,
  });

  return isLoading ? (
    <AvatarSkeleton />
  ) : (
    <div className={styles.avatar}>
      <img src={src} alt="user's avatar" />
    </div>
  );
};
