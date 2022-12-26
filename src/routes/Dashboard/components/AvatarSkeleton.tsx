import React from "react";
import ContentLoader from "react-content-loader";

export const AvatarSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={40}
    height={40}
    viewBox="0 0 40 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="20" cy="20" r="19" />
  </ContentLoader>
);
