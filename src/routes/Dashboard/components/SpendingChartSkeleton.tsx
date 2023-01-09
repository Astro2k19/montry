import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const SpendingChartSkeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={190}
    viewBox="0 0 375 190"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-5" y="0" rx="10" ry="10" width="375" height="190" />
  </ContentLoader>
);
