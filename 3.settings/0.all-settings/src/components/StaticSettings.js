
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Card, Button } from 'react-bootstrap';

class StaticSettings extends React.Component {
    constructor(props) {
        super(props);
        this.messageKeyBase = 100000;
        this.state = {
            runtimeSettingsString: "",
            runtimeSettingsArray: [],
            showString: false,
        };
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.RTSUpdatedCount !== prevProps.RTSUpdatedCount) {
            this.showSettings();
        }
    }
    showSettings = () => {
        if (this.props.runtimeSettings === null) return;
        let settings = JSON.stringify(this.props.runtimeSettings, null, 5).split('     ');
        let layerCount = 0, _array = [];
        for (let i = 0; i < settings.length; i++) {
            if (settings[i].trim() === "")
                i++;
            if (settings[i].indexOf("[") > -1) {
                let arrayValue = settings[i];
                do {
                    i++;
                    arrayValue += settings[i]
                } while (settings[i].indexOf("]") < 0)
                _array.push(['_' + layerCount, arrayValue]);
            } else {
                if (settings[i].indexOf("}") === 0) {
                    _array.push(['_' + (layerCount - 1), settings[i]]);
                } else {
                    _array.push(['_' + layerCount, settings[i]]);
                }
            }
            if (settings[i].indexOf("{") > -1)
                layerCount++;
            if (settings[i].indexOf("}") > -1) {
                layerCount--;
                if (layerCount === 0 && settings[i].indexOf("}") === settings[i].length - 1) {
                    let lastRBrace = _array.pop();
                    lastRBrace = lastRBrace[1];
                    _array.push(['_' + (layerCount + 1), (lastRBrace.substr(0, lastRBrace.length - 1))]);
                    _array.push(['_' + layerCount, "}"]);
                }
            }
        }
        this.setState(prevState => ({
            runtimeSettingsArray: _array
        }));
    }
    usePredefinedSettings = async evt => {
        if (evt && evt.target && evt.target.getAttribute("modename")) {
            let modeName = evt.target.getAttribute("modename");
            this.props.updateRuntimeSettings(modeName);
        }
    }
    render() {
        return (
            //Why animation={false}: https://github.com/react-bootstrap/react-bootstrap/issues/5075
            <Modal show={true} onHide={() => { this.props.toggleHideModal(false) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"overFlowX"}>
                    <div style={{ textAlign: "center", padding: "1vw" }}>
                        <p>Use A Built-in Template</p>
                        <Button variant="secondary" style={{ width: "30%", marginRight: "2%" }} modename="speed" onClick={this.usePredefinedSettings}>Speed</Button>
                        <Button variant="secondary" style={{ width: "30%", marginRight: "2%" }} modename="balance" onClick={this.usePredefinedSettings}>Balance</Button>
                        <Button variant="secondary" style={{ width: "30%" }} modename="coverage" onClick={this.usePredefinedSettings}>Coverage</Button>
                    </div>
                    {this.props.fullFeature ?
                        (<><input style={{ verticalAlign: 'baseline', lineHeight: '30px' }} type="checkbox" onChange={this.toggleSettingsString} /> Show String</>)
                        : ""}
                    <Card className="paddingOneVW" style={this.state.showString ? style.hide : style.show}>
                        {this.state.runtimeSettingsArray.map((setting, index) =>
                            <p className={'compact_P runTimeSettings_P' + setting[0]} key={this.messageKeyBase + index} >
                                {setting[1]}
                            </p >
                        )}
                    </Card>
                    <Card className="paddingOneVW" style={this.state.showString ? style.show : style.hide}>
                        <pre>{this.props.runtimeSettingsString}</pre>
                    </Card>
                </Modal.Body>
            </Modal>
        );
    }
    toggleSettingsString = evt => {
        if (evt.target.checked) {
            this.setState({
                showString: true
            });
        } else {
            this.setState({
                showString: false
            });
        }
    }
}

const style = {
    hide: {
        display: "none"
    },
    show: {
        display: "block"
    }
}
export default StaticSettings;
