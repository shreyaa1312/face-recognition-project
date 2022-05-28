import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
    return (
        <>
            {isOn && <h1 className="home">At home</h1>}
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
            {!isOn && <h1 className="away">Away</h1>}
        </>
    );
};

export default Switch;