import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingComponent/LandingPage";
import RegisterPage from "./components/RegisterComponent/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes id="root">
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/register" element={<RegisterPage/>}/>
                {/*<Route exact path="/registerModal" element={<RegisterModal/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
