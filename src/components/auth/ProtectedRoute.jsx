import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
    const { currentUser: user, loading } = useContext(UserContext);
    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
