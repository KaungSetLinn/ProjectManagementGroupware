import { useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const { setIsAuthorized, user } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.clear();
        setIsAuthorized(false);
        navigate("/login");
    };

    useEffect(() => {
        console.log(user)
        console.log(localStorage.getItem(ACCESS_TOKEN))
        console.log(localStorage.getItem(REFRESH_TOKEN))
    }, []);

    return (
        <div className="px-12 py-10">
            <div className="text-3xl font-extrabold mb-8">
                Hello, 
                {/* {user.email} */}
            </div>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 
            focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
            dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
            onClick={handleLogout}
            >
                Logout
            </button>
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

export default Home;