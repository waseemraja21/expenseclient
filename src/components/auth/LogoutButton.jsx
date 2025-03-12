import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";

const LogoutButton = () => {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default LogoutButton;
