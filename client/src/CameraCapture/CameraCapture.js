import React, { useState, useEffect, useContext } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import CameraIcon from './camera-icon.png'
import BellIcon from './bell-icon.png'
import RetakeIcon from './retake-icon.png'
import './CameraCapture.css'

const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: "user"
};

export default function CameraCapture(props) {

    const webcamRef = React.useRef(null);
    const [image, setImage] = React.useState('')
    const [name, setName] = useState('')
    let message = " "
    let sts = "in"
    let color = ""
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            axios.post('http://127.0.0.1:5000/upload', {
                image: imageSrc,
                sts: props.sts,
                home: props.home
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => {
                    console.log(`response = ${res.data}`)
                    setName(res.data)
                    message = { name }
                })
                .catch(error => {
                    console.log(`error = ${error}`)
                    message = "not sent"
                })


        },
        [webcamRef]
    );
    const msg = new SpeechSynthesisUtterance()
    msg.text = name

    useEffect(() => {
        if (props.sts === 'find')
            window.speechSynthesis.speak(msg)
    }, [msg])

    return (
        <div className="webcam-container">
            <div> {props.sts === 'find' ?
                <div className="FindPerson" >
                    <Webcam
                        audio={false}
                        height={350}
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg"
                        width={350}
                        className="webcam"
                    />
                    <img src={BellIcon} className="image-holder" onClick={(e) => {
                        e.preventDefault();
                        capture();
                        setImage('')
                    }} />
                </div> :
                <div>
                    <div>
                        {image === '' ?
                            <div>
                                <Webcam
                                    audio={false}
                                    height={250}
                                    ref={webcamRef}
                                    videoConstraints={videoConstraints}
                                    screenshotFormat="image/jpeg"
                                    width={250}
                                    className="webcam"
                                />
                                <br></br>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    capture();
                                }}
                                    className="webcam-btn"><img src={CameraIcon} className="btn-image" /></button>
                            </div>
                            : <div>
                                <img src={image} alt="description" className="webcam-image"></img>
                                <br></br>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setImage('')
                                }}
                                    className="webcam-btn">
                                    <img src={RetakeIcon} className="btn-image" /></button>
                            </div>
                        }
                    </div>
                </div>
            }
            </div>
        </div >

    );
};
