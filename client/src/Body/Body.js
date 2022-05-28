import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CameraCapture from '../CameraCapture/CameraCapture'
import AddNewMember from '../AddNewMember/AddNewMember'
import GuestUI from '../Guest UI/GuestUI'
import NavBar from '../NavBar/NavBar'
import Home from '../Home/home';

export default function Body() {
    window.homevalue = true
    return (
        <div className='Nav-Items'>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/AddNewMember' element={<AddNewMember />} />
                    <Route path='/GuestUI' element={<GuestUI />} />
                </Routes>
            </Router >
        </div>
    )
}
