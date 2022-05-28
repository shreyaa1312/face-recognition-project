import React, { useState, useEffect } from 'react'
import Switch from '../Switch/Switch'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home() {

    SpeechRecognition.startListening({ continuous: true })
    const [value, setValue] = useState(window.homevalue)

    const processCommand = (command) => {
        if (command === 'I am going out') {
            setValue(false);
            window.homevalue = false
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Ok! Have a safe trip"))
        }
        if (command === 'I am home') {
            setValue(true);
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Welcome Back"))
            window.homevalue = true
        }
    }
    const commands = [
        {
            command: 'Alexa *',
            callback: (command) => processCommand(command)

        },
    ]

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        listening
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    console.log(transcript)

    return (
        <div>
            <div className="container">
                <Switch className="toggle-switch"
                    isOn={value}
                    handleToggle={() => {
                        setValue(!value)
                        window.homevalue = !value
                    }}
                />
            </div>
        </div >
    )
}

