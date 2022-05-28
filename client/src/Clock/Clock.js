import React from 'react';
import './Clock.css'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
    }
    render() {
        return (
            <div className="clock">
                <p className="time">{this.state.time}</p>
                <p className="date">{this.state.date}</p>
            </div>
        );
    }
}

export default Clock;