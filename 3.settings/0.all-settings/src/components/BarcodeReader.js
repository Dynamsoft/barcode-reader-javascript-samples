
import DBR from "../dbr";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import DetailedResults from "./DetailedResults";
import SimpleResults from "./SimpleResults";
import StaticSettings from "./StaticSettings";
import SetUpUI from "./SetUpUI";

class BarcodeReader extends React.Component {
    constructor(props) {
        super(props);
        this.reader = null;
        this.state = {
            // Status of lib
            libLoaded: false,
            bDecoding: false,
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
            await DBR.BarcodeReader.loadWasm();
            this.setState({ libLoaded: true });
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    }
    componentWillUnmount() {
        if (this.reader) {
            this.reader.destroy();
        }
    }
    render() {
        return (
            <>
                {!this.state.libLoaded ?
                    (<span style={{ fontSize: "x-large" }}>Loading Library...</span>)
                    :
                    (<>
                        <Button className="narrow" size="lg" variant="secondary" onClick={this.setUpRuntimeSettings}>Update Settings</Button>
                        <Button className="narrow" size="lg" variant="secondary" onClick={this.showStaticRuntimeSettings}>Show Settings</Button>
                        <input onChange={this.onFileSelected} type="file" multiple accept="image/png,image/jpeg,image/bmp,image/gif" />
                        {this.state.bDecoding || this.state.messages.length > 0 ?
                            <SimpleResults
                                bDecoding={this.state.bDecoding}
                                imgData={this.state.imgData}
                                messages={this.state.messages}
                                showDetails={this.showDetails}
                            ></SimpleResults> : ""}
                    </>)
                }
                {(() => {
                    if (this.state.bShowModalDialog)
                        return (<div>{this.renderSwitch(this.state.modalTitle)}</div>);
                })()}
            </>
        );
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
    onFileSelected = event => {
        // React can't get event.target in async func by default.
        // Thus get event.target in sync part.
        this.setImageData(null);
        let input = event.target;
        (async () => {
            try {
                this.emptyMessages();
                this.appendAMessage("======== start read... ========");
                let startTime = (new Date()).getTime();
                let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
                reader.bSaveOriCanvas = true;
                let files = input.files;
                for (let file of files) {
                    this.appendAMessage(file.name + ':')
                    this.setDecodeState(true);
                    let results = await reader.decode(file);
                    let endTime = (new Date()).getTime();
                    let timeElapsed = endTime - startTime;
                    if (results.length === 0) {
                        this.appendAMessage("No barcode found in " + timeElapsed.toString() + " milliseconds");//, "Caution!");
                    }
                    else {
                        this.appendAMessage("Reading done in " + timeElapsed.toString() + " milliseconds");
                        for (let i = 0; i < results.length; i++) {
                            let result = results[i];
                            this.appendAMessage("Result " + (i + 1).toString() + ": " + result.barcodeText);
                            this.appendDetails("==================================");
                            this.appendDetails("-------------------------------------------------------");
                            this.appendDetails("Number " + (i + 1).toString() + " on file: " + file.name);
                            this.appendDetails("-------------------------------------------------------");
                            this.appendDetails("BarcodeFormat: " + result.barcodeFormatString);
                            this.appendDetails("BarcodeFormat_2: " + result.barcodeFormatString_2);
                            this.appendDetails("BarcodeText: " + result.barcodeText);
                            if (result.barcodeBytes !== null && result.barcodeBytes.length !== 0)
                                this.appendDetails("Barcode Bytes (base64): " + btoa(result.barcodeBytes));
                            this.appendDetails("******************** Localization *********************");
                            let tempLocalizationResult = result.localizationResult;
                            this.appendDetails("Terminated Phase: " + tempLocalizationResult.terminatePhase);
                            this.appendDetails("Format in Localization: " + tempLocalizationResult.barcodeFormatString);
                            this.appendDetails("Format in Localization2: " + tempLocalizationResult.barcodeFormatString_2);
                            this.appendDetails("Angle: " + tempLocalizationResult.angle.toString());
                            this.appendDetails("Module Size: " + tempLocalizationResult.moduleSize.toString());
                            this.appendDetails("Confidence: " + tempLocalizationResult.confidence.toString());

                            this.appendDetails("Document: " + tempLocalizationResult.documentName);
                            this.appendDetails("Page: " + tempLocalizationResult.pageNumber.toString());
                            if (tempLocalizationResult.regionName !== "")
                                this.appendDetails("Region: " + tempLocalizationResult.regionName.toString());
                            let _type = tempLocalizationResult.resultCoordinateType === 1 ? "<px>" : "<%>";
                            this.appendDetails("Location " + _type + ": ");
                            this.appendDetails(" (" + tempLocalizationResult.x1 + ", " + tempLocalizationResult.y1 + ")"
                                + " (" + tempLocalizationResult.x2 + ", " + tempLocalizationResult.y2 + ")"
                                + " (" + tempLocalizationResult.x3 + ", " + tempLocalizationResult.y3 + ")"
                                + " (" + tempLocalizationResult.x4 + ", " + tempLocalizationResult.y4 + ")"
                                , true);
                            this.appendDetails("******************** Extended Info *********************");
                            let extendedResults = result.results;
                            for (let k = 0; k < extendedResults.length; k++) {
                                this.appendDetails("Extended Result Number: [" + k.toString() + "]");
                                if (extendedResults[k].bytes !== null && extendedResults[k].bytes.length !== 0)
                                    this.appendDetails("Bytes (base64): " + btoa(extendedResults[k].bytes));
                                this.appendDetails("Clarity: " + extendedResults[k].clarity.toString());
                                this.appendDetails("Confidence: " + extendedResults[k].confidence.toString());
                                this.appendDetails("Deformation: " + extendedResults[k].deformation.toString());
                                this.appendDetails("Result Type: " + extendedResults[k].resultType.toString());

                                if (extendedResults[k].detailedResult)
                                    this.appendDetails("Detailed Result Exists!", true);

                                this.appendDetails("******************** Detailed Info *********************");
                                switch (result.barcodeFormatString) {
                                    case "GS1_COMPOSITE": break;
                                    /*
                                     * One D
                                     */
                                    case "CODE_39":
                                    case "CODE_128":
                                    case "CODE_93":
                                    case "CODABAR":
                                    case "ITF":
                                    case "EAN_13":
                                    case "EAN_8":
                                    case "UPC_A":
                                    case "UPC_E":
                                    case "INDUSTRIAL_25":
                                    case "CODE_39_EXTENDED":
                                        let oneDCodeDetails = result.detailedResult;
                                        this.appendDetails("Module Size: " + oneDCodeDetails.moduleSize);
                                        if (oneDCodeDetails.checkDigitBytes !== null && oneDCodeDetails.checkDigitBytes.length !== 0)
                                            this.appendDetails("Check Digit Bytes: " + oneDCodeDetails.checkDigitBytes.toString());
                                        if (oneDCodeDetails.startCharsBytes !== null && oneDCodeDetails.startCharsBytes.length !== 0)
                                            this.appendDetails("Start Chars Bytes: " + oneDCodeDetails.startCharsBytes.toString());
                                        if (oneDCodeDetails.stopCharsBytes !== null && oneDCodeDetails.stopCharsBytes.length !== 0)
                                            this.appendDetails("Stop Chars Bytes: " + oneDCodeDetails.stopCharsBytes.toString());
                                        break;
                                    /*
                                     * DataBar
                                     */
                                    case "GS1_DATABAR_OMNIDIRECTIONAL":
                                    case "GS1_DATABAR_TRUNCATED":
                                    case "GS1_DATABAR_STACKED":
                                    case "GS1_DATABAR_STACKED_OMNIDIRECTIONAL":
                                    case "GS1_DATABAR_EXPANDED":
                                    case "GS1_DATABAR_EXPANDED_STACKED":
                                    case "GS1_DATABAR_LIMITED":
                                        break;
                                    case "PATCHCODE":
                                        break;
                                    case "MICRO_PDF417":
                                        /*
                                         * Postal Code
                                         */
                                        break;
                                    case "USPSINTELLIGENTMAIL":
                                    case "POSTNET":
                                    case "PLANET":
                                    case "AUSTRALIANPOST":
                                    case "UKROYALMAIL":
                                        break;
                                    /*
                                     * PDF417
                                     */
                                    case "PDF417":
                                        let pDF417Details = result.detailedResult;
                                        this.appendDetails("Module Size: " + pDF417Details.moduleSize);
                                        this.appendDetails("Columns: " + pDF417Details.Columns);
                                        this.appendDetails("Rows: " + pDF417Details.rows);
                                        this.appendDetails("Error Correction Level: " + pDF417Details.errorCorrectionLevel);
                                        break;
                                    case "QR_CODE":
                                        let qRCodeDetails = result.detailedResult;
                                        this.appendDetails("Version: " + qRCodeDetails.Version);
                                        this.appendDetails("Model: " + qRCodeDetails.Model);
                                        this.appendDetails("moduleSize: " + qRCodeDetails.moduleSize);
                                        this.appendDetails("Rows: " + qRCodeDetails.rows);
                                        this.appendDetails("Error Correction Level: " + qRCodeDetails.errorCorrectionLevel);
                                        break;
                                    case "DATAMATRIX":
                                        let dataMatrixDetails = result.detailedResult;
                                        this.appendDetails("Module Size: " + dataMatrixDetails.moduleSize);
                                        this.appendDetails("Columns: " + dataMatrixDetails.columns);
                                        this.appendDetails("Rows: " + dataMatrixDetails.rows);
                                        this.appendDetails("Data Region Number: " + dataMatrixDetails.dataRegionNumber);
                                        this.appendDetails("Data Region Columns: " + dataMatrixDetails.dataRegionColumns);
                                        this.appendDetails("Data Region Rows: " + dataMatrixDetails.dataRegionRows);
                                        break;
                                    case "AZTEC":
                                        let aztecDetails = result.detailedResult;
                                        this.appendDetails("Module Size: " + aztecDetails.moduleSize);
                                        this.appendDetails("Columns: " + aztecDetails.columns);
                                        this.appendDetails("Rows: " + aztecDetails.rows);
                                        this.appendDetails("Layer Number: " + aztecDetails.layerNumber);
                                        break;
                                    case "MAXICODE":
                                    case "MICRO_QR":
                                        break;
                                    default: break;
                                }
                            }
                        }
                    }
                }
                input.value = "";
                this.setImageData(reader.oriCanvas.toDataURL('image/png'));
                this.setDecodeState(false);
                this.appendAMessage("======== finish read ========");
            } catch (ex) {
                this.appendAMessage(ex.message);
                console.error(ex);
            }
        })();
    }
    setDecodeState = bStart => {
        this.setState({ bDecoding: bStart })
    }
    setImageData = data => {
        this.setState({ imgData: data });
    }
    getModeArgument = async paras => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        try {
            if (paras && paras.length > 2) {
                let _value = await reader.getModeArgument(paras[0], parseInt(paras[1]), paras[2]);
                alert(JSON.stringify({
                    modeName: paras[0],
                    key: paras[1],
                    argumentName: paras[2],
                    value: _value
                }));
            }
        } catch (e) {
            console.log(e);
        }
    }
    setModeArgument = async paras => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        try {
            if (paras && paras.length > 2) {
                await reader.setModeArgument(paras[0], parseInt(paras[1]), paras[2], paras[3]);
            }
        } catch (e) {
            console.log(e);
        }
    }
    updateRuntimeSettings = async _rts => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        try {
            await reader.updateRuntimeSettings(_rts);
            this.showCurrentSettings();
        } catch (e) {
            this.showCurrentSettings();
        }
    }
    toggleHideModal = bShow => {
        this.setState({ bShowModalDialog: bShow });
    }
    setUpRuntimeSettings = async () => {
        this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        let _runtimeSettings = await this.reader.getRuntimeSettings();
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
        if (this.state.bShowModalDialog) {
            let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
            let _runtimeSettings = await reader.getRuntimeSettings();
            let runtimeSettings_str = "";
            if (this.props.fullFeature)
                runtimeSettings_str = await reader.outputSettingsToString();
            this.setState({
                RTSUpdatedCount: this.state.RTSUpdatedCount + 1,
                runtimeSettings: _runtimeSettings,
                runtimeSettingsString: runtimeSettings_str
            });
        }
    }
    showStaticRuntimeSettings = () => {
        this.setState({
            modalTitle: "Runtime Settings",
            bShowModalDialog: true
        }, () => {
            this.showCurrentSettings();
        });
    }
    appendAMessage = str => {
        this.setState(prevState => ({
            messages: [...prevState.messages, str]
        }));
    }
    emptyMessages = () => {
        this.setState(prevState => ({
            messages: [],
            detailContent: [],
            detailTitles: []
        }));
    }
    appendDetails = (str, bImportant) => {
        if (str.indexOf(":") !== -1) {
            let _values = str.split(":");
            this.setState(prevState => ({
                detailTitles: [...prevState.detailTitles, _values[0] + " : "],
                detailContent: [...prevState.detailContent, _values[1]]
            }));
        }
        else if (bImportant) {
            this.setState(prevState => ({
                detailTitles: [...prevState.detailTitles, ""],
                detailContent: [...prevState.detailContent, str]
            }));
        } else {
            this.setState(prevState => ({
                detailTitles: [...prevState.detailTitles, str],
                detailContent: [...prevState.detailContent, ""]
            }));
        }
    }
    showDetails = () => {
        this.setState(state => {
            state.bShowModalDialog = true;
            state.modalTitle = "Detailed Results";
            return state;
        });
    }
}

export default BarcodeReader;
