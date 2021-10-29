import DBR from "../dbr";
import React from 'react';
import './BarcodeScanner.css';

class BarcodeScanner extends React.Component {
    constructor(props) {
        super(props);
        this.bDestroyed = false;
        this.pScanner = null;
        this.elRef = React.createRef();
    }
    async componentDidMount() {
        try {
            this.pScanner = this.pScanner || DBR.BarcodeScanner.createInstance()
            let scanner = await this.pScanner;

            if (this.bDestroyed) {
                scanner.destroy();
                return;
            }
            this.elRef.current.appendChild(scanner.getUIElement());
            document.getElementsByClassName("dce-btn-close")[0].style.display = "none";
            scanner.onFrameRead = results => {
                for (let result of results) {
                    this.props.appendMessage({ format: result.barcodeFormatString, text: result.barcodeText, type: "result" });

                    if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
                        this.props.appendMessage({ msg: result.exception.message, type: "error" });
                    }
                }
            };
            await scanner.open();
        } catch (ex) {
            this.props.appendMessage({ msg: ex.message, type: "error" });
            console.error(ex);
        }
    }
    async componentWillUnmount() {
        this.bDestroyed = true;
        if (this.pScanner) {
            (await this.pScanner).destroy();
        }
    }
    shouldComponentUpdate() {
        // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
        return false;
    }
    render() {
        return (
            <div ref={this.elRef} style={{ width: "100%", height: "100%" }}></div>
        );
    }
}

export default BarcodeScanner;
