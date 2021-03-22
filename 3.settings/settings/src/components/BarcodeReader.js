
import DBR from "../dbr";
import logo from './logo.svg';
import React from 'react';
import './BarcodeReader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Spinner, Card } from 'react-bootstrap';

class BarcodeReader extends React.Component {
    constructor(props) {
        super(props);
        this.refDivMessage = React.createRef();
        this.reader = null;
        this.state = {
            libLoaded: false,
            runtimeSettingsString: "",
            runtimeSettings: [],
            showString: false,
            bInitializing: true,
            bDecoding: true,
            bShowModalDialog: false,
            imgData: null,
            messageKeyBase: 0,
            messages: [],
            detailTitles: [],
            detailContent: [],
            modalTitle: "Unspecified",
            setUpState: {
                showOneDItems: false,
                showDataBarItems: false,
                showPostalCodeItems: false,
                showFurtherModesItems: false
            },
            //Mode Mode Arguments Status
            mAS: {
                atrm: [false, false, false, false, false, false, false, false],
                bcm: [false, false, false, false, false, false, false, false],
                bm: [false, false, false, false, false, false, false, false],
                cclm: [false, false, false, false, false, false, false, false],
                ccom: [false, false, false, false, false, false, false, false],
                drm: [false, false, false, false, false, false, false, false],
                ipm: [0, 0, 0, 0, 0, 0, 0, 0],
                irsm: [true, false],
                lm: [false, false, false, false, false, false, false, false],
                rpm: [false, false, false, false, false, false, false, false],
                sum: [false, false, false, false, false, false, false, false],
                tacm: false,
                tfm: [false, false, false, false, false, false, false, false],
                tdm: [false, false, false, false, false, false, false, false]
            },
        };
    }
    render() {
        return (
            <>
                {!this.state.libLoaded ?
                    (<span style={{ fontSize: "x-large" }}>Loading Library...</span>)
                    :
                    (<>
                        <Button size="lg" variant="secondary" onClick={this.setUpRuntimeSettings}>Update Runtime Settings</Button>
                        <Button size="lg" variant="secondary" onClick={this.showRuntimeSettings}>Show Runtime Settings</Button>
                        <input onChange={this.onFileSelected} type="file" multiple accept="image/png,image/jpeg,image/bmp,image/gif" />
                        {this.state.messages.length > 0 ?
                            (<div className="div-message" style={style.div_message} ref={this.refDivMessage}>
                                <div className="left half thinBorder">
                                    {this.state.bDecoding ? (<Spinner animation="border" />) :
                                        (<Button variant="primary" onClick={this.showDetails}>Show Details</Button>)
                                    }
                                    {
                                        this.state.messages.map((message, index) =>
                                            <p className='compact_P' key={this.state.messageKeyBase + index}>
                                                {message}
                                            </p>
                                        )
                                    }
                                </div>
                                <img src={this.state.imgData === null ? logo : this.state.imgData} className={this.state.imgData === null ? "left half logo" : "left maxHalf thinBorder"} alt="Place Holder" />
                            </div>)
                            : (<div className="div-message"></div>)
                        }
                    </>)
                }
                {(() => {
                    if (this.state.bShowModalDialog) {
                        return (
                            <Modal show={true} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.modalTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className={this.state.modalTitle === "Set Up" ? "overFlowX noPadding" : "overFlowX"}>
                                    {this.renderSwitch(this.state.modalTitle)}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        )
                    }
                })()}
            </>
        );
    }
    async componentDidMount() {
        DBR.BarcodeReader._bUseFullFeature = this.props.fullFeature;
        await DBR.BarcodeScanner.loadWasm();
        this.setState(state => {
            state.libLoaded = true;
            return state;
        });
    }
    componentWillUnmount() {
        if (this.reader) {
            this.reader.destroy();
        }
    }
    showCurrentSettings = async () => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        let runtimeSettings = await reader.getRuntimeSettings();
        let newState = JSON.parse(JSON.stringify(this.state.mAS));
        let oneValueID = '';
        for (let _setting in runtimeSettings) {
            oneValueID = 'ipt-runtimesettings-';
            let settingObj = "";
            let valueObj = null;
            let fillDropDown = null;
            let bfurtherModes = false;
            if (runtimeSettings.hasOwnProperty(_setting)) {
                settingObj = _setting;
                valueObj = runtimeSettings[_setting];
                fillDropDown = false;
                switch (_setting) {
                    case "barcodeFormatIds":
                        let barcodeFormatIds = parseInt(valueObj);
                        this.updateBarcodeFormatsCheckStatus(barcodeFormatIds);
                        break;
                    case "barcodeFormatIds_2":
                        let barcodeFormatIds2 = parseInt(valueObj);
                        this.updateBarcodeFormatsCheckStatus2(barcodeFormatIds2);
                        break;
                    case "intermediateResultTypes":
                        let intermediateResultTypes = parseInt(valueObj);
                        this.updateIntermediateResultTypes(intermediateResultTypes);
                        break;
                    case "region":
                        let region = valueObj;
                        for (let _subSetting in region) {
                            oneValueID = 'ipt-runtimesettings-';
                            if (region.hasOwnProperty(_subSetting)) {
                                oneValueID += _subSetting;
                                if (_subSetting === 'regionMeasuredByPercentage') {
                                    region[_subSetting] === 0 ?
                                        document.getElementById(oneValueID).checked = false :
                                        document.getElementById(oneValueID).checked = true;
                                    this.usePercentageOrNot();
                                }
                                if (document.getElementById(oneValueID) && document.getElementById(oneValueID).value !== undefined)
                                    document.getElementById(oneValueID).value = region[_subSetting];
                            }
                        }
                        break;
                    case "timeout":
                    case "maxAlgorithmThreadCount":
                    case "expectedBarcodesCount":
                    case "scaleDownThreshold":
                    case "pdfRasterDPI":
                    case "deblurLevel":
                    case "minBarcodeTextLength":
                    case "minResultConfidence":
                    case "returnBarcodeZoneClarity":
                        oneValueID += _setting;
                        if (document.getElementById(oneValueID) && document.getElementById(oneValueID).hasOwnProperty('value')) {
                            document.getElementById(oneValueID).value = valueObj;
                            let sibling = document.getElementById(oneValueID).previousSibling;
                            sibling.value = valueObj / parseInt(sibling.getAttribute('factor'));
                        }
                        break;
                    case "binarizationModes":
                    case "localizationModes":
                    case "scaleUpModes":
                    case "textResultOrderModes":
                        fillDropDown = true;
                        newState = this.modesSelectionChanged(_setting, valueObj, newState);
                        break;
                    case "furtherModes":
                        let furtherModes = valueObj;
                        bfurtherModes = true;
                        for (let modes in furtherModes) {
                            if (furtherModes.hasOwnProperty(modes)) {
                                settingObj = modes;
                                valueObj = furtherModes[modes];
                                switch (modes) {
                                    case "accompanyingTextRecognitionModes":
                                    case "barcodeColourModes":
                                    case "barcodeComplementModes":
                                    case "colourClusteringModes":
                                    case "colourConversionModes":
                                    case "deformationResistingModes":
                                    case "dpmCodeReadingModes":
                                    case "grayscaleTransformationModes":
                                    case "imagePreprocessingModes":
                                    case "regionPredetectionModes":
                                    case "textFilterModes":
                                    case "textureDetectionModes":
                                        fillDropDown = true;
                                        newState = this.modesSelectionChanged(modes, valueObj, newState);
                                        break;
                                    case "textAssistedCorrectionMode":
                                        if (parseInt(valueObj) > 1)
                                            newState.tacm = true;
                                        else
                                            newState.tacm = false;
                                        break;
                                    default: break;
                                }
                                if (settingObj === "textAssistedCorrectionMode") {
                                    document.getElementById(settingObj + '_1').value = valueObj;
                                } else if (fillDropDown) {
                                    for (let i = 0; i < 8; i++) {
                                        if (document.getElementById(settingObj + '_' + (i + 1).toString()))
                                            document.getElementById(settingObj + '_' + (i + 1).toString()).value = valueObj[i];
                                        else
                                            console.log('Element with the ID ' + settingObj + '_' + (i + 1).toString() + 'does not exist');
                                    }
                                }
                            }
                        }
                        break;
                    case "intermediateResultSavingMode":
                        switch (valueObj) {
                            case 1:
                                newState.irsm = [true, false];
                                break;
                            case 2:
                                newState.irsm = [false, true];
                                break;
                            case 4:
                                newState.irsm = [true, true];
                                break;
                            default: break;
                        }
                        oneValueID = _setting + "_1";
                        if (document.getElementById(oneValueID) && document.getElementById(oneValueID).value !== undefined)
                            document.getElementById(oneValueID).value = valueObj;
                        break;
                    case "terminatePhase":
                    case "resultCoordinateType":
                        oneValueID = _setting + "_1";
                        if (document.getElementById(oneValueID) && document.getElementById(oneValueID).value !== undefined)
                            document.getElementById(oneValueID).value = valueObj;
                        break;
                    default: break;
                }
                if (!bfurtherModes && fillDropDown) {
                    for (let i = 0; i < 8; i++) {
                        if (document.getElementById(settingObj + '_' + (i + 1).toString()))
                            document.getElementById(settingObj + '_' + (i + 1).toString()).value = valueObj[i];
                        else
                            console.log('Element with the ID ' + settingObj + '_' + (i + 1).toString() + 'does not exist');
                    }
                }
            }
        }
        this.setState({
            mAS: newState,
            bInitializing: false
        });
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
                            this.appendAMessage("Result: " + result.barcodeText);
                            this.appendDetails("------------------------------------------------------------------------");
                            this.appendDetails("Number " + (i + 1).toString() + " on file " + file.name);
                            this.appendDetails("------------------------------------------------------------------------");
                            this.appendDetails("BarcodeFormat: " + result.barcodeFormatString);
                            this.appendDetails("BarcodeFormat_2: " + result.barcodeFormatString_2);
                            this.appendDetails("BarcodeText: " + result.barcodeText);
                            this.appendDetails("*************************** Localization ****************************");
                            if (result.barcodeBytes !== null && result.barcodeBytes.length !== 0)
                                this.appendDetails("Barcode Bytes (base64): " + btoa(result.barcodeBytes));

