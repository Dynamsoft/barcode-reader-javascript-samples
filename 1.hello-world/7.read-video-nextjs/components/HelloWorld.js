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
            alert(ex.message);
            throw ex;
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
                    <button style={{marginRight: '10px', backgroundColor: this.state.bShowScanner ? 'rgb(255,174,55)' : 'white'}} onClick={this.showScanner}>Video Decode</button>
                    <button style={{backgroundColor: this.state.bShowImgDecode ? 'rgb(255,174,55)' : 'white'}} onClick={this.showImgDecode}>Image Decode</button>
                </div>
                {this.state.bShowScanner ? (<VideoDecode></VideoDecode>) : ""}
                {this.state.bShowImgDecode ? (<ImgDecode></ImgDecode>) : ""}
            </div>
        );
    }
}
export default HelloWorld;