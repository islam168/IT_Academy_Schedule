import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from './pages/Schedule';
import Register from "./pages/Registration";
import HomePage from "./pages/HomePage";
import PrivateRoute from './utils/PrivateRoute'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App">
        <Router>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/schedule" element={<PrivateRoute><Schedule/></PrivateRoute>} />
                    //<Route path="/schedule" element={<PrivateRoute><Schedule/></PrivateRoute>} />
                    <Route path="*" element={<div>Not found</div>} />
                    <Route path="/registration" element={<Register />} />
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
