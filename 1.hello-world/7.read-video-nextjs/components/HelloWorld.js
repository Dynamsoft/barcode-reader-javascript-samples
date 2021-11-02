import React from 'react';
import BarcodeScanner from './BarcodeScanner';
import DBR from "../dbr";

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            libLoaded: false,
            resultValue: "",
            bShowScanner: false
        };
    }
    async componentDidMount() {
        try {
            //Load the library on page load to speed things up.
            await DBR.BarcodeScanner.loadWasm();
            this.setState(state => {
                state.libLoaded = true;
                return state;
            }, () => {
                this.showScanner();
            });
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    }
    showScanner = () => {
        this.setState({
            bShowScanner: true
        });
    }
    appendMessage = (message) => {
        switch (message.type) {
            case "result":
                this.setState(prevState => {
                    prevState.resultValue = message.format + ": " + message.text;
                    return prevState;
                });
                break;
            case "error":
                this.setState(prevState => {
                    prevState.resultValue = message.msg;
                    return prevState;
                });
                break;
            default: break;
        }
    }
    render() {
        return (
            <div className="helloWorld" style={{ height: "100%", width: "100%" }}>
                {!this.state.libLoaded ? (<span style={{ fontSize: "x-large" }}>Loading Library...</span>) : ""}
                {this.state.bShowScanner ? (<BarcodeScanner appendMessage={this.appendMessage}></BarcodeScanner>) : ""}
                {this.state.bShowScanner ? (<input type="text" style={{width: "80vw",border: "none",fontSize: "1rem",textAlign: "center"}} value={this.state.resultValue} readOnly={true} id="resultText" />) : ""}
            </div>
        );
    }
}
export default HelloWorld;