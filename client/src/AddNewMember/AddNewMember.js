import React, { useEffect } from 'react'
import CameraCapture from '../CameraCapture/CameraCapture'
import axios from 'axios';
import './AddNewMember.css'

const AddNewMember = () => {
    const [name, setName] = React.useState('')
    const [Message, setMessage] = React.useState('')
    const [relation, setRelation] = React.useState('')
    function handleSubmit(e) {
        e.preventDefault();
        if (name === '' && relation === '') { alert('Please enter name and relation!!') }
        else {
            if (relation === '') { alert('Please enter relation attribute.') }
            if (name === '') { alert('Please enter your name.') }
        }
        while (name !== '' && relation !== '') {
            const data = { data: name + '_' + relation };
            axios.post('http://127.0.0.1:5000/addnew', data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => {
                    console.log(`response = ${res.data}`)
                    setMessage(res.data)
                })
                .catch(error => {
                    console.log(`error = ${error}`)
                    setMessage("No face detected in the image.")
                })
            break;
        }

    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleRelation(e) {
        setRelation(e.target.value);
    }

    useEffect(() => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(Message))
    }, [Message])
    return (
        <div className="container">
            <form className="addForm">
                <h1 className="form-title">Add New Face</h1>
                <div className="inputs">
                    <div className="text-input">
                        <div className="name-div">
                            <label htmlFor="name" className="input-label name-lable">Name:     </label>
                            <input type="text" name="name" className="txtbox" onChange={handleName} required />
                        </div>
                        <div className="relation-div">
                            <label htmlFor="relation" className="input-label">Relation:</label>
                            <input type="text" name="relation" className="txtbox" onChange={handleRelation} required />
                        </div>
                    </div>
                    <div className="image-input">
                        <CameraCapture sts="add" />
                    </div>
                </div>
                <div className="buttons">
                    {Message == '' && <button onClick={handleSubmit} className="bttn">Submit</button>}
                    {Message != '' && <button onClick={(e) => {
                        this.container.reset();
                    }} className="bttn" name="resetBtn">Add Another Face</button>}
                </div>
            </form>
        </div >
    )
}
export default AddNewMember;
