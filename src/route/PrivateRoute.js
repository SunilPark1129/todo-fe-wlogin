import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute는 다른 곳에서도 사용할 수 있는 코딩으로 만들어야 된다
const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
