import React from 'react';
import VideoDecode from './VideoDecode';
import ImgDecode from './ImgDecode';
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultValue: "",
            bShowScanner: true,
            bShowImgDecode: false
        };
    }
    async componentDidMount() {
        try {
            //Load the library on page load to speed things up.
            await BarcodeScanner.loadWasm();
        } catch (ex) {
            let errMsg;
            if (ex.message.includes("network connection error")) {
                errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
            } else {
                errMsg = ex.message||ex;
            }
            console.error(errMsg);
            alert(errMsg);
        }
    }
    showScanner = () => {
        this.setState({
            bShowScanner: true,
            bShowImgDecode: false
        });
    }
    showImgDecode = () => {
        this.setState({
            bShowScanner: false,
            bShowImgDecode: true
        });
    }
    render() {
        return (
            <div className="helloWorld" style={{ height: "100%", width: "100%" }}>
                <div className="btn-group">
                    <button style={{ marginRight: '10px', backgroundColor: this.state.bShowScanner ? 'rgb(255,174,55)' : 'white' }} onClick={this.showScanner}>Video Decode</button>
                    <button style={{ backgroundColor: this.state.bShowImgDecode ? 'rgb(255,174,55)' : 'white' }} onClick={this.showImgDecode}>Image Decode</button>
                </div>
                {this.state.bShowScanner ? (<VideoDecode></VideoDecode>) : ""}
                {this.state.bShowImgDecode ? (<ImgDecode></ImgDecode>) : ""}
            </div>
        );
    }
}
export default HelloWorld;