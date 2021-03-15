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
        await DBR.BarcodeScanner.createInstance();
        this.setState(state => {
            state.libLoaded = true;
            return state;
        });
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
            <div class="helloWorld">
                <h1>Dynamsoft Barcode Reader Hello World Sample for React</h1>
                <button onClick={this.showScanner}>Start Barcode Scanner</button>
                <input type="text" value={this.state.resultValue} readonly="true" class="Input-text" placeholder="The Barcode Result" />
                <div id="scannerUI">
                    {!this.state.libLoaded ? (<span style={{fontSize:"x-large"}}>Loading Library...</span>) : ""};
                    <BarcodeScanner appendMessage={this.appendMessage}></BarcodeScanner>
                </div>
            </div>
        );
    }
}
export default HelloWorld;