                            let tempLocalizationResult = result.localizationResult;
                            this.appendDetails("Terminated Phase: " + tempLocalizationResult.terminatePhase);
                            this.appendDetails("Format in Localization: " + tempLocalizationResult.barcodeFormatString);
                            this.appendDetails("Format in Localization2: " + tempLocalizationResult.barcodeFormatString_2);
                            this.appendDetails("Angle: " + tempLocalizationResult.angle.toString());
                            this.appendDetails("Module Size: " + tempLocalizationResult.moduleSize.toString());
                            this.appendDetails("Confidence: " + tempLocalizationResult.confidence.toString());

                            this.appendDetails("Document: " + tempLocalizationResult.documentName);
                            this.appendDetails("Page: " + tempLocalizationResult.pageNumber.toString());
                            this.appendDetails("Region: " + tempLocalizationResult.regionName.toString());
                            let _type = tempLocalizationResult.resultCoordinateType === 1 ? "<px>" : "<%>";
                            this.appendDetails("Location " + _type + ": ");
                            this.appendDetails(" (" + tempLocalizationResult.x1 + ", " + tempLocalizationResult.y1 + ")"
                                + " (" + tempLocalizationResult.x2 + ", " + tempLocalizationResult.y2 + ")"
                                + " (" + tempLocalizationResult.x3 + ", " + tempLocalizationResult.y3 + ")"
                                + " (" + tempLocalizationResult.x4 + ", " + tempLocalizationResult.y4 + ")"
                                , true);
                            this.appendDetails("*************************** Extended ****************************");
                            let extendedResults = result.results;
                            for (let k = 0; k < extendedResults.length; k++) {
                                this.appendDetails("Extended Result Number: [" + k.toString() + "]");
                                if (extendedResults[k].bytes !== null && extendedResults[k].bytes.length !== 0)
                                    this.appendDetails("Bytes (base64): " + btoa(extendedResults[k].bytes));
                                this.appendDetails("Clarity: " + extendedResults[k].clarity.toString());
                                this.appendDetails("Confidence: " + extendedResults[k].confidence.toString());
                                this.appendDetails("Deformation: " + extendedResults[k].deformation.toString());
                                this.appendDetails("Result Type: " + extendedResults[k].resultType.toString());

                                if (extendedResults[i].detailedResult !== null)
                                    this.appendDetails("Detailed Result Exists!", true);

                                this.appendDetails("*************************** Details ****************************");
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
    setImageData = data => {
        this.setState({
            imgData: data
        })
    }
    toggleShowOneDItems = () => {
        this.setState(state => {
            state.setUpState.showOneDItems ?
                state.setUpState.showOneDItems = false :
                state.setUpState.showOneDItems = true;
            return state;
        });
    }
    toggleShowDataBarItems = () => {
        this.setState(state => {
            state.setUpState.showDataBarItems ?
                state.setUpState.showDataBarItems = false :
                state.setUpState.showDataBarItems = true;
            return state;
        });
    }
    toggleShowPostalCodeItems = () => {
        this.setState(state => {
            state.setUpState.showPostalCodeItems ?
                state.setUpState.showPostalCodeItems = false :
                state.setUpState.showPostalCodeItems = true;
            return state;
        });
    }
    toggleShowFurtherModesItems = () => {
        this.setState(state => {
            state.setUpState.showFurtherModesItems ?
                state.setUpState.showFurtherModesItems = false :
                state.setUpState.showFurtherModesItems = true;
            return state;
        });
    }
    barcodeFormatsUpdate2 = evt => {
        let barcodeFormatInputs = document.querySelectorAll('.ipt-barcodeFormat2');
        let nBarcodeFormatIds = 0;
        if (evt.target.checked)
            nBarcodeFormatIds = parseInt(evt.target.value);
        for (let i = 0; i < barcodeFormatInputs.length; i++) {
            let barcodeFormatInput = barcodeFormatInputs[i];
            if (barcodeFormatInput.checked && (parseInt(barcodeFormatInput.value) & nBarcodeFormatIds) === 0)
                nBarcodeFormatIds += parseInt(barcodeFormatInput.value);
        }
        if (!evt.target.checked)
            nBarcodeFormatIds = (32505857 - parseInt(evt.target.value)) & nBarcodeFormatIds;
        if (parseInt(evt.target.value) === 0) {
            if (evt.target.checked)
                nBarcodeFormatIds = 0;
            else
                nBarcodeFormatIds = 32505857;
        }
        this.updateBarcodeFormatsCheckStatus2(nBarcodeFormatIds);
    }
    updateBarcodeFormatsCheckStatus2 = (nBarcodeFormatIds) => {
        if (typeof (nBarcodeFormatIds) != "number") {
            if (nBarcodeFormatIds.target) {
                var reg = /^\d+$/;
                let evt = nBarcodeFormatIds;
                if (!reg.test(evt.target.value))
                    evt.target.value = evt.target.getAttribute('value');
                nBarcodeFormatIds = evt.target.value;
            } else {
                return;
            }
        }
        if (nBarcodeFormatIds === 0)
            document.getElementById('null-barcodeFormatIds_2').checked = true;
        else
            document.getElementById('null-barcodeFormatIds_2').checked = false;
        let barcodeFormatInputs = document.querySelectorAll('.ipt-barcodeFormat2');
        let barcodeFormatInputCombos = document.querySelectorAll('.ipt-barcodeFormat-combo2');
        for (let i = 0; i < barcodeFormatInputCombos.length; i++) {
            let barcodeFormatInputCombo = barcodeFormatInputCombos[i];
            if (parseInt(barcodeFormatInputCombo.value) === (parseInt(barcodeFormatInputCombo.value) & nBarcodeFormatIds))
                barcodeFormatInputCombo.checked = true;
            else
                barcodeFormatInputCombo.checked = false;
        }

        document.getElementById('ipt-runtimesettings-barcodeFormatIds_2').value = nBarcodeFormatIds;
        for (let i = 0; i < barcodeFormatInputs.length; i++) {
            let barcodeFormatInput = barcodeFormatInputs[i];
            barcodeFormatInput.checked = false;
            if (nBarcodeFormatIds & parseInt(barcodeFormatInput.value))
                barcodeFormatInput.checked = true;
        }
    }
    updateIntermediateResultTypes = (intermediateResultTypes) => {
        if (typeof (intermediateResultTypes) != "number") {
            if (intermediateResultTypes.target) {
                var reg = /^\d+$/;
                let evt = intermediateResultTypes;
                if (!reg.test(evt.target.value))
                    evt.target.value = evt.target.getAttribute('value');
                intermediateResultTypes = evt.target.value;
            } else {
                return;
            }
        }
        let intermediateResultTypesInputs = document.querySelectorAll('.ipt-updateIntermediateResultTypes');
        document.getElementById('ipt-runtimesettings-intermediateResultTypes').value = intermediateResultTypes;
        for (let i = 0; i < intermediateResultTypesInputs.length; i++) {
            let intermediateResultTypesInput = intermediateResultTypesInputs[i];
            intermediateResultTypesInput.checked = false;
            if (intermediateResultTypes & parseInt(intermediateResultTypesInput.value))
                intermediateResultTypesInput.checked = true;
        }
    }
    barcodeFormatsUpdate = evt => {
        let barcodeFormatInputs = document.querySelectorAll('.ipt-barcodeFormat');
        let nBarcodeFormatIds = 0;
        if (evt.target.checked)
            nBarcodeFormatIds = parseInt(evt.target.value);
        for (let i = 0; i < barcodeFormatInputs.length; i++) {
            let barcodeFormatInput = barcodeFormatInputs[i];
            if (barcodeFormatInput.checked && (parseInt(barcodeFormatInput.value) & nBarcodeFormatIds) === 0)
                nBarcodeFormatIds += parseInt(barcodeFormatInput.value);
        }
        if (!evt.target.checked)
            nBarcodeFormatIds = (-32505857 - parseInt(evt.target.value)) & nBarcodeFormatIds;
        this.updateBarcodeFormatsCheckStatus(nBarcodeFormatIds);
    }
    updateBarcodeFormatsCheckStatus = (nBarcodeFormatIds) => {
        if (typeof (nBarcodeFormatIds) != "number") {
            if (nBarcodeFormatIds.target) {
                var reg = /^\d+$/;
                let evt = nBarcodeFormatIds;
                if (!reg.test(evt.target.value))
                    evt.target.value = evt.target.getAttribute('value');
                nBarcodeFormatIds = evt.target.value;
            } else {
                return;
            }
        }
        let barcodeFormatInputs = document.querySelectorAll('.ipt-barcodeFormat');
        let barcodeFormatInputCombos = document.querySelectorAll('.ipt-barcodeFormat-combo');
        for (let i = 0; i < barcodeFormatInputCombos.length; i++) {
            let barcodeFormatInputCombo = barcodeFormatInputCombos[i];
            if (parseInt(barcodeFormatInputCombo.value) === (parseInt(barcodeFormatInputCombo.value) & nBarcodeFormatIds))
                barcodeFormatInputCombo.checked = true;
            else
                barcodeFormatInputCombo.checked = false;
        }
        document.getElementById('ipt-runtimesettings-barcodeFormatIds').value = nBarcodeFormatIds;
        for (let i = 0; i < barcodeFormatInputs.length; i++) {
            let barcodeFormatInput = barcodeFormatInputs[i];
            barcodeFormatInput.checked = false;
            if (nBarcodeFormatIds & parseInt(barcodeFormatInput.value))
                barcodeFormatInput.checked = true;
        }
    }
    setModeArguments = async (evt) => {
        /**
         *             EnumErrorCode errorCode;
            string errorMessage;
            if (ModesNameBox.Text == "IntermediateResultSavingMode" && ArgumentNameBox.Text == "FolderPath")
                errorCode = reader.SetModeArgument(ModesNameBox.Text, (int)ModesIndexBox.Value, ArgumentNameBox.Text, txtArgumentValue.Text, out errorMessage);
            else
                errorCode = reader.SetModeArgument(ModesNameBox.Text, (int)ModesIndexBox.Value, ArgumentNameBox.Text, ArgumentValueBox.Text, out errorMessage);
            if (errorCode != EnumErrorCode.DBR_SUCCESS)
            {
                MessageBox.Show(errorMessage, "Error!");
            }
         */
        /*let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        let runtimeSettings = await reader.getRuntimeSettings();
        let newState = JSON.parse(JSON.stringify(this.state.mAS));*/
        try {
            if (evt && evt.target && evt.target.parentElement && evt.target.parentElement.children) {
                let sMAElements = evt.target.parentElement.children;
                for (let _ele in sMAElements) {
                    if (sMAElements[_ele].tagName && sMAElements[_ele].tagName.toLowerCase() === "div" && sMAElements[_ele].lastChild.tagName && sMAElements[_ele].lastChild.tagName.toLowerCase() === "input") {
                        let _input = sMAElements[_ele].lastChild;
                        if (_input.parentElement.style.display !== "none") {
                            let dataId = _input.getAttribute("data-id");
                            if (typeof dataId === "string") {
                                let params = dataId.split("-");
                                if (params[0] === "SMA") {
                                    let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
                                    await this.updateRuntimeSettings();
                                    let newValue = _input.value.trim();
                                    if (params[3] === "EnableFillBinaryVacancy") {
                                        if (_input.checked)
                                            newValue = "1";
                                        else
                                            newValue = "0";
                                    }
                                    reader.setModeArgument(params[1], parseInt(params[2]), params[3], newValue);
                                }
                            }
                        }
                    }
                }
                /**
                let strMode = evt.target.parentElement.firstChild.lastChild.getAttribute('for').substr(20);
                switch (strMode) {
                    default:
                        console.log(strMode);
                        break;
                    case "irsm-rss":
                        break;
                    case "BlockSizeX_1": break;
                    case "ScanStride": break;
                    case "AcuteAngleWithXThreshold": break;
                    case "LightReflection": break;
                    case "cclm-Sensitivity": break;
                    case "BlueChannelWeight": break;
                    case "drm-level": break;
                    case "Sensitivity": break;
                    case "SmoothBlockSizeX": break;
                    case "SharpenBlockSizeX": break;
                    case "SmoothBlockSizeX": break;
                    case "5MinImageDimension": break;
                    case "Sensitivity": break;
                    case "BottomTextPercentageSize": break;
    
                } */
            }
        } catch (ex) {
            this.appendAMessage(ex.message);
            console.error(ex);
        }
    }
    usePredefinedSettings = async evt => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        if (evt && evt.target && evt.target.getAttribute("modename")) {
            let modeName = evt.target.getAttribute("modename");
            await reader.updateRuntimeSettings(modeName);
            this.showCurrentSettings();
        }
    }
    updateRuntimeSettings = async () => {
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        let runtimeSettings = await reader.getRuntimeSettings();
        let allInputs = document.querySelectorAll('input');
        let allSelects = document.querySelectorAll('select');
        for (let _key in allInputs) {
            if (allInputs.hasOwnProperty(_key)) {
                let _setting = allInputs[_key];
                let _settingID = "";
                if (_setting.getAttribute && (_settingID = _setting.getAttribute('id'))) {
                    if (_settingID.indexOf('ipt-runtimesettings-') !== -1) {
                        let _item = _settingID.substr(_settingID.lastIndexOf("-") + 1)
                        if (_setting.value === "") _setting.value = 0;
                        if (_item.indexOf('region') !== -1) {
                            if (_item === "regionMeasuredByPercentage") {
                                if (_setting.checked)
                                    runtimeSettings.region[_item] = 1;
                                else
                                    runtimeSettings.region[_item] = 0;
                            } else
                                runtimeSettings.region[_item] = parseInt(_setting.value);
                        } else {
                            runtimeSettings[_item] = parseInt(_setting.value);
                        }
                    }
                }
            }
        }
        for (let _key in allSelects) {
            if (allSelects.hasOwnProperty(_key)) {
                let _setting = allSelects[_key];
                let valueObj = parseInt(_setting.value)
                let _settingID = "";
                if (_setting.getAttribute && (_settingID = _setting.getAttribute('id'))) {
                    if (_settingID.indexOf("_") !== -1) {
                        let subIDs = _settingID.split("_");
                        switch (subIDs[0]) {
                            case "intermediateResultSavingMode":
                            case "terminatePhase":
                            case "textAssistedCorrectionMode":
                            case "resultCoordinateType":
                                runtimeSettings[subIDs[0]] = valueObj;
                                break;
                            case "binarizationModes":
                            case "localizationModes":
                            case "scaleUpModes":
                            case "textResultOrderModes":
                                runtimeSettings[subIDs[0]][parseInt(subIDs[1]) - 1] = valueObj;
                                break;
                            case "accompanyingTextRecognitionModes":
                            case "barcodeColourModes":
                            case "barcodeComplementModes":
                            case "colourClusteringModes":
                            case "colourConversionModes":
                            case "deformationResistingModes":
                            case "dpmCodeReadingModes":
                            case "grayscaleTransformationModes":
                            case "imagePreprocessingModes":
                            case "regionPredetectionModes":
                            case "textFilterModes":
                            case "textureDetectionModes":
                                runtimeSettings.furtherModes[subIDs[0]][parseInt(subIDs[1]) - 1] = valueObj;
                                break;
                            default: break;
                        }
                    }
                }
            }
        }
        reader.updateRuntimeSettings(runtimeSettings);
    }
    usePercentageOrNot = async => {
        let checkBox = document.getElementById('ipt-runtimesettings-regionMeasuredByPercentage');
        let parentElement = checkBox.parentElement;
        let oldText1 = parentElement.nextSibling.getAttribute("placeholder");
        let oldText2 = parentElement.nextSibling.nextSibling.getAttribute("placeholder");
        let oldText3 = parentElement.nextSibling.nextSibling.nextSibling.getAttribute("placeholder");
        let oldText4 = parentElement.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("placeholder");
        if (checkBox.checked) {
            if (oldText1.indexOf("%") === -1) {
                oldText1 = oldText1 + "(%)";
                oldText2 = oldText2 + "(%)";
                oldText3 = oldText3 + "(%)";
                oldText4 = oldText4 + "(%)";
            }
        } else {
            if (oldText1.indexOf("%") !== -1) {
                oldText1 = oldText1.substr(0, oldText1.length - 3);
                oldText2 = oldText2.substr(0, oldText2.length - 3);
                oldText3 = oldText3.substr(0, oldText3.length - 3);
                oldText4 = oldText4.substr(0, oldText4.length - 3);
            }
        }
        parentElement.nextSibling.placeholder = oldText1;
        parentElement.nextSibling.nextSibling.placeholder = oldText2;
        parentElement.nextSibling.nextSibling.nextSibling.placeholder = oldText3;
        parentElement.nextSibling.nextSibling.nextSibling.nextSibling.placeholder = oldText4;
    }
    updateRangeValue = evt => {
        evt.target.nextSibling.value = parseInt(evt.target.value) * parseInt(evt.target.getAttribute('factor'));
    }
    updateRange = evt => {
        var reg = /^\d+$/;
        if (!reg.test(evt.target.value))
            evt.target.value = evt.target.getAttribute('value');
        if (evt.target.value > parseInt(evt.target.getAttribute('max')))
            evt.target.value = evt.target.getAttribute('max');
        evt.target.previousSibling.value = parseInt(parseInt(evt.target.value) / parseInt(evt.target.getAttribute('factor')));
    }
    IRTClicked = evt => {
        let elToUpdate = evt.target.parentNode.parentNode.previousSibling;
        if (evt.target.checked)
            elToUpdate.value = parseInt(elToUpdate.value) + parseInt(evt.target.value);
        else
            elToUpdate.value = parseInt(elToUpdate.value) - parseInt(evt.target.value);
    }
    modesSelectionChanged = (modes, values, newState) => {
        if (values.length) {
            let state = newState;
            for (let i = 0; i < values.length; i++) {
                state = this.selectionChanged({ modeName: modes + "_" + (i + 1).toString(), value: values[i], currentState: newState });
            }
            return state;
        } else
            return newState;
    }
    selectionChanged = evt => {
        let currentSel, currentSelValue, selectionMode, newState;
        if (evt.target) {
            currentSel = evt.target;
            currentSelValue = parseInt(currentSel.value);
            selectionMode = currentSel.getAttribute("id").split("_");
            newState = JSON.parse(JSON.stringify(this.state.mAS));
        }
        else {
            currentSel = evt.modeName;
            currentSelValue = parseInt(evt.value);
            selectionMode = currentSel.split("_");
            newState = evt.currentState;
        }
        //console.log(currentSel + " : " + currentSelValue)
        switch (selectionMode[0]) {
            case 'accompanyingTextRecognitionModes':
                if (currentSelValue === 1)
                    newState.atrm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.atrm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'barcodeColourModes':
                if (currentSelValue !== 0)
                    newState.bcm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.bcm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'binarizationModes':
                if (currentSelValue === 2)
                    newState.bm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.bm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'colourClusteringModes':
                if (currentSelValue === 2)
                    newState.cclm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.cclm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'colourConversionModes':
                if (currentSelValue === 1)
                    newState.ccom[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.ccom[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'deformationResistingModes':
                if (currentSelValue === 2)
                    newState.drm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.drm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'imagePreprocessingModes':
                newState.ipm[parseInt(selectionMode[1]) - 1] = currentSelValue;
                break;
            case 'intermediateResultSavingMode':
                switch (currentSelValue) {
                    case 1:
                        newState.irsm = [true, false];
                        break;
                    case 2:
                        newState.irsm = [false, true];
                        break;
                    case 4:
                        newState.irsm = [true, true];
                        break;
                    default: break;
                }
                break;
            case 'localizationModes':
                if (currentSelValue === 16)
                    newState.lm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.lm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'regionPredetectionModes':
                if (currentSelValue > 2)
                    newState.rpm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.rpm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'scaleUpModes':
                if (currentSelValue > 1)
                    newState.sum[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.sum[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'textAssistedCorrectionMode':
                if (currentSelValue > 1)
                    newState.tacm = true;
                else
                    newState.tacm = false;
                break;
            case 'textFilterModes':
                if (currentSelValue === 2)
                    newState.tfm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.tfm[parseInt(selectionMode[1]) - 1] = false;
                break;
            case 'textureDetectionModes':
                if (currentSelValue === 2)
                    newState.tdm[parseInt(selectionMode[1]) - 1] = true;
                else
                    newState.tdm[parseInt(selectionMode[1]) - 1] = false;
                break;
            default: break;
        }
        if (evt.target)
            this.setState({ mAS: newState });
        else
            return newState;
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
    showArguments = evt => {
        let cardClass = evt.target.getAttribute("data-cardclass");
        let temp = cardClass.split("_");
        if (temp[1] === "0")
            if (document.getElementsByClassName(cardClass)[0].style.display === "block")
                document.getElementsByClassName(cardClass)[0].style.display = "none";
            else
                document.getElementsByClassName(cardClass)[0].style.display = "block";
        else
            console.log(evt.target.previousSibling.getAttribute("id"));
    }
    renderSwitch = (modalTile) => {
        switch (modalTile) {
            case 'Detailed Results':
                return (
                    this.state.detailTitles.map((message, index) =>
                        <p className='compact_P' key={this.state.messageKeyBase + index}>
                            <span>
                                {message}
                            </span>
                            <strong className="dsColor">
                                {this.state.detailContent[index]}
                            </strong>
                        </p>
                    ));
            case 'Runtime SettingsSample':
                return (
                    this.state.bInitializing ? (<div style={{ textAlign: 'center', padding: '2vw' }}><Spinner animation="border" /></div>) : (
                        <div>
                            {this.props.fullFeature ?
                                (<><input style={{ verticalAlign: 'baseline' }} type="checkbox" onChange={this.toggleSettingsString} /> Show String</>)
                                : ""}
                            <Card className="paddingOneVW" style={this.state.showString ? style.hide : style.show}>
                                {this.state.runtimeSettings.map((setting, index) =>
                                    <p className={'compact_P runTimeSettings_P' + setting[0]} key={this.state.messageKeyBase + index} >
                                        {setting[1]}
                                    </p >
                                )}
                            </Card>
                            <Card className="paddingOneVW" style={this.state.showString ? style.show : style.hide}>
                                <pre>{this.state.runtimeSettingsString}</pre>
                            </Card>
                        </div>
                    )
                );

            case 'Set Up':
                return (
                    this.state.bInitializing ? (<div style={{ textAlign: 'center', padding: '2vw' }}><Spinner animation="border" /></div>) :
                        (<div id="div-settingsModule" className="div-settingsModule">
                            <div className="div-advanceSettingsHeader">
                                <a title="Check Documentation" href="https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/global-interfaces.html?ver=latest#runtimesettings" target="_blank" rel="noopener noreferrer" original-title="document">
                                    <svg width="16" height="16" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path fill="#fe8e14" d="M1703 478q40 57 18 129l-275 906q-19 64-76.5 107.5t-122.5 43.5h-923q-77 0-148.5-53.5t-99.5-131.5q-24-67-2-127 0-4 3-27t4-37q1-8-3-21.5t-3-19.5q2-11 8-21t16.5-23.5 16.5-23.5q23-38 45-91.5t30-91.5q3-10 .5-30t-.5-28q3-11 17-28t17-23q21-36 42-92t25-90q1-9-2.5-32t.5-28q4-13 22-30.5t22-22.5q19-26 42.5-84.5t27.5-96.5q1-8-3-25.5t-2-26.5q2-8 9-18t18-23 17-21q8-12 16.5-30.5t15-35 16-36 19.5-32 26.5-23.5 36-11.5 47.5 5.5l-1 3q38-9 51-9h761q74 0 114 56t18 130l-274 906q-36 119-71.5 153.5t-128.5 34.5h-869q-27 0-38 15-11 16-1 43 24 70 144 70h923q29 0 56-15.5t35-41.5l300-987q7-22 5-57 38 15 59 43zm-1064 2q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5zm-83 256q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5z"></path></svg>
                                </a>
                            </div>
                            <div style={{ textAlign: "center", paddingTop: "1vw" }}>
                                <Button variant="outline-info" onClick={this.showCurrentSettings}>Show Current SettingsSample</Button>
                                <Button variant="outline-success" onClick={this.updateRuntimeSettings}>Update Runtime SettingsSample</Button><br /><br />
                                <Button variant="secondary" modename="speed" onClick={this.usePredefinedSettings}>Speed</Button>
                                <Button variant="secondary" modename="balance" onClick={this.usePredefinedSettings}>Balance</Button>
                                <Button variant="secondary" modename="coverage" onClick={this.usePredefinedSettings}>Coverage</Button>
                            </div>
                            <div id="div-advanceSettings" className="div-advanceSettings div-runtimesettings-details-container">
                                <Card style={{ padding: '1vw' }} id="div-barcodeFormatContainer" className="div-barcodeFormatContainer">
                                    <Card.Title style={{ width: '100%' }}>Choose Formats</Card.Title>
                                    <label htmlFor="ipt-runtimesettings-barcodeFormatIds">Barcode Format Ids Group 1</label>
                                    <input id="ipt-runtimesettings-barcodeFormatIds" onChange={this.updateBarcodeFormatsCheckStatus} type="knumber" defaultValue="-32505857" factor="1" min="0" />
                                    <div className="div-1dFormat">
                                        <label title="<img src='img/oned.gif'>"><input type="checkbox" className="ipt-barcodeFormat-combo" onClick={this.barcodeFormatsUpdate} defaultChecked={true} defaultValue="0x000007FF" id="ipt-1dFormat" />1D</label>
                                        <Button variant="Light" id="btn-toggle1Ds" className="btn-toggle" onClick={this.toggleShowOneDItems} ></Button>
                                    </div>
                                    <Card id="div-1dFormatContainer" className="div-1dFormatContainer" style={this.state.setUpState.showOneDItems ? style.show : style.hide}>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="1" className="ipt-barcodeFormat" defaultChecked={true} />CODE 39</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="2" className="ipt-barcodeFormat" defaultChecked={true} />CODE 128</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="4" className="ipt-barcodeFormat" defaultChecked={true} />CODE 93</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="8" className="ipt-barcodeFormat" defaultChecked={true} />CODABAR</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10" className="ipt-barcodeFormat" defaultChecked={true} />ITF</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20" className="ipt-barcodeFormat" defaultChecked={true} />EAN 13</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x40" className="ipt-barcodeFormat" defaultChecked={true} />EAN 8</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x80" className="ipt-barcodeFormat" defaultChecked={true} />UPC A</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x100" className="ipt-barcodeFormat" defaultChecked={true} />UPC E</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x200" className="ipt-barcodeFormat" defaultChecked={true} />INDUSTRIAL 25</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x400" className="ipt-barcodeFormat" defaultChecked={true} />CODE 39 EXTENDED</label>
                                    </Card>

                                    <div className="div-GS1DatabarFormat">
                                        <label original-title="<img src='img/GS1Databar.png'>">
                                            <input type="checkbox" onClick={this.barcodeFormatsUpdate} className="ipt-barcodeFormat-combo" defaultChecked={true} defaultValue="0x0003F800" id="ipt-GS1DatabarFormat" />GS1 Databar</label>
                                        <Button variant="Light" id="btn-toggleGS1Databars" className="btn-toggle" onClick={this.toggleShowDataBarItems}></Button>
                                    </div>
                                    <Card id="div-GS1DatabarFormatContainer" className="div-GS1DatabarFormatContainer" style={this.state.setUpState.showDataBarItems ? style.show : style.hide}>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x800" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR OMNIDIRECTIONAL</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x1000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR TRUNCATED</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x2000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR STACKED</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x4000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR STACKED OMNIDIRECTIONAL</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x8000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR EXPANDED</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR EXPANDED STACKED</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 DATABAR LIMITED</label>
                                    </Card>

                                    <label original-title="<img src='img/pdf417.gif'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x2080000" className="ipt-barcodeFormat" defaultChecked={true} />(Micro) PDF 417</label>
                                    <label title="<img src='img/qr.gif'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x44000000" className="ipt-barcodeFormat" defaultChecked={true} />(Micro) QR Code</label>
                                    <label original-title="<img src='img/dm.gif'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x8000000" className="ipt-barcodeFormat" defaultChecked={true} />DataMatrix</label>
                                    <label title="<img src='img/aztec.gif'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10000000" className="ipt-barcodeFormat" defaultChecked={true} />Aztec Code</label>
                                    <label original-title="<img src='img/maxicode.png'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20000000" className="ipt-barcodeFormat" defaultChecked={true} />Maxicode</label>
                                    <label title="<img src='img/patchcode.png'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x40000" className="ipt-barcodeFormat" defaultChecked={true} />Patch Code</label>
                                    <label original-title="<img src='img/gs1composite.png'>">
                                        <input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="-0x80000000" className="ipt-barcodeFormat" defaultChecked={true} />GS1 COMPOSITE</label>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} >
                                    <Card.Title style={{ width: '100%' }}>Basic SettingsSample</Card.Title>
                                    <label htmlFor="ipt-runtimesettings-terminatePhase">TerminatePhase</label>
                                    <select id="terminatePhase_1">
                                        <option value="1">Region Predetected</option>
                                        <option value="2">Image Preprocessed</option>
                                        <option value="4">Image Binarized</option>
                                        <option value="8">Barcode Localized</option>
                                        <option value="16">Barcode Type Determind</option>
                                        <option value="32">Barcode Recognized</option>
                                    </select>
                                    <label htmlFor="ipt-runtimesettings-timeout">Timeout</label>
                                    <input type="range" onChange={this.updateRangeValue} min="1" max="100" defaultValue="10" step="1" factor="1000" />
                                    <input id="ipt-runtimesettings-timeout" onKeyUp={this.updateRange} type="knumber" min="100" max="99999" step="1" defaultValue="10000" factor="1000" />

                                    <label htmlFor="ipt-runtimesettings-maxAlgorithmThreadCount" original-title="">MaxAlgorithmThreadCount</label>
                                    <input type="range" onChange={this.updateRangeValue} min="1" max="4" step="1" defaultValue="4" factor="1" />
                                    <input id="ipt-runtimesettings-maxAlgorithmThreadCount" onKeyUp={this.updateRange} type="knumber" min="1" max="4" step="1" defaultValue="4" factor="1" />

                                    <label htmlFor="ipt-runtimesettings-expectedBarcodesCount">ExpectedBarcodesCount</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="100" step="1" defaultValue="0" factor="1" />
                                    <input id="ipt-runtimesettings-expectedBarcodesCount" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />

                                    <label htmlFor="ipt-runtimesettings-scaleDownThreshold" original-title="">ScaleDownThreshold</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="100" step="1" defaultValue="23" factor="100" />
                                    <input id="ipt-runtimesettings-scaleDownThreshold" onKeyUp={this.updateRange} type="knumber" min="512" max="99999" step="1" defaultValue="2300" factor="512" />

                                    <label htmlFor="ipt-runtimesettings-pdfRasterDPI">PDFRasterDPI</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="3" factor="100" />
                                    <input id="ipt-runtimesettings-pdfRasterDPI" onKeyUp={this.updateRange} type="knumber" min="100" max="1000" step="1" defaultValue="300" factor="100" />

                                    <label htmlFor="ipt-runtimesettings-deblurLevel">DeblurLevel</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="9" factor="1" />
                                    <input id="ipt-runtimesettings-deblurLevel" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="9" factor="1" />

                                    <label htmlFor="ipt-runtimesettings-minBarcodeTextLength">MinBarcodeTextLength</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="200" step="1" defaultValue="0" factor="1" />
                                    <input id="ipt-runtimesettings-minBarcodeTextLength" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />

                                    <label htmlFor="ipt-runtimesettings-minResultConfidence">MinResultConfidence</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="100" step="1" defaultValue="0" factor="1" />
                                    <input id="ipt-runtimesettings-minResultConfidence" onKeyUp={this.updateRange} type="knumber" min="0" max="100" step="1" defaultValue="0" factor="1" />
                                    <div className="div-runtimesettings-region-container" style={{ width: '100%' }}>
                                        <label htmlFor="ipt-runtimesettings-region" original-title="">Region</label>
                                        <label original-title="" style={{ width: '100%', textAlign: 'center' }}>
                                            <input type="checkbox" id="ipt-runtimesettings-regionMeasuredByPercentage" defaultChecked={false} onClick={this.usePercentageOrNot} />By Percentage
                                    </label>
                                        <input type="kPercentage" id="ipt-runtimesettings-regionTop" className="ipt-runtimesettings-regionTop" placeholder="top(%)" />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionLeft" className="ipt-runtimesettings-regionLeft" placeholder="left(%)" />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionRight" className="ipt-runtimesettings-regionRight" placeholder="right(%)" />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionBottom" className="ipt-runtimesettings-regionBottom" placeholder="bottom(%)" />
                                    </div>
                                </Card>
                                <Button style={{ padding: "1vw", marginTop: "1vw", width: '100%' }} variant="outline-success" onClick={this.updateRuntimeSettings}>Update Runtime SettingsSample</Button>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} >
                                    <Card.Title style={{ width: '100%' }}>More SettingsSample</Card.Title>

                                    <label htmlFor="ipt-runtimesettings-barcodeFormatIds_2">Barcode Format Ids Group 2</label>
                                    <input id="ipt-runtimesettings-barcodeFormatIds_2" onChange={this.updateBarcodeFormatsCheckStatus2} type="knumber" defaultValue="32505856" factor="1" min="0" />
                                    <Card className="paddingOneVW allWidth">
                                        <label original-title="">
                                            <input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0" defaultChecked={false} id="null-barcodeFormatIds_2" />null</label>
                                        <label original-title="">
                                            <input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="1" className="ipt-barcodeFormat-combo2" defaultChecked={true} />NonStandard</label>
                                        <div className="div-PostalCodeFormat">
                                            <label original-title="<img src='img/PostalCode.png'>">
                                                <input type="checkbox" onClick={this.barcodeFormatsUpdate2} className="ipt-barcodeFormat-combo2" defaultValue="0x01F00000" defaultChecked={true} id="ipt-PostalCodeFormat" />Postal Codes</label>
                                            <Button variant="Light" id="btn-togglePostalCodes" className="btn-toggle" onClick={this.toggleShowPostalCodeItems}></Button>
                                        </div>
                                        <Card id="div-PostalCodeFormatContainer" className="div-1dFormatContainer" style={this.state.setUpState.showPostalCodeItems ? style.show : style.hide}>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x100000" className="ipt-barcodeFormat2" defaultChecked={true} />USPS Intelligent Mail</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x200000" className="ipt-barcodeFormat2" defaultChecked={true} />PostNet</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x400000" className="ipt-barcodeFormat2" defaultChecked={true} />Planet</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x800000" className="ipt-barcodeFormat2" defaultChecked={true} />Australian Post</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x1000000" className="ipt-barcodeFormat2" defaultChecked={true} />UK Royal Mail</label>
                                        </Card>
                                    </Card>
                                    <label htmlFor="ipt-runtimesettings-returnBarcodeZoneClarity">ReturnBarcodeZoneClarity</label>
                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1" step="1" defaultValue="0" factor="1" />
                                    <input id="ipt-runtimesettings-returnBarcodeZoneClarity" onKeyUp={this.updateRange} type="knumber" min="0" max="1" step="1" defaultValue="0" factor="1" />

                                    <label htmlFor="resultCoordinateType">ResultCoordinateType</label>
                                    <select id="resultCoordinateType_1">
                                        <option value="1">Pixel</option>
                                        <option value="2">Percentage</option>
                                    </select>

                                    <label htmlFor="ipt-runtimesettings-intermediateResultSavingMode">IntermediateResultSavingMode</label>
                                    <select id="intermediateResultSavingMode_1" onChange={this.selectionChanged}>
                                        <option value="1">Memory</option>
                                        <option value="2">FileSystem</option>
                                        <option value="4">Both</option>
                                    </select>
                                    <Card className="paddingOneVW allWidth" style={this.state.mAS.irsm[1] ? style.show : style.hide}>
                                        <div style={this.state.mAS.irsm[1] ? style.show : style.hide}>
                                            <label htmlFor="ipt-runtimesettings-irsm-rss" className="sixTenths" original-title="">Recordset Size</label>
                                            <input type="range" onChange={this.updateRangeValue} min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                            <input data-id="SMA-IntermediateResultSavingMode-0-RecordsetSizeOfLatestImages" onKeyUp={this.updateRange} type="knumber" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                        </div>
                                        <div style={this.state.mAS.irsm[1] ? style.show : style.hide}>
                                            <input type="text" style={{ width: '100%' }} defaultValue="D:\" data-id="SMA-IntermediateResultSavingMode-0-FolderPath" />
                                        </div>
                                        <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                    </Card>
                                    <label htmlFor="ipt-runtimesettings-intermediateResultTypes">IntermediateResultTypes (check below)</label>
                                    <input id="ipt-runtimesettings-intermediateResultTypes" onChange={this.updateIntermediateResultTypes} type="knumber" defaultValue="0" factor="1" />
                                    <Card style={{ padding: '1vw', marginTop: '1vw', width: '100%' }}>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="1" onClick={this.IRTClicked} defaultChecked={false} />ORIGINAL_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="2" onClick={this.IRTClicked} defaultChecked={false} />COLOUR_CLUSTERED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="4" onClick={this.IRTClicked} defaultChecked={false} />COLOUR_CONVERTED_GRAYSCALE_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="8" onClick={this.IRTClicked} defaultChecked={false} />TRANSFORMED_GRAYSCALE_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x10" onClick={this.IRTClicked} defaultChecked={false} />PREDETECTED_REGION</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x20" onClick={this.IRTClicked} defaultChecked={false} />PREPROCESSED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x40" onClick={this.IRTClicked} defaultChecked={false} />BINARIZED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x80" onClick={this.IRTClicked} defaultChecked={false} />TEXT_ZONE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x100" onClick={this.IRTClicked} defaultChecked={false} />CONTOUR</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x200" onClick={this.IRTClicked} defaultChecked={false} />LINE_SEGMENT</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x400" onClick={this.IRTClicked} defaultChecked={false} />FORM</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x800" onClick={this.IRTClicked} defaultChecked={false} />SEGMENTATION_BLOCK</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x1000" onClick={this.IRTClicked} defaultChecked={false} />TYPED_BARCODE_ZONE</label>
                                    </Card>

                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-binarizationModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>binarizationModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="binarizationModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Button variant="Light" className="btn-toggle" data-cardclass="SMA-BinarizationModes-SMA-Card_0" onClick={this.showArguments} style={this.state.mAS.bm[0] ? style.visible : style.hidden} title="Show Arguments"></Button>
                                            <Card className="SMA-BinarizationModes-SMA-Card_0 div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={{ display: "none" }}>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-0-BlockSizeX" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-0-BlockSizeX" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-0-BlockSizeY" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-0-BlockSizeY" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-0-EnableFillBinaryVacancy" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="SMA-BinarizationModes-0-EnableFillBinaryVacancy" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-0-ImagePreprocessingModesIndex" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-0-ImagePreprocessingModesIndex" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="SMA-BinarizationModes-0-ThreshValueCoefficient" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-0-ThreshValueCoefficient" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Button variant="Light" className="btn-toggle" data-cardclass="SMA-BinarizationModes-SMA-Card_1" onClick={this.showArguments} style={this.state.mAS.bm[1] ? style.visible : style.hidden} title="Show Arguments"></Button>

                                        </div>
                                        <div>
                                            <select id="binarizationModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeX_3" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-2-BlockSizeX" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeY_3" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-2-BlockSizeY" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-EnableFillBinaryVacancy_3" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="SMA-BinarizationModes-2-EnableFillBinaryVacancy" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-imagePreprocessingModesIndex_3" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-2-ImagePreprocessingModesIndex" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="ipt-runtimesettings-ThreshValueCoefficient_3" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-2-ThreshValueCoefficient" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeX_4" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-3-BlockSizeX" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeY_4" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-3-BlockSizeY" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-EnableFillBinaryVacancy_4" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="SMA-BinarizationModes-3-EnableFillBinaryVacancy" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-imagePreprocessingModesIndex_4" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-3-ImagePreprocessingModesIndex" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="ipt-runtimesettings-ThreshValueCoefficient_4" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-3-ThreshValueCoefficient" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-4-BlockSizeX" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-4-BlockSizeX" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-4-BlockSizeY" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-4-BlockSizeY" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-4-EnableFillBinaryVacancy" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="SMA-BinarizationModes-4-EnableFillBinaryVacancy" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="SMA-BinarizationModes-4-ImagePreprocessingModesIndex" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-4-ImagePreprocessingModesIndex" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="SMA-BinarizationModes-4-ThreshValueCoefficient" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="SMA-BinarizationModes-4-ThreshValueCoefficient" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeX_6" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeX_6" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeY_6" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeY_6" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-EnableFillBinaryVacancy_6" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="ipt-runtimesettings-EnableFillBinaryVacancy_6" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-imagePreprocessingModesIndex_6" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-imagePreprocessingModesIndex_6" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="ipt-runtimesettings-ThreshValueCoefficient_6" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ThreshValueCoefficient_6" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeX_7" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeX_7" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeY_7" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeY_7" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-EnableFillBinaryVacancy_7" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="ipt-runtimesettings-EnableFillBinaryVacancy_7" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-imagePreprocessingModesIndex_7" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-imagePreprocessingModesIndex_7" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="ipt-runtimesettings-ThreshValueCoefficient_7" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ThreshValueCoefficient_7" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="binarizationModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="2">LocalBlock</option>
                                            </select>
                                            <Card className="div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeX_8" original-title="">BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeX_8" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlockSizeY_8" original-title="">BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="3" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlockSizeY_8" onKeyUp={this.updateRange} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-EnableFillBinaryVacancy_8" original-title="">EnableFillBinaryVacancy</label>
                                                    <input data-id="ipt-runtimesettings-EnableFillBinaryVacancy_8" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-imagePreprocessingModesIndex_8" original-title="">imagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-imagePreprocessingModesIndex_8" onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div><label htmlFor="ipt-runtimesettings-ThreshValueCoefficient_8" original-title="">ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ThreshValueCoefficient_8" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-localizationModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>localizationModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div><select id="localizationModes_1" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[0] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_2" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[1] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_3" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[2] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_4" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[3] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_5" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[4] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_6" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[5] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_7" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[6] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="localizationModes_8" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="2">ConnectedBlocks</option>
                                            <option value="4">Statistics</option>
                                            <option value="8">Lines</option>
                                            <option value="16">ScanDirectly</option>
                                            <option value="32">StatisticsMarks</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.lm[7] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-ScanStride">ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ScanStride" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-scaleUpModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>scaleUpModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="scaleUpModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="scaleUpModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.sum[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-AcuteAngleWithXThreshold">AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-AcuteAngleWithXThreshold" onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-ModuleSizeThreshold">ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-ModuleSizeThreshold" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-TargetModuleSize">TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-TargetModuleSize" onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textResultOrderModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>textResultOrderModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="textResultOrderModes_1">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_2">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_3">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_4">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_5">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div><select id="textResultOrderModes_6">
                                            <option value="0">Skip</option>
                                            <option value="1">Confidence</option>
                                            <option value="2">Position</option>
                                            <option value="4">Format</option>
                                        </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_7">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="textResultOrderModes_8">
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                    </div>
                                </Card>
                                <Button style={{ padding: "1vw", marginTop: "1vw", width: '100%' }} variant="outline-success" onClick={this.updateRuntimeSettings}>Update Runtime SettingsSample</Button>
                            </div>
                            <div className="div-advanceSettingsHeader" style={{ height: "auto", borderTop: "1px solid #dee2e6" }}>
                                <h4 htmlFor="ipt-runtimesettings-FurtherModes">Further Modes</h4>
                                <button className="btn-toggle" onClick={this.toggleShowFurtherModesItems}></button>
                            </div>
                            <div className="div-advanceSettings div-runtimesettings-details-container" style={this.state.setUpState.showFurtherModesItems ? style.show : style.hide}>
                                <Card style={{ padding: '1vw', marginTop: '1vw', display: 'none'/** JS not supported yet */ }} id="div-runtimesettings-accompanyingTextRecognitionModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>accompanyingTextRecognitionModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="accompanyingTextRecognitionModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="accompanyingTextRecognitionModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="accompanyingTextRecognitionModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="accompanyingTextRecognitionModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="accompanyingTextRecognitionModes_5" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="accompanyingTextRecognitionModes_6" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="accompanyingTextRecognitionModes_7" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="accompanyingTextRecognitionModes_8" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.atrm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionLeft" original-title="">RegionLeft</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionLeft" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionTop" original-title="">RegionTop</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionTop" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionRight" original-title="">RegionRight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionRight" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RegionBottom" original-title="">RegionBottom</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="0" />
                                                    <input data-id="ipt-runtimesettings-RegionBottom" onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="0" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-barcodeColourModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>barcodeColourModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="barcodeColourModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[0] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[1] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[2] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[3] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[4] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[5] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[6] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="barcodeColourModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.bcm[7] ? style.show : style.hide}>
                                                <div><label htmlFor="ipt-runtimesettings-LightReflection">LightReflection</label>
                                                    <input data-id="ipt-runtimesettings-LightReflection" type="checkbox" defaultChecked={true} />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-barcodeComplementModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>barcodeComplementModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div><select id="barcodeComplementModes_1">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_2">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_3">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_4">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_5">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_6">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_7">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="barcodeComplementModes_8">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-colourClusteringModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>colourClusteringModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="colourClusteringModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="colourClusteringModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.cclm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-cclm-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-cclm-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-colourConversionModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>colourConversionModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="colourConversionModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="colourConversionModes_2" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="colourConversionModes_3" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="colourConversionModes_4" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div><select id="colourConversionModes_5" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="colourConversionModes_6" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="colourConversionModes_7" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div><div><select id="colourConversionModes_8" onChange={this.selectionChanged}>
                                            <option value="0">Skip</option>
                                            <option value="1">General</option>
                                        </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ccom[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-BlueChannelWeight" original-title="">BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-BlueChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-GreenChannelWeight" original-title="">GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-GreenChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-RedChannelWeight" original-title="">RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-RedChannelWeight" onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-dpmCodeReadingModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>dpmCodeReadingModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div><select id="dpmCodeReadingModes_1">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_2">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_3">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_4">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_5">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_6">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_7">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                        <div><select id="dpmCodeReadingModes_8">
                                            <option value="0">Skip</option>
                                            <option value="1">Auto</option>
                                            <option value="2">General</option>
                                        </select></div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-deformationResistingModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>deformationResistingModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="deformationResistingModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="deformationResistingModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.drm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-drm-level">Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-drm-level" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-grayscaleTransformationModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>grayscaleTransformationModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div><select id="grayscaleTransformationModes_1">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_2">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_3">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_4">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_5">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_6">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_7">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                        <div><select id="grayscaleTransformationModes_8">
                                            <option value="0">Skip</option>
                                            <option value="1">Inverted</option>
                                            <option value="2">Original</option>
                                        </select></div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-imagePreprocessingModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>imagePreprocessingModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="imagePreprocessingModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[0] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[0] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[0] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[1] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[1] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[1] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[2] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[2] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[2] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[3] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[3] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[3] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[4] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[4] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[4] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[5] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[5] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[5] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[6] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[6] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[6] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="imagePreprocessingModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[7] === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[7] === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeX">SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SharpenBlockSizeY">SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.ipm[7] > 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeX">SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-SmoothBlockSizeY">SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id="ipt-runtimesettings-SmoothBlockSizeX" type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-regionPredetectionModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>regionPredetectionModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="regionPredetectionModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="regionPredetectionModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.rpm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="262144" max="2147483647" step="1" defaultValue="2621445" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="262144" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textFilterModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>textFilterModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="textFilterModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textFilterModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tfm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-MinImageDimension">MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id="ipt-runtimesettings-MinImageDimension" onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textureDetectionModes-container" className=" div-runtimesettings-mode-container">
                                    <Card.Title style={{ width: '100%' }}>textureDetectionModes</Card.Title>
                                    <div className="div-algsContainer">
                                        <div>
                                            <select id="textureDetectionModes_1" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[0] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_2" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[1] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_3" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[2] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_4" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[3] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_5" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[4] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_6" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[5] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_7" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[6] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                        <div>
                                            <select id="textureDetectionModes_8" onChange={this.selectionChanged}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tdm[7] ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor="ipt-runtimesettings-Sensitivity">Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="10" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id="ipt-runtimesettings-Sensitivity" onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ padding: '1vw', marginTop: '1vw' }} className="div-runtimeSettings-textassistedcorrectionmode-container">
                                    <Card.Title style={{ width: '100%' }}>textAssistedCorrectionMode</Card.Title>
                                    <select id="textAssistedCorrectionMode_1" onChange={this.selectionChanged}>
                                        <option value="0">Skip</option>
                                        <option value="1">Auto</option>
                                        <option value="2">Verifying</option>
                                        <option value="4">VerifyingPatching</option>
                                    </select>
                                    <Card className=" div-runtimesettings-details-container paddingOneVW" style={this.state.mAS.tacm ? style.show : style.hide}>
                                        <div>
                                            <label htmlFor="ipt-runtimesettings-BottomTextPercentageSize">BottomTextPercentageSize</label>
                                            <input type="range" onChange={this.updateRangeValue} min="0" max="255" step="1" defaultValue="0" factor="1" />
                                            <input data-id="ipt-runtimesettings-BottomTextPercentageSize" onKeyUp={this.updateRange} type="knumber" min="0" max="255" step="1" defaultValue="0" factor="1" />
                                        </div>
                                        <div>
                                            <label htmlFor="ipt-runtimesettings-LeftTextPercentageSize">LeftTextPercentageSize</label>
                                            <input type="range" onChange={this.updateRangeValue} min="0" max="255" step="1" defaultValue="0" factor="1" />
                                            <input
                                                data-id="ipt-runtimesettings-LeftTextPercentageSize" onKeyUp={this.updateRange} type="knumber" min="0" max="255" step="1" defaultValue="0" factor="1" />
                                        </div>
                                        <div>
                                            <label htmlFor="ipt-runtimesettings-RightTextPercentageSize">RightTextPercentageSize</label>
                                            <input type="range" onChange={this.updateRangeValue} min="0" max="255" step="1" defaultValue="0" factor="1" />
                                            <input data-id="ipt-runtimesettings-RightTextPercentageSize" onKeyUp={this.updateRange} type="knumber" min="0" max="255" step="1" defaultValue="0" factor="1" />
                                        </div>
                                        <div>
                                            <label htmlFor="ipt-runtimesettings-TopTextPercentageSize">TopTextPercentageSize</label>
                                            <input type="range" onChange={this.updateRangeValue} min="0" max="255" step="1" defaultValue="0" factor="1" />
                                            <input data-id="ipt-runtimesettings-TopTextPercentageSize" onKeyUp={this.updateRange} type="knumber" min="0" max="255" step="1" defaultValue="0" factor="1" />
                                        </div>
                                        <Button style={{ width: '100%' }} variant="outline-success" onClick={this.setModeArguments}>Set Mode Arguments</Button>
                                    </Card>
                                </Card>
                                <Button style={{ padding: "1vw", marginTop: "1vw", width: '100%' }} variant="outline-success" onClick={this.updateRuntimeSettings}>Update Runtime SettingsSample</Button>
                            </div >
                        </div >)
                );
            default:
                return "";
        }
    }
    setDecodeState = bStart => {
        this.setState(state => {
            state.bDecoding = bStart;
            return state;
        })
    }
    handleClose = () => {
        this.setState(state => {
            state.bShowModalDialog = false;
            state.setUpState = {
                showOneDItems: false,
                showDataBarItems: false,
                showPostalCodeItems: false,
                showFurtherModesItems: false
            };
            //Mode Mode Arguments Status
            state.mAS = {
                atrm: [false, false, false, false, false, false, false, false],
                bcm: [false, false, false, false, false, false, false, false],
                bm: [false, false, false, false, false, false, false, false],
                cclm: [false, false, false, false, false, false, false, false],
                ccom: [false, false, false, false, false, false, false, false],
                drm: [false, false, false, false, false, false, false, false],
                ipm: [0, 0, 0, 0, 0, 0, 0, 0],
                irsm: [true, false],
                lm: [false, false, false, false, false, false, false, false],
                rpm: [false, false, false, false, false, false, false, false],
                sum: [false, false, false, false, false, false, false, false],
                tacm: false,
                tfm: [false, false, false, false, false, false, false, false],
                tdm: [false, false, false, false, false, false, false, false]
            };
            return state;
        });
    }
    showDetails = () => {
        this.setState(state => {
            state.bShowModalDialog = true;
            state.modalTitle = "Detailed Results";
            return state;
        });
    }
    setUpRuntimeSettings = async () => {
        this.setState({
            bInitializing: !!!this.reader,
            modalTitle: "Set Up",
            bShowModalDialog: true
        });
        this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        this.setState({
            bInitializing: !!!this.reader
        });
        this.showCurrentSettings();
    }
    showRuntimeSettings = async () => {
        this.setState({
            bInitializing: !!!this.reader,
            modalTitle: "Runtime SettingsSample",
            bShowModalDialog: true
        });
        let reader = this.reader = this.reader || await DBR.BarcodeReader.createInstance();
        let runtimeSettings = JSON.stringify(await reader.getRuntimeSettings(), null, 5);
        let runtimeSettings_str = "";
        if (this.props.fullFeature)
            runtimeSettings_str = await reader.outputSettingsToString();
        this.setState(state => {
            state.bInitializing = false;
            state.runtimeSettingsString = runtimeSettings_str;
            state.runtimeSettings.length = 0;
            let settings = runtimeSettings.split('     ');
            let layerCount = 0;
            for (let i = 0; i < settings.length; i++) {
                if (settings[i].trim() === "")
                    i++;
                if (settings[i].indexOf("[") > -1) {
                    let arrayValue = settings[i];
                    do {
                        i++;
                        arrayValue += settings[i]
                    } while (settings[i].indexOf("]") < 0)
                    state.runtimeSettings.push(['_' + layerCount, arrayValue]);
                } else {
                    if (settings[i].indexOf("}") === 0) {
                        state.runtimeSettings.push(['_' + (layerCount - 1), settings[i]]);
                    } else {
                        state.runtimeSettings.push(['_' + layerCount, settings[i]]);
                    }
                }
                if (settings[i].indexOf("{") > -1)
                    layerCount++;
                if (settings[i].indexOf("}") > -1) {
                    layerCount--;
                    if (layerCount === 0 && settings[i].indexOf("}") === settings[i].length - 1) {
                        let lastRBrace = state.runtimeSettings.pop();
                        lastRBrace = lastRBrace[1];
                        state.runtimeSettings.push(['_' + (layerCount + 1), (lastRBrace.substr(0, lastRBrace.length - 1))]);
                        state.runtimeSettings.push(['_' + layerCount, "}"]);
                    }
                }
            }
            return state;
        });
    }
    appendAMessage = str => {
        this.setState(state => {
            state.messages.push(str);
            if (state.messages.length > 500) {
                ++state.messageKeyBase;
                state.messages.splice(0, 1);
            }
            return state;
        });
    }
    appendDetails = (str, bImportant) => {
        this.setState(state => {
            if (str.indexOf(":") !== -1) {
                let _values = str.split(":");
                state.detailTitles.push(_values[0] + " : ");
                state.detailContent.push(_values[1]);
            } else if (bImportant) {
                state.detailTitles.push("");
                state.detailContent.push(str);
            } else {
                state.detailTitles.push(str);
                state.detailContent.push("");
            }
            return state;
        })
    }
    emptyMessages = () => {
        this.setState({
            messages: [],
            detailContent: [],
            detailTitles: []
        })
    }
}

const style = {
    div_message: {
        resize: "both",
        width: "98vw",
        margin: "0 auto"
    },
    hide: {
        display: "none"
    },
    show: {
        display: "block"
    },
    visible: {
        visibility: "visible"
    },
    hidden: {
        visibility: "hidden"
    }
}
export default BarcodeReader;
