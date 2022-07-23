import { googleLogout } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Logout({setUser}) {
    const nav = useNavigate();

    const handleLogout = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');
        nav("/");
    }

    return (
        <div>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}