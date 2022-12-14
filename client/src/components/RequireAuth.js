import {Outlet, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PromptLogin from "./LoginComponent/PromptLogin";

const RequireAuth = () => {
    const {auth} = useAuth();



    // return (
    //     auth?.email
    //         ? <Outlet/>
    //         : <LoginModal value={showModal}/>
    // );
    return (
        auth?.email
            ? <Outlet/>
            : <PromptLogin/>
    );
}

export default RequireAuth;