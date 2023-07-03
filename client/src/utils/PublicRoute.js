import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import currentToken from "./getCurrentToken";

const PublicRoute = ({ children }) => {
  const token = currentToken;
  const navigate = useNavigate();

  if (token) {
    return navigate("/");
  }

  return children;
};

export default PublicRoute;
