import { DataContext } from "@/context/DataContext";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userData }: any = useContext(DataContext);

  return userData ? children : <Navigate to="/login" />;
}
