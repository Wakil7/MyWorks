
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Lists from './pages/Lists.jsx';


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Lists />}/>
                </Route>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App
