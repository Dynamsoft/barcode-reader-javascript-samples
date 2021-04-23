import './SettingsSample.css';
import React from 'react';
import BarcodeReader from './BarcodeReader';
import BarcodeScanner from './BarcodeScanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, InputGroup, FormControl, Button } from 'react-bootstrap';

class SettingsSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleStarted: false,
            useAdvanced: false,
            instanceType: ""
        };
    }
    createAnInstance(type) {
        this.setState({
            sampleStarted: true
        }, () => {
            this.setState({ instanceType: type });
        });
    }
    handleCheckBoxChange = evt => {
        this.setState({ useAdvanced: evt.target.checked });
    }
    render() {
        return (
            <>
                {!this.state.sampleStarted ?
                    (<div className="settingsSample">
                        <h1><Badge variant="outline-primary">{this.props.title}</Badge></h1>
                        <InputGroup style={{ width: '40vw' }} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox defaultChecked={false} onChange={this.handleCheckBoxChange} aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <FormControl aria-label="Text input with checkbox" defaultValue="Use Advanced Features" readOnly />
                        </InputGroup>
                        <Button size="lg" block variant="outline-primary" onClick={() => { this.createAnInstance('reader') }}>Read Existing Files</Button>
                        <Button size="lg" block variant="outline-primary" onClick={() => { this.createAnInstance('scanner') }}>Read From Video Stream</Button>
                    </div>
                    ) :
                    (<div className="settingsSample">
                        {this.state.instanceType === "reader" ? <div className="tab-content">
                            <BarcodeReader
                                fullFeature={this.state.useAdvanced}
                            ></BarcodeReader>
                        </div> : ""}
                        {this.state.instanceType === "scanner" ? <div className="tab-content">
                            <BarcodeScanner
                                fullFeature={this.state.useAdvanced}
                            ></BarcodeScanner>
                        </div> : ""}
                    </div>
                    )}
            </>
        );
    }
}

export default SettingsSample;
