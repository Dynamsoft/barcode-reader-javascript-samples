
import React from 'react';
import logo from './logo.svg';
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SimpleResults extends React.Component {
    constructor(props) {
        super(props);
        this.refDivMessage = React.createRef();
        this.messageKeyBase = 400000;
    }
    render() {
        return (
            <div className="div-message" style={style.div_message} ref={this.refDivMessage}>
                <img src={this.props.imgData === null ? logo : this.props.imgData} className={this.props.imgData === null ? "left half logo" : "left maxHalf thinBorder"} alt="Place Holder" />
                <div className="left half thinBorder">
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
            </div >
        );
    }
}
const style = {
    div_message: {
        resize: "both",
        width: "98vw",
        margin: "0 auto"
    },
}
export default SimpleResults;
