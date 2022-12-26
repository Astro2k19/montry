import React from "react";
import ContentLoader from "react-content-loader";

export const BalanceSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={135}
    height={74}
    viewBox="0 0 135 74"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="35" rx="0" ry="0" width="261" height="35" />
    <rect x="10" y="0" rx="0" ry="0" width="113" height="17" />
  </ContentLoader>
);
