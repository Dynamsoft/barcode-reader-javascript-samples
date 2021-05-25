import DBR from "../dbr";
import React from 'react';
import './BarcodeScanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ScannerUI from './ScannerUI'
import DetailedResults from "./DetailedResults";
import StaticSettings from "./StaticSettings";
import SetUpUI from "./SetUpUI";

class BarcodeScanner extends React.Component {
    constructor(props) {
        super(props);
        this.bDestroyed = false;
        this.scanner = null;
        this.elRef = React.createRef();
        this.state = {
            bShowScanner: false,
            libLoaded: false,
            resultValue: "",
            // Runtime settings in different forms for display
            runtimeSettings: null,
            runtimeSettingsString: "",
            RTSUpdatedCount: 0,
            // Data to show
            imgData: null,
            messages: [],
            detailTitles: [],
            detailContent: [],
            // UI status
            bShowModalDialog: false,
            modalTitle: "Unspecified",
            modeArgumentString: "",
        };
    }
    async componentDidMount() {
        if (DBR.BarcodeReader._bUseFullFeature !== this.props.fullFeature)
            DBR.BarcodeReader._bUseFullFeature = this.props.fullFeature;
        //Load the library on page load to speed things up.
        try {
            this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();
            if (this.bDestroyed) {
                this.scanner.destroy();
                return;
            }
            this.setState({ libLoaded: true }, async _ => {
                this.showScanner();
            });
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    }
    componentWillUnmount() {
        this.bDestroyed = true;
        if (this.scanner) {
            this.scanner.destroy();
        }
    }
    updateRuntimeSettings = async _rts => {
        let scanner = this.scanner = this.scanner || await DBR.BarcodeReader.createInstance();
        try {
            await scanner.updateRuntimeSettings(_rts);
            this.showCurrentSettings();
        } catch (e) {
            this.showCurrentSettings();
        }
    }
    setUpRuntimeSettings = async () => {
        this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();
        let _runtimeSettings = await this.scanner.getRuntimeSettings();
        this.setState(
            { runtimeSettings: _runtimeSettings },
            () => this.setState({
                modalTitle: "Set Up",
                bShowModalDialog: true
            })
        );
        this.showCurrentSettings();
    }
    showCurrentSettings = async () => {
        let scanner = this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();
        let _runtimeSettings = await scanner.getRuntimeSettings();
        let runtimeSettings_str = "";
        if (this.props.fullFeature)
            runtimeSettings_str = await scanner.outputSettingsToString();
        this.setState({
            RTSUpdatedCount: this.state.RTSUpdatedCount + 1,
            runtimeSettings: _runtimeSettings,
            runtimeSettingsString: runtimeSettings_str
        });
    }
    showStaticRuntimeSettings = () => {
        this.setState({
            modalTitle: "Runtime Settings",
            bShowModalDialog: true
        }, () => {
            this.showCurrentSettings();
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
    setModeArgument = async _arg => {
        let scanner = this.scanner = this.scanner || await DBR.BarcodeReader.createInstance();
        try {
            await scanner.setModeArgument(_arg[0], parseInt(_arg[1]), _arg[2], _arg[3]);
        } catch (e) {
            console.log(e);
        }
    }
    getModeArgument = async _arg => {
        let scanner = this.scanner = this.scanner || await DBR.BarcodeReader.createInstance();
        try {
            return (await scanner.getModeArgument(_arg[0], parseInt(_arg[1]), _arg[2]));
        } catch (e) {
            return 'error';
            console.log(e);
        }
    }
    appendMessage = str => {
        this.setState(state => {
            state.resultValue = str;
            return state;
        });
    }
    render() {
        return (
            <div id="UIElement">
                {this.state.libLoaded && !this.state.bShowScanner ? <Button size="lg" variant="outline-primary" onClick={this.showScanner}>Start Barcode Scanner</Button> : ""}
                {this.state.bShowScanner ? <Button className="narrow" size="lg" variant="secondary" onClick={this.setUpRuntimeSettings}>Update Settings</Button> : ""}
                {this.state.bShowScanner ? <Button className="narrow" size="lg" variant="secondary" onClick={this.showStaticRuntimeSettings}>Show Settings</Button> : ""}
                {this.state.libLoaded ? <input type="text" value={this.state.resultValue} readOnly={true} className="latest-result" placeholder="The Last Read Barcode" /> : ""}
                {!this.state.libLoaded ? (<span style={{ fontSize: "x-large" }}>Loading Library...</span>) : ""}
                {this.state.bShowScanner ? (
                    <ScannerUI
                        scanner={this.scanner}
                        fullFeature={this.props.fullFeature}
                        runtimeSettings={this.state.runtimeSettings}
                        runtimeSettingsString={this.state.runtimeSettingsString}
                        RTSUpdatedCount={this.state.RTSUpdatedCount}
                        appendMessage={this.appendMessage}>
                    </ScannerUI>) : ""}
                {(() => {
                    if (this.state.bShowModalDialog)
                        return (<div>{this.renderSwitch(this.state.modalTitle)}</div>);
                })()}
            </div>
        );
    }
    toggleHideModal = bShow => {
        this.setState({ bShowModalDialog: bShow });
    }
    renderSwitch = (modalTile) => {
        switch (modalTile) {
            case 'Detailed Results':
                return (
                    <DetailedResults
                        modalTitle={this.state.modalTitle}
                        detailTitles={this.state.detailTitles}
                        detailContent={this.state.detailContent}
                        toggleHideModal={this.toggleHideModal}
                    ></DetailedResults>
                );
            case 'Runtime Settings':
                return (
                    <StaticSettings
                        fullFeature={this.props.fullFeature}
                        modalTitle={this.state.modalTitle}
                        runtimeSettings={this.state.runtimeSettings}
                        runtimeSettingsString={this.state.runtimeSettingsString}
                        RTSUpdatedCount={this.state.RTSUpdatedCount}
                        updateRuntimeSettings={this.updateRuntimeSettings}
                        toggleHideModal={this.toggleHideModal}
                    ></StaticSettings>
                );
            case 'Set Up':
                return (
                    <SetUpUI
                        RTSUpdatedCount={this.state.RTSUpdatedCount}
                        fullFeature={this.props.fullFeature}
                        modalTitle={this.state.modalTitle}
                        runtimeSettings={this.state.runtimeSettings}
                        updateRuntimeSettings={this.updateRuntimeSettings}
                        getModeArgument={this.getModeArgument}
                        setModeArgument={this.setModeArgument}
                        toggleHideModal={this.toggleHideModal}
                    ></SetUpUI>
                );
            default:
                return "";
        }
    }
}

export default BarcodeScanner;
