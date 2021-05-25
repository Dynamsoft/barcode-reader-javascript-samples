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
    toggleCheckBox = evt => {
        if (evt.target)
            this.setState({ useAdvanced: evt.target.checked });
        else {
            this.setState({ useAdvanced: !this.state.useAdvanced });
        }
    }
    render() {
        return (
            <>
                {!this.state.sampleStarted ?
                    (<div className="settingsSample">
                        <h3><Badge variant="outline-primary">{this.props.title}</Badge></h3>
                        <InputGroup style={{ width: '40vw', minWidth: '250px' }} className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox checked={this.state.useAdvanced} onChange={this.toggleCheckBox} aria-label="Checkbox for following text input" />
                            </InputGroup.Prepend>
                            <FormControl aria-label="Text input with checkbox" defaultValue="Use Advanced Features" onClick={() => { this.toggleCheckBox('toggle'); }} readOnly />
                        </InputGroup>
                        <Button className="normal" size="lg" block variant="outline-primary" onClick={() => { this.createAnInstance('reader') }}>Read File</Button>
                        <Button className="normal" size="lg" block variant="outline-primary" onClick={() => { this.createAnInstance('scanner') }}>Read Video</Button>
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
