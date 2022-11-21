import React from "react";
import { useRouteError } from "react-router";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return <div>{error.message}</div>;
};
