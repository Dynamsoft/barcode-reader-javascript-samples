import './HelloWorld.css';
import DBR from "../dbr";
import React from 'react';
import BarcodeScanner from './BarcodeScanner';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.refDivMessage = React.createRef();
        this.state = {
            libLoaded: false,
            resultValue: "",
            bShowScanner: false
        };
    }
    async componentDidMount() {
        try {
            await DBR.BarcodeScanner.loadWasm();
            this.setState(state => {
                state.libLoaded = true;
                return state;
            });
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    }
    appendMessage = str => {
        this.setState(state => {
            state.resultValue = str;
            return state;
        });
    }
    showScanner = () => {
        this.setState({
            bShowScanner: true
        });
    }
    render() {
        return (
            <div className="helloWorld">
                <h1>Dynamsoft Barcode Reader Hello World Sample for React</h1>
                <button onClick={this.showScanner}>Start Barcode Scanner</button>
                <input type="text" value={this.state.resultValue} readOnly={true} className="latest-result" placeholder="The Barcode Result" />
                <div id="UIElement">
                    {!this.state.libLoaded ? (<span style={{ fontSize: "x-large" }}>Loading Library...</span>) : ""}
                    {this.state.bShowScanner ? (<BarcodeScanner appendMessage={this.appendMessage}></BarcodeScanner>) : ""}
                </div>
            </div>
        );
    }
}
export default HelloWorld;
