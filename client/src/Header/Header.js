import React from 'react'
import logo from './logo.svg';
import './Header.css'

export default function Header() {
    return (
        <div>
            <div className='header'>
                <img src={logo} className="App-logo" />
                <h1 className='App-title'>YOUR VIRTUAL EYE</h1>
            </div>
        </div>
    )
}

