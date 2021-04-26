
import React from 'react';
import logo from './logo.svg';
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SimpleResults extends React.Component {
    constructor(props) {
        super(props);
        this.messageKeyBase = 400000;
    }
    render() {
        return (
            <div className="div-message" style={style.div_message}>
                <div className="main thinBorder">
                    {this.props.bDecoding ? (<Spinner animation="border" />) :
                        (<Button style={{ width: "80%" }} variant="primary" onClick={this.props.showDetails}>Show Details</Button>)
                    }
                    {
                        this.props.messages.map((message, index) =>
                            <p className='compact_P' key={this.messageKeyBase + index}>
                                {message}
                            </p>
                        )
                    }
                </div>
                <div className="main thinBorder">
                    <img src={this.props.imgData === null ? logo : this.props.imgData} className={this.props.imgData === null ? "left maxFullWidth logo" : "left maxFullWidth thinBorder"} alt="Place Holder" />
                </div>
            </div >
        );
    }
}
const style = {
    div_message: {
        resize: "both",
        width: "90vw",
        height: "60vw",
        margin: "0 auto"
    },
}
export default SimpleResults;
