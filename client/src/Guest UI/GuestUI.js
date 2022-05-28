import React, { useContext } from 'react';
import CameraCapture from '../CameraCapture/CameraCapture';
import Clock from '../Clock/Clock'

export default function GuestUI() {
    return (
        <div className="container" style={{ display: 'flex' }}>
            <Clock />
            <CameraCapture sts="find" home={window.homevalue} />
        </div>
    )
}