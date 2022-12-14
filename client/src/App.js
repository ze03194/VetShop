import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingComponent/LandingPage";
import RegisterPage from "./components/RegisterComponent/RegisterPage";
import {AuthProvider} from "./context/AuthProvider";
import TestPage from "./components/TestPage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import AppointmentPage from "./components/AppointmentComponent/AppointmentPage";
import ProfilePage from "./components/ProfileComponent/ProfilePage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes id="root">
                    <Route element={<PersistLogin/>}>
                        <Route exact path="/" element={<LandingPage/>}/>
                        <Route exact path="/register" element={<RegisterPage/>}/>


                        <Route element={<RequireAuth/>}>
                            <Route exact path="/profile" element={<ProfilePage/>}/>
                            <Route exact path="/test" element={<TestPage/>}/>
                            <Route exact path="/appointment" element={<AppointmentPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
