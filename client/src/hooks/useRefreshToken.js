import useAuth from "./useAuth";
import RefreshService from "../api/RefreshService";
import {useSelector} from "react-redux";
import {selectRefreshToken, selectUser} from "../features/user/userSlice";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const user = useSelector(selectUser)
    const refreshToken = useSelector(selectRefreshToken)

    const refresh = async () => {

        RefreshService(refreshToken)
            .then((response) => {
                const token = response.data.accessToken;
                setAuth({email: user.email, password: user.password, token})
                return response.data.accessToken;
            })
            .catch((response) => {
                console.log(response.status)
            })
    }
    return refresh;
}
export default useRefreshToken;