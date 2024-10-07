// PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  // Eğer token yoksa, giriş sayfasına yönlendir
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
