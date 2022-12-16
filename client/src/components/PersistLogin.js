import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {auth} = useAuth();
    const refresh = useRefreshToken();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    }, [])


    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet/>}
        </>
    )

}

export default PersistLogin;