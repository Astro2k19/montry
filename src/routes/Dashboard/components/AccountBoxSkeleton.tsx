import React from "react";
import ContentLoader from "react-content-loader";

export const AccountBoxSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={164}
    height={80}
    viewBox="0 0 164 80"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="130" y="133" rx="3" ry="3" width="118" height="4" />
    <rect x="0" y="0" rx="28" ry="28" width="164" height="80" />
  </ContentLoader>
);
