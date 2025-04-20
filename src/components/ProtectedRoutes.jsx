import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
