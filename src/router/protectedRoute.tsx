import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    adminOnly?: boolean;
    sellerOnly?: boolean;
}

export default function ProtectedRoute({adminOnly = false, sellerOnly = false}: Props) {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && (!user || user.role !== "admin")) {
        return <Navigate to="/" replace />;
    }

    if (sellerOnly && (!user || user.role !== "seller")) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;

}