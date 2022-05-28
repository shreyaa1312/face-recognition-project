import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Navbar = () => {

    return (
        <div className="mid">
            <ul className="navbar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/AddNewMember" onClick={SpeechRecognition.stopListening}>Add New Face</Link>
                </li>
                <li>
                    <Link to="/GuestUI" onClick={SpeechRecognition.stopListening}>Bell</Link>
                </li>
            </ul>
        </div>

    );
}
export default Navbar;