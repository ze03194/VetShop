import useAuth from "./useAuth";
import RefreshService from "../api/RefreshService";

const useRefreshToken = () => {
    const {auth} = useAuth();
    const {setAuth} = useAuth();

    const refresh = async () => {
        const email = window.sessionStorage.getItem("email")
        const password = window.sessionStorage.getItem("password")

        RefreshService()
            .then((response) => {
                const token = response.data.accessToken;
                setAuth({email, password, token})
                return response.data.accessToken;
            })
            .catch((response) => {
                console.log(response.status)
            })
    }
    return refresh;
}
export default useRefreshToken;