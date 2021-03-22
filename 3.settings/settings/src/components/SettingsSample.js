import './SettingsSample.css';
import React from 'react';
import BarcodeReader from './BarcodeReader';
import BarcodeScanner from './BarcodeScanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Tabs, Tab, Button } from 'react-bootstrap';

class SettingsSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bShowScanner: false,
            sampleStarted: false,
            resultValue: ""
        };
    }
    render() {
        return (
            <>
                {!this.state.sampleStarted ?
                    (<div className="settingsSample">
                        <h1><Badge variant="outline-primary">{this.props.title}</Badge></h1>
                        <Button size="lg" block variant="outline-primary" onClick={() => { this.startSample(false) }}>Use Standard Features</Button>
                        <Button size="lg" block variant="outline-secondary" onClick={() => { this.startSample(true) }}>Use Advanced Features</Button>
                    </div>
                    ) :
                    (<div className="settingsSample">
                        <h1><Badge variant="outline-primary">{this.props.title}</Badge></h1>
                        <Tabs defaultActiveKey="reader">
                            <Tab eventKey="reader" title="Read Existing Files">
                                <div className="tab-content">
                                    <BarcodeReader
                                        fullFeature={this.state.useAdvanced}
                                    ></BarcodeReader>
                                </div>
                            </Tab>
                            <Tab eventKey="scanner" title="Read From Video Stream">
                                <div className="tab-content">
                                    <Button size="lg" variant="outline-primary" onClick={this.showScanner}>Start Barcode Scanner</Button>
                                    <input type="text" value={this.state.resultValue} readOnly={true} className="Input-text" placeholder="The Barcode Result" />
                                    <div id="scannerUI">
                                        {this.state.bShowScanner ? (<BarcodeScanner fullFeature={this.state.useAdvanced} showMessage={this.showMessage}></BarcodeScanner>) : ""}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    )}
            </>
        );
    }
    startSample(useAdvanedFeatures) {
        this.setState({
            useAdvanced: useAdvanedFeatures
        }, () => {
            this.setState({
                sampleStarted: true
            });
        });
    }
    showScanner = () => {
        this.setState({
            bShowScanner: true
        });
    }
    hideScanner = () => {
        this.setState({
            bShowScanner: false
        });
    }
    showMessage = str => {
        this.setState(state => {
            state.resultValue = str;
            return state;
        });
    }
}

export default SettingsSample;
