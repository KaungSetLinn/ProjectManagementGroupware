import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function ProtectedRoutes({children}) {
    const { isAuthorized, setIsAuthorized, auth } = useAuth();
    
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    if (isAuthorized == null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoutes;