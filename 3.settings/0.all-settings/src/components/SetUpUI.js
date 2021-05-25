
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SetUpUI.css'
import { Modal, Card, Button } from 'react-bootstrap';

class SetUpUI extends React.Component {
    /* Updated for 8.2 of DBR JS */
    constructor(props) {
        super(props);
        this.messageKeyBase = 300000;
        this.allBarcodesFormats = 4263510015;//-31457281;
        this.allBarcodesFormats_2 = 32505859;

        this.state = {
            showOneDItems: false,
            showDataBarItems: false,
            showPostalCodeItems: false,
            showFurtherModesItems: false
        };
    }
    usePredefinedSettings = async evt => {
        if (evt && evt.target && evt.target.getAttribute("modename")) {
            let modeName = evt.target.getAttribute("modename");
            this.props.updateRuntimeSettings(modeName);
        }
    }
    toggleShowOneDItems = () => {
        this.setState(prevState => ({ showOneDItems: !prevState.showOneDItems }));
    }
    toggleShowDataBarItems = () => {
        this.setState(prevState => ({ showDataBarItems: !prevState.showDataBarItems }));
    }
    toggleShowPostalCodeItems = () => {
        this.setState(prevState => ({ showPostalCodeItems: !prevState.showPostalCodeItems }));
    }
    toggleShowFurtherModesItems = () => {
        this.setState(prevState => ({ showFurtherModesItems: !prevState.showFurtherModesItems }));
    }
    removeRegion = evt => {
        if (this.props.runtimeSettings.region.length && this.props.runtimeSettings.region.length > 1) {
            let newRTS = this.props.runtimeSettings;
            newRTS.region.pop();
            this.props.updateRuntimeSettings(newRTS);
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
            nBarcodeFormatIds = (this.allBarcodesFormats - parseInt(evt.target.value)) & nBarcodeFormatIds;
        this.updateBarcodeFormatsCheckStatus(nBarcodeFormatIds);
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
            nBarcodeFormatIds = (this.allBarcodesFormats_2 - parseInt(evt.target.value)) & nBarcodeFormatIds;
        if (parseInt(evt.target.value) === 0) {
            if (evt.target.checked)
                nBarcodeFormatIds = 0;
            else
                nBarcodeFormatIds = this.allBarcodesFormats_2;
        }
        this.updateBarcodeFormatsCheckStatus2(nBarcodeFormatIds);
    }
    updateBarcodeFormatsCheckStatus = nBarcodeFormatIds => {
        if (typeof (nBarcodeFormatIds) != "number") {
            if (nBarcodeFormatIds.target) {
                var reg = /^\d+$/;
                let evt = nBarcodeFormatIds;
                if (evt.target.value === "-")
                    nBarcodeFormatIds = 0;
                else {
                    if (!reg.test(Math.abs(evt.target.value)))
                        evt.target.value = evt.target.getAttribute('value');
                    nBarcodeFormatIds = parseInt(evt.target.value);
                }
            } else {
                return;
            }
        } else {
            document.getElementById("ipt-runtimesettings-barcodeFormatIds").value = nBarcodeFormatIds;
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
        for (let i = 0; i < barcodeFormatInputs.length; i++) {
            let barcodeFormatInput = barcodeFormatInputs[i];
            barcodeFormatInput.checked = false;
            if (nBarcodeFormatIds & parseInt(barcodeFormatInput.value))
                barcodeFormatInput.checked = true;
        }
        let newRTS = this.props.runtimeSettings;
        newRTS.barcodeFormatIds = nBarcodeFormatIds;
        this.props.updateRuntimeSettings(newRTS);
    }
    updateBarcodeFormatsCheckStatus2 = nBarcodeFormatIds => {
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
        let newRTS = this.props.runtimeSettings;
        newRTS.barcodeFormatIds_2 = nBarcodeFormatIds;
        this.props.updateRuntimeSettings(newRTS);
    }
    intermediateResultTypesUpdate = evt => {
        let elToUpdate = document.getElementById('ipt-runtimesettings-intermediateResultTypes');
        if (evt.target.getAttribute('id') !== "ipt-runtimesettings-intermediateResultTypes") {
            if (evt.target.checked)
                elToUpdate.value = parseInt(elToUpdate.value) + parseInt(evt.target.value);
            else
                elToUpdate.value = parseInt(elToUpdate.value) - parseInt(evt.target.value);
        } else {
            let intermediateResultTypesInputs = document.querySelectorAll('.ipt-updateIntermediateResultTypes');
            for (let i = 0; i < intermediateResultTypesInputs.length; i++) {
                let intermediateResultTypesInput = intermediateResultTypesInputs[i];
                intermediateResultTypesInput.checked = elToUpdate.value & parseInt(intermediateResultTypesInput.value);
            }
        }
        let newRTS = this.props.runtimeSettings;
        newRTS.intermediateResultTypes = parseInt(elToUpdate.value);
        this.props.updateRuntimeSettings(newRTS);
    }
    usePercentageOrNot = async evt => {
        let checkBox = evt.target;
        let reg = /^\d+$/;
        let parentElement = checkBox.parentElement;
        let regionParams = [];
        regionParams.push(parentElement.nextSibling);
        regionParams.push(parentElement.nextSibling.nextSibling);
        regionParams.push(parentElement.nextSibling.nextSibling.nextSibling);
        regionParams.push(parentElement.nextSibling.nextSibling.nextSibling.nextSibling);
        if (checkBox.checked) {
            for (let param of regionParams) {
                if (param.getAttribute("placeholder").indexOf("%") === -1)
                    param.placeholder = param.getAttribute("placeholder") + "(%)";
                if (reg.test(param.value)) { // Confirming it is a positive number
                    if (parseInt(param.value) > 100)
                        param.value = 100;
                } else { // If not a number, set it to 0
                    param.value = param.value === "" ? "" : 0;
                }
            }
        } else {
            for (let param of regionParams) {
                if (param.getAttribute("placeholder").indexOf("%") !== -1)
                    param.placeholder = param.getAttribute("placeholder").substr(0, param.getAttribute("placeholder").length - 3);
                if (reg.test(param.value)) { // Confirming it is a positive number
                    if (parseInt(param.value) > 10000)
                        param.value = 10000;
                } else { // If not a number, set it to 0
                    param.value = param.value === "" ? "" : 0;
                }
            }
        }
    }
    updateRangeValue = evt => {
        evt.target.nextSibling.value = parseInt(evt.target.value) * parseInt(evt.target.getAttribute('factor'));
        if (evt.target.getAttribute('data-type') === "setting")
            this.updateSettings();
    }
    updateRange = evt => {
        var reg = /^\d+$/;
        if (!reg.test(evt.target.value))
            evt.target.value = evt.target.getAttribute('value');
        if (evt.target.value > parseInt(evt.target.getAttribute('max')))
            evt.target.value = evt.target.getAttribute('max');
        evt.target.previousSibling.value = parseInt(parseInt(evt.target.value) / parseInt(evt.target.getAttribute('factor')));
        if (evt.target.getAttribute('data-type') === "setting")
            this.updateSettings();
    }
    updateSettings = () => {
        let RTS = this.props.runtimeSettings;
        let allInputs = document.querySelectorAll('input');
        let allSelects = document.querySelectorAll('select');
        let _regionItems = [];
        for (let _key in allInputs) {
            if (allInputs.hasOwnProperty(_key)) {
                let _setting = allInputs[_key];
                let _settingID = "", _value = 0;
                if (_setting.getAttribute && (_settingID = _setting.getAttribute('id'))) {
                    if (_settingID.indexOf('ipt-runtimesettings-') !== -1) {
                        let _item = _settingID.substr(_settingID.lastIndexOf("-") + 1)
                        if (_setting.value === "")
                            _value = 0;
                        else
                            _value = parseInt(_setting.value);
                        if (_item.indexOf('region') !== -1) {
                            let keys = _item.split("_");
                            if (keys[0] === "regionMeasuredByPercentage")
                                _value = _setting.checked ? 1 : 0;
                            _regionItems.push({ key: keys[0], index: keys[1] - 1, value: _value });
                        } else {
                            RTS[_item] = parseInt(_value);
                        }
                    }
                }
            }
        }
        let _regions = new Array(parseInt(_regionItems.length / 5));
        for (let j = 0; j < _regions.length; j++) {
            _regions[j] = {};
        }
        for (let o of _regionItems) {
            let _region = _regions[o.index];
            _region[o.key] = o.value;
        }
        _regions.length === 1 ? RTS["region"] = _regions[0] : RTS["region"] = _regions;
        for (let _key in allSelects) {
            if (allSelects.hasOwnProperty(_key)) {
                let _setting = allSelects[_key];
                let _value = parseInt(_setting.value);
                let _settingID = "";
                if (_setting.getAttribute && (_settingID = _setting.getAttribute('id'))) {
                    if (_settingID.indexOf("_") !== -1) {
                        let subIDs = _settingID.split("_");
                        switch (subIDs[0]) {
                            // case "intermediateResultSavingMode":
                            case "terminatePhase":
                            case "pdfReadingMode":
                            case "resultCoordinateType":
                                //case "textAssistedCorrectionMode":
                                RTS[subIDs[0]] = _value;
                                break;

                            case "binarizationModes":
                            case "deblurModes":
                            case "localizationModes":
                            case "scaleUpModes":
                            case "textResultOrderModes":
                                RTS[subIDs[0]][parseInt(subIDs[1]) - 1] = _value;
                                break;
                            //case "accompanyingTextRecognitionModes":
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
                                RTS.furtherModes[subIDs[0]][parseInt(subIDs[1]) - 1] = _value;
                                break;
                            default: break;
                        }
                    }
                }
            }
        }
        this.props.updateRuntimeSettings(RTS);
    }
    getModeArgument = async (evt) => {
        try {
            if (evt && evt.target && evt.target.parentElement && evt.target.parentElement.children) {
                let sMAElements = evt.target.parentElement.children;
                for (let _ele in sMAElements) {
                    if (sMAElements[_ele].tagName && sMAElements[_ele].tagName.toLowerCase() === "div" && sMAElements[_ele].lastChild.tagName && sMAElements[_ele].lastChild.tagName.toLowerCase() === "input") {
                        let _input = sMAElements[_ele].lastChild, value = null;
                        let arg = await this.props.getModeArgument(_input.getAttribute("data-id").split("-").slice(1).concat([value]));
                        if (arg !== "error") {
                            _input.value = parseInt(arg);
                            _input.previousSibling.value = parseInt(arg);
                        }
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    setModeArguments = async (evt) => {
        try {
            if (evt && evt.target && evt.target.parentElement && evt.target.parentElement.children) {
                let sMAElements = evt.target.parentElement.children;
                for (let _ele in sMAElements) {
                    if (sMAElements[_ele].tagName && sMAElements[_ele].tagName.toLowerCase() === "div" && sMAElements[_ele].lastChild.tagName && sMAElements[_ele].lastChild.tagName.toLowerCase() === "input") {
                        let _input = sMAElements[_ele].lastChild;
                        this.props.setModeArgument(_input.getAttribute("data-id").split("-").slice(1).concat([_input.value]));
                    }
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    render() {
        return (
            //Why animation={false}: https://github.com/react-bootstrap/react-bootstrap/issues/5075
            <Modal show={true} onHide={() => { this.props.toggleHideModal(false) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"overFlowX noPadding"}>
                    <div id="div-settingsModule" key={this.props.RTSUpdatedCount} className="div-settingsModule">
                        <div className="div-advanceSettingsHeader">
                            <a title="Check Documentation" href="https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/global-interfaces.html?ver=latest#runtimesettings" target="_blank" rel="noopener noreferrer" original-title="document">
                                <svg width="16" height="16" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path fill="#fe8e14" d="M1703 478q40 57 18 129l-275 906q-19 64-76.5 107.5t-122.5 43.5h-923q-77 0-148.5-53.5t-99.5-131.5q-24-67-2-127 0-4 3-27t4-37q1-8-3-21.5t-3-19.5q2-11 8-21t16.5-23.5 16.5-23.5q23-38 45-91.5t30-91.5q3-10 .5-30t-.5-28q3-11 17-28t17-23q21-36 42-92t25-90q1-9-2.5-32t.5-28q4-13 22-30.5t22-22.5q19-26 42.5-84.5t27.5-96.5q1-8-3-25.5t-2-26.5q2-8 9-18t18-23 17-21q8-12 16.5-30.5t15-35 16-36 19.5-32 26.5-23.5 36-11.5 47.5 5.5l-1 3q38-9 51-9h761q74 0 114 56t18 130l-274 906q-36 119-71.5 153.5t-128.5 34.5h-869q-27 0-38 15-11 16-1 43 24 70 144 70h923q29 0 56-15.5t35-41.5l300-987q7-22 5-57 38 15 59 43zm-1064 2q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5zm-83 256q-4 13 2 22.5t20 9.5h608q13 0 25.5-9.5t16.5-22.5l21-64q4-13-2-22.5t-20-9.5h-608q-13 0-25.5 9.5t-16.5 22.5z"></path></svg>
                            </a>
                        </div>
                        <div style={{ textAlign: "center", paddingTop: "1vw" }}>
                            <p>Use A Built-in Template</p>
                            <Button variant="secondary" style={{ width: "30%", marginRight: "2%" }} modename="speed" onClick={this.usePredefinedSettings}>Speed</Button>
                            <Button variant="secondary" style={{ width: "30%", marginRight: "2%" }} modename="balance" onClick={this.usePredefinedSettings}>Balance</Button>
                            <Button variant="secondary" style={{ width: "30%" }} modename="coverage" onClick={this.usePredefinedSettings}>Coverage</Button>
                        </div>
                        <div id="div-advanceSettings" className="div-advanceSettings div-runtimesettings-details-container">
                            <Card style={{ padding: '1vw' }} id="div-barcodeFormatContainer" className="div-barcodeFormatContainer">
                                <Card.Title style={{ width: '100%' }}>Choose Formats</Card.Title>
                                <label htmlFor="ipt-runtimesettings-barcodeFormatIds">Barcode Formats</label>
                                <input id="ipt-runtimesettings-barcodeFormatIds" onChange={this.updateBarcodeFormatsCheckStatus} type="knumber" defaultValue={this.props.runtimeSettings.barcodeFormatIds} />
                                <div className="div-1dFormat">
                                    <label><input type="checkbox" className="ipt-barcodeFormat-combo" onClick={this.barcodeFormatsUpdate} defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x001007FF) === 0x001007FF} defaultValue="0x001007FF" id="ipt-1dFormat" />1D</label>
                                    <Button variant="Light" id="btn-toggle1Ds" className="btn-toggle" onClick={this.toggleShowOneDItems} ></Button>
                                </div>
                                <Card id="div-1dFormatContainer" className="div-1dFormatContainer" style={this.state.showOneDItems ? style.show : style.hide}>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="1" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 1) === 1} />CODE 39</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="2" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 2) === 2} />CODE 128</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="4" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 4) === 4} />CODE 93</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="8" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 8) === 8} />CODABAR</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x10) === 0x10} />ITF</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x20) === 0x20} />EAN 13</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x40" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x40) === 0x40} />EAN 8</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x80" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x80) === 0x80} />UPC A</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x100" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x100) === 0x100} />UPC E</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x200" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x200) === 0x200} />INDUSTRIAL 25</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x400" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x400) === 0x400} />CODE 39 EXTENDED</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x100000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x100000) === 0x100000} />MSI Code</label>
                                </Card>

                                <div className="div-GS1DatabarFormat">
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} className="ipt-barcodeFormat-combo" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x0003F800) === 0x0003F800} defaultValue="0x0003F800" id="ipt-GS1DatabarFormat" />GS1 Databar</label>
                                    <Button variant="Light" id="btn-toggleGS1Databars" className="btn-toggle" onClick={this.toggleShowDataBarItems}></Button>
                                </div>
                                <Card id="div-GS1DatabarFormatContainer" className="div-GS1DatabarFormatContainer" style={this.state.showDataBarItems ? style.show : style.hide}>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x800" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x800) === 0x800} />GS1 DATABAR OMNIDIRECTIONAL</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x1000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x1000) === 0x1000} />GS1 DATABAR TRUNCATED</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x2000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x2000) === 0x2000} />GS1 DATABAR STACKED</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x4000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x4000) === 0x4000} />GS1 DATABAR STACKED OMNIDIRECTIONAL</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x8000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x8000) === 0x8000} />GS1 DATABAR EXPANDED</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x10000) === 0x10000} />GS1 DATABAR EXPANDED STACKED</label>
                                    <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x20000) === 0x20000} />GS1 DATABAR LIMITED</label>
                                </Card>

                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x2000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x2000000) === 0x2000000} />PDF 417</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x80000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x80000) === 0x80000} />Micro PDF 417</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x4000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x4000000) === 0x4000000} />QR Code</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x40000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x40000000) === 0x40000000} />Micro QR Code</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x8000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x8000000) === 0x8000000} />DataMatrix</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x10000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x10000000) === 0x10000000} />Aztec Code</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x20000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x20000000) === 0x20000000} />Maxicode</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="0x40000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & 0x40000) === 0x40000} />Patch Code</label>
                                <label><input type="checkbox" onClick={this.barcodeFormatsUpdate} defaultValue="-0x80000000" className="ipt-barcodeFormat" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds & -0x80000000) === -0x80000000} />GS1 COMPOSITE</label>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} >
                                <Card.Title style={{ width: '100%' }}>Basic Settings</Card.Title>
                                <label htmlFor="ipt-runtimesettings-terminatePhase">TerminatePhase</label>
                                <select onChange={this.updateSettings} id="terminatePhase_1" value={this.props.runtimeSettings.terminatePhase}>
                                    <option value="1">Region Predetected</option>
                                    <option value="2">Image Preprocessed</option>
                                    <option value="4">Image Binarized</option>
                                    <option value="8">Barcode Localized</option>
                                    <option value="16">Barcode Type Determind</option>
                                    <option value="32">Barcode Recognized</option>
                                </select>

                                <label htmlFor="ipt-runtimesettings-barcodeZoneMinDistanceToImageBorders">BarcodeZoneMinDistanceToImageBorders</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="1000" step="10" defaultValue={this.props.runtimeSettings.barcodeZoneMinDistanceToImageBorders} factor="1" />
                                <input id="ipt-runtimesettings-barcodeZoneMinDistanceToImageBorders" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="1000" step="10" defaultValue={this.props.runtimeSettings.barcodeZoneMinDistanceToImageBorders} factor="1" />

                                <label htmlFor="ipt-runtimesettings-deblurLevel">DeblurLevel</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue={this.props.runtimeSettings.deblurLevel} factor="1" />
                                <input id="ipt-runtimesettings-deblurLevel" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue={this.props.runtimeSettings.deblurLevel} factor="1" />

                                <label htmlFor="ipt-runtimesettings-expectedBarcodesCount">ExpectedBarcodesCount</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue={this.props.runtimeSettings.expectedBarcodesCount} factor="1" />
                                <input id="ipt-runtimesettings-expectedBarcodesCount" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue={this.props.runtimeSettings.expectedBarcodesCount} factor="1" />

                                <label htmlFor="ipt-runtimesettings-maxAlgorithmThreadCount">MaxAlgorithmThreadCount</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="1" max="4" step="1" defaultValue={this.props.runtimeSettings.maxAlgorithmThreadCount} factor="1" />
                                <input id="ipt-runtimesettings-maxAlgorithmThreadCount" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="1" max="4" step="1" defaultValue={this.props.runtimeSettings.maxAlgorithmThreadCount} factor="1" />

                                <label htmlFor="ipt-runtimesettings-minBarcodeTextLength">MinBarcodeTextLength</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="200" step="1" defaultValue={this.props.runtimeSettings.minBarcodeTextLength} factor="1" />
                                <input id="ipt-runtimesettings-minBarcodeTextLength" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue={this.props.runtimeSettings.minBarcodeTextLength} factor="1" />

                                <label htmlFor="ipt-runtimesettings-minResultConfidence">MinResultConfidence</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="100" step="1" defaultValue={this.props.runtimeSettings.minResultConfidence} factor="1" />
                                <input id="ipt-runtimesettings-minResultConfidence" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="100" step="1" defaultValue={this.props.runtimeSettings.minResultConfidence} factor="1" />

                                <label htmlFor="ipt-runtimesettings-pdfRasterDPI">PDFRasterDPI</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="1" max="5" step="1" defaultValue={parseInt(this.props.runtimeSettings.pdfRasterDPI / 100)} factor="100" />
                                <input id="ipt-runtimesettings-pdfRasterDPI" data-type="setting" onKeyUp={this.updateRange} readOnly type="knumber" min="100" max="500" step="100" defaultValue={this.props.runtimeSettings.pdfRasterDPI} factor="100" />

                                <label htmlFor="ipt-runtimesettings-scaleDownThreshold">ScaleDownThreshold</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="5" max="1000" step="1" defaultValue={this.props.runtimeSettings.scaleDownThreshold / 100} factor="100" />
                                <input id="ipt-runtimesettings-scaleDownThreshold" data-type="setting" onKeyUp={this.updateRange} readOnly type="knumber" min="500" max="100000" step="1" defaultValue={this.props.runtimeSettings.scaleDownThreshold} factor="100" />

                                <label htmlFor="ipt-runtimesettings-timeout">Timeout</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="1" max="100" defaultValue={parseInt(this.props.runtimeSettings.timeout / 1000)} step="1" factor="1000" />
                                <input id="ipt-runtimesettings-timeout" data-type="setting" onKeyUp={this.updateRange} type="knumber" readOnly min="100" max="100000" step="1" defaultValue={this.props.runtimeSettings.timeout} factor="1000" />

                                {this.props.runtimeSettings.region.length > 0 ?
                                    (<>
                                        {this.props.runtimeSettings.region.map((value, key) =>
                                            <div key={this.messageKeyBase + 1600 + key} className="div-runtimesettings-region-container" style={{ width: '100%' }}>
                                                <label>Region {key + 1}  {key !== 0 && key === this.props.runtimeSettings.region.length - 1 ? <Button variant="light" onClick={this.removeRegion}>X</Button> : ""}</label>
                                                <label style={{ width: '100%', textAlign: 'center' }}>
                                                    <input type="checkbox" id={"ipt-runtimesettings-regionMeasuredByPercentage_" + (key + 1).toString()} defaultChecked={value === null ? false : !!value.regionMeasuredByPercentage} onClick={this.usePercentageOrNot} />By Percentage
                                                </label>
                                                <input type="kPercentage" id={"ipt-runtimesettings-regionTop_" + (key + 1).toString()} className="ipt-runtimesettings-regionTop" placeholder={value === null ? "top" : "top(%)"} defaultValue={value === null ? "" : value.regionTop} />
                                                <input type="kPercentage" id={"ipt-runtimesettings-regionLeft_" + (key + 1).toString()} className="ipt-runtimesettings-regionLeft" placeholder={value === null ? "left" : "left(%)"} defaultValue={value === null ? "" : value.regionLeft} />
                                                <input type="kPercentage" id={"ipt-runtimesettings-regionRight_" + (key + 1).toString()} className="ipt-runtimesettings-regionRight" placeholder={value === null ? "right" : "right(%)"} defaultValue={value === null ? "" : value.regionRight} />
                                                <input type="kPercentage" id={"ipt-runtimesettings-regionBottom_" + (key + 1).toString()} className="ipt-runtimesettings-regionBottom" placeholder={value === null ? "bottom" : "bottom(%)"} defaultValue={value === null ? "" : value.regionBottom} />
                                            </div>)}
                                    </>)
                                    :
                                    (<div className="div-runtimesettings-region-container" style={{ width: '100%' }}>
                                        <label>Region</label>
                                        <label style={{ width: '100%', textAlign: 'center' }}>
                                            <input type="checkbox" id="ipt-runtimesettings-regionMeasuredByPercentage_1" defaultChecked={!!this.props.runtimeSettings.region.regionMeasuredByPercentage} onClick={this.usePercentageOrNot} />By Percentage
                                            </label>
                                        <input type="kPercentage" id="ipt-runtimesettings-regionTop_1" className="ipt-runtimesettings-regionTop" placeholder={!!this.props.runtimeSettings.region.regionMeasuredByPercentage ? "top(%)" : "top"} defaultValue={this.props.runtimeSettings.region.regionTop === 0 ? "" : this.props.runtimeSettings.region.regionTop} />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionLeft_1" className="ipt-runtimesettings-regionLeft" placeholder={!!this.props.runtimeSettings.region.regionMeasuredByPercentage ? "left(%)" : "left"} defaultValue={this.props.runtimeSettings.region.regionLeft === 0 ? "" : this.props.runtimeSettings.region.regionLeft} />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionRight_1" className="ipt-runtimesettings-regionRight" placeholder={!!this.props.runtimeSettings.region.regionMeasuredByPercentage ? "right(%)" : "right"} defaultValue={this.props.runtimeSettings.region.regionRight === 0 ? "" : this.props.runtimeSettings.region.regionRight} />
                                        <input type="kPercentage" id="ipt-runtimesettings-regionBottom_1" className="ipt-runtimesettings-regionBottom" placeholder={!!this.props.runtimeSettings.region.regionMeasuredByPercentage ? "bottom(%)" : "bottom"} defaultValue={this.props.runtimeSettings.region.regionBottom === 0 ? "" : this.props.runtimeSettings.region.regionBottom} />
                                    </div>)
                                }
                                <Button variant="primary" style={{ width: "80%", margin: "auto" }} onClick={this.updateSettings}>Set Region(s)</Button>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} >
                                <Card.Title style={{ width: '100%' }}>More Settings</Card.Title>
                                {this.props.fullFeature ? (<>
                                    <label htmlFor="ipt-runtimesettings-barcodeFormatIds_2">Extra Barcode Format</label>
                                    <input id="ipt-runtimesettings-barcodeFormatIds_2" onChange={this.updateBarcodeFormatsCheckStatus2} type="knumber" defaultValue={this.props.runtimeSettings.barcodeFormatIds_2} />
                                    <Card className="paddingOneVW allWidth">
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0" defaultChecked={this.props.runtimeSettings.barcodeFormatIds_2 === 0} id="null-barcodeFormatIds_2" />null</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="1" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 1) === 1} />NonStandard</label>
                                        <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="2" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 2) === 2} />Dot Code</label>
                                        <div className="div-PostalCodeFormat">
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} className="ipt-barcodeFormat-combo2" defaultValue="0x1F00000" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x1F00000) === 0x1F00000} id="ipt-PostalCodeFormat" />Postal Codes</label>
                                            <Button variant="Light" id="btn-togglePostalCodes" className="btn-toggle" onClick={this.toggleShowPostalCodeItems}></Button>
                                        </div>
                                        <Card id="div-PostalCodeFormatContainer" className="div-1dFormatContainer" style={this.state.showPostalCodeItems ? style.show : style.hide}>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x100000" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x100000) === 0x100000} />USPS Intelligent Mail</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x200000" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x200000) === 0x200000} />PostNet</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x400000" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x400000) === 0x400000} />Planet</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x800000" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x800000) === 0x800000} />Australian Post</label>
                                            <label><input type="checkbox" onClick={this.barcodeFormatsUpdate2} defaultValue="0x1000000" className="ipt-barcodeFormat2" defaultChecked={(this.props.runtimeSettings.barcodeFormatIds_2 & 0x1000000) === 0x1000000} />UK Royal Mail</label>
                                        </Card>
                                    </Card></>) : ""}

                                <label htmlFor="ipt-runtimesettings-returnBarcodeZoneClarity">ReturnBarcodeZoneClarity</label>
                                <input type="range" data-type="setting" onChange={this.updateRangeValue} min="0" max="1" step="1" defaultValue={this.props.runtimeSettings.returnBarcodeZoneClarity} factor="1" />
                                <input id="ipt-runtimesettings-returnBarcodeZoneClarity" data-type="setting" onKeyUp={this.updateRange} type="knumber" min="0" max="1" step="1" defaultValue={this.props.runtimeSettings.returnBarcodeZoneClarity} factor="1" />

                                <label htmlFor="pdfReadingMode">PDFReadingMode</label>
                                <select onChange={this.updateSettings} id="pdfReadingMode_1" value={this.props.runtimeSettings.pdfReadingMode}>
                                    <option value="1">Auto</option>
                                    <option value="2">Vector</option>
                                    <option value="4">Raster</option>
                                </select>

                                <label htmlFor="resultCoordinateType">ResultCoordinateType</label>
                                <select onChange={this.updateSettings} id="resultCoordinateType_1" value={this.props.runtimeSettings.resultCoordinateType}>
                                    <option value="1">Pixel</option>
                                    <option value="2">Percentage</option>
                                </select>

                                {this.props.fullFeature ? (<>
                                    <label htmlFor="ipt-runtimesettings-intermediateResultTypes">IntermediateResultTypes (check below)</label>
                                    <input id="ipt-runtimesettings-intermediateResultTypes" onChange={this.intermediateResultTypesUpdate} type="knumber" defaultValue={this.props.runtimeSettings.intermediateResultTypes} />
                                    <Card style={{ padding: '1vw', marginTop: '1vw', width: '100%' }}>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="1" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 1) === 1} />ORIGINAL_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="2" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 2) === 2} />COLOUR_CLUSTERED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="4" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 4) === 4} />COLOUR_CONVERTED_GRAYSCALE_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="8" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 8) === 8} />TRANSFORMED_GRAYSCALE_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x10" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x10) === 0x10} />PREDETECTED_REGION</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x20" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x20) === 0x20} />PREPROCESSED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x40" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x40) === 0x40} />BINARIZED_IMAGE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x80" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x80) === 0x80} />TEXT_ZONE</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x100" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x100) === 0x100} />CONTOUR</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x200" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x200) === 0x200} />LINE_SEGMENT</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x400" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x400) === 0x400} />FORM</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x800" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x800) === 0x800} />SEGMENTATION_BLOCK</label>
                                        <label><input type="checkbox" className="ipt-updateIntermediateResultTypes" defaultValue="0x1000" onClick={this.intermediateResultTypesUpdate} defaultChecked={(this.props.runtimeSettings.intermediateResultTypes & 0x1000) === 0x1000} />TYPED_BARCODE_ZONE</label>
                                    </Card>
                                </>) : ""}
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-binarizationModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>BinarizationModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.binarizationModes.map((value, key) =>
                                        <div key={this.messageKeyBase + key}>
                                            <select onChange={this.updateSettings} id={"binarizationModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LocalBlock</option>
                                                <option value="4">Threshold</option>
                                            </select>
                                            <Card className={"div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" + key.toString()} style={value === 2 ? style.show : style.hide} >
                                                <div >
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-BlockSizeX"}>BlockSizeX</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-BlockSizeX"} onKeyUp={this.updateRange} type="knumber" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-BlockSizeY"}>BlockSizeY</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-BlockSizeY"} onKeyUp={this.updateRange} type="knumber" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-EnableFillBinaryVacancy"}>EnableFillBinaryVacancy</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1" step="1" defaultValue="1" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-EnableFillBinaryVacancy"} onKeyUp={this.updateRange} type="knumber" min="0" max="1" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-ImagePreprocessingModesIndex"}>ImagePreprocessingModesIndex</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-ImagePreprocessingModesIndex"} onKeyUp={this.updateRange} type="knumber" min="-1" max="7" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-ThreshValueCoefficient"}>ThreshValueCoefficient</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-ThreshValueCoefficient"} onKeyUp={this.updateRange} type="knumber" min="-255" max="255" step="1" defaultValue="10" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                            <Card className={"div-runtimesettings-ModeArgument-container div-runtimesettings-details-container paddingOneVW" + key.toString()} style={value === 4 ? style.show : style.hide} >
                                                <div>
                                                    <label htmlFor={"SMA-BinarizationModes-" + key.toString() + "-BinarizationThreshold"}>BinarizationThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="255" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-BinarizationModes-" + key.toString() + "-BinarizationThreshold"} onKeyUp={this.updateRange} type="knumber" min="-1" max="255" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-deblurModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>deblurModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.deblurModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 100 + key}>
                                            <select onChange={this.updateSettings} id={"deblurModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">DirectBinarization</option>
                                                <option value="2">ThresholdBinarization</option>
                                                <option value="4">GrayEqualization</option>
                                                <option value="8">Smoothing</option>
                                                <option value="16">Morphing</option>
                                                <option value="32">DeepAnalysis</option>
                                                <option value="64">Sharpening</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-localizationModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>LocalizationModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.localizationModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 200 + key}>
                                            <select onChange={this.updateSettings} id={"localizationModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="2">ConnectedBlocks</option>
                                                <option value="4">Statistics</option>
                                                <option value="8">Lines</option>
                                                <option value="16">ScanDirectly</option>
                                                <option value="32">StatisticsMarks</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 16 ? style.show : style.hide}>
                                                <div><label htmlFor={"SMA-LocalizationModes-" + key.toString() + "-ScanStride"}>ScanStride</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-LocalizationModes-" + key.toString() + "-ScanStride"} onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div><label htmlFor={"SMA-LocalizationModes-" + key.toString() + "-ScanDirection"}>ScanDirection (both, vertical, horizontal)</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="2" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-LocalizationModes-" + key.toString() + "-ScanDirection"} onKeyUp={this.updateRange} type="knumber" min="0" max="2" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-scaleUpModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>ScaleUpModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.scaleUpModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 300 + key}>
                                            <select onChange={this.updateSettings} id={"scaleUpModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">LinearInterpolation</option>
                                                <option value="4">NearestNeighbourInterpolation</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value > 1 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ScaleUpModes-" + key.toString() + "-AcuteAngleWithXThreshold"}>AcuteAngleWithXThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-ScaleUpModes-" + key.toString() + "-AcuteAngleWithXThreshold"} onKeyUp={this.updateRange} type="knumber" min="-1" max="90" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ScaleUpModes-" + key.toString() + "-ModuleSizeThreshold"}>ModuleSizeThreshold</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-ScaleUpModes-" + key.toString() + "-ModuleSizeThreshold"} onKeyUp={this.updateRange} type="knumber" min="0" max="999" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ScaleUpModes-" + key.toString() + "-TargetModuleSize"}>TargetModuleSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-ScaleUpModes-" + key.toString() + "-TargetModuleSize"} onKeyUp={this.updateRange} type="knumber" min="0" max="10" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textResultOrderModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>textResultOrderModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.textResultOrderModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 400 + key}>
                                            <select onChange={this.updateSettings} id={"textResultOrderModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Confidence</option>
                                                <option value="2">Position</option>
                                                <option value="4">Format</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                        {/* Further modes */}
                        <div className="div-advanceSettingsHeader" style={{ height: "auto", borderTop: "1px solid #dee2e6" }}>
                            <h4 htmlFor="ipt-runtimesettings-FurtherModes">Further Modes</h4>
                            <button className="btn-toggle" onClick={this.toggleShowFurtherModesItems}></button>
                        </div>
                        <div className="div-advanceSettings div-runtimesettings-details-container" style={this.state.showFurtherModesItems ? style.show : style.hide}>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-barcodeColourModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>BarcodeColourModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.barcodeColourModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 500 + key}>
                                            <select onChange={this.updateSettings} id={"barcodeColourModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">DarkOnLight</option>
                                                <option value="2">LightOnDark</option>
                                                <option value="4">DarkOnDark</option>
                                                <option value="8">LightOnLight</option>
                                                <option value="16">DarkLightMixed</option>
                                                <option value="32">DarkOnLightDarkSurrounding</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value !== 0 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-BarcodeColourModes-" + key.toString() + "-LightReflection"}>LightReflection</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1" step="1" defaultValue="1" factor="1" />
                                                    <input data-id={"SMA-BarcodeColourModes-" + key.toString() + "-LightReflection"} onKeyUp={this.updateRange} type="knumber" min="0" max="1" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-barcodeComplementModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>barcodeComplementModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.barcodeComplementModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 600 + key}>
                                            <select onChange={this.updateSettings} id={"barcodeComplementModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-colourClusteringModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>ColourClusteringModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.colourClusteringModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 700 + key}>
                                            <select onChange={this.updateSettings} id={"colourClusteringModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralHSV</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 2 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ColourClusteringModes-" + key.toString() + "-Sensitivity"}>Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id={"SMA-ColourClusteringModes-" + key.toString() + "-Sensitivity"} onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-colourConversionModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>ColourConversionModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.colourConversionModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 800 + key}>
                                            <select onChange={this.updateSettings} id={"colourConversionModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">General</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 1 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ColourConversionModes-" + key.toString() + "-BlueChannelWeight"}>BlueChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-ColourConversionModes-" + key.toString() + "-BlueChannelWeight"} onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ColourConversionModes-" + key.toString() + "-GreenChannelWeight"}>GreenChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-ColourConversionModes-" + key.toString() + "-GreenChannelWeight"} onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ColourConversionModes-" + key.toString() + "-RedChannelWeight"}>RedChannelWeight</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                    <input data-id={"SMA-ColourConversionModes-" + key.toString() + "-RedChannelWeight"} onKeyUp={this.updateRange} type="knumber" min="-1" max="1000" step="1" defaultValue="-1" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-deformationResistingModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>DeformationResistingModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.deformationResistingModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 900 + key}>
                                            <select onChange={this.updateSettings} id={"deformationResistingModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 2 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-DeformationResistingModes-" + key.toString() + "-Level"}>Level</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id={"SMA-DeformationResistingModes-" + key.toString() + "-Level"} onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-dpmCodeReadingModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>dpmCodeReadingModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.dpmCodeReadingModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1000 + key}>
                                            <select onChange={this.updateSettings} id={"dpmCodeReadingModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-grayscaleTransformationModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>grayscaleTransformationModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.grayscaleTransformationModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1100 + key}>
                                            <select onChange={this.updateSettings} id={"grayscaleTransformationModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Inverted</option>
                                                <option value="2">Original</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-imagePreprocessingModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>ImagePreprocessingModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.imagePreprocessingModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1200 + key}>
                                            <select onChange={this.updateSettings} id={"imagePreprocessingModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">GrayEqualize</option>
                                                <option value="8">GraySmooth</option>
                                                <option value="16">SharpenSmooth</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 4 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-Sensitivity"}>Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-Sensitivity"} onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 8 || value === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-SmoothBlockSizeX"}>SmoothBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-SmoothBlockSizeX"} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-SmoothBlockSizeY"}>SmoothBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-SmoothBlockSizeY"} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-SharpenBlockSizeX"}>SharpenBlockSizeX</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-SharpenBlockSizeX"} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-SharpenBlockSizeY"}>SharpenBlockSizeY</label>
                                                    <input type="range" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-SharpenBlockSizeY"} type="knumber" min="3" max="1000" step="1" defaultValue="3" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 32 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperation"}>MorphOperation</label>
                                                    <select data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperation"} defaultValue="Close">
                                                        <option value="Erode">Erode</option>
                                                        <option value="Dilate">Dilate</option>
                                                        <option value="Open">Open</option>
                                                        <option value="Close">Close</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphShape"}>MorphShape</label>
                                                    <select data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphShape"} defaultValue="Rectangle">
                                                        <option value="Rectangle">Rectangle</option>
                                                        <option value="Cross">Cross</option>
                                                        <option value="Ellipse">Ellipse</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperationKernelSizeX"}>MorphOperationKernelSizeX</label>
                                                    <input type="range" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperationKernelSizeX"} type="knumber" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperationKernelSizeY"}>MorphOperationKernelSizeY</label>
                                                    <input type="range" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-ImagePreprocessingModes-" + key.toString() + "-MorphOperationKernelSizeY"} type="knumber" min="0" max="1000" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-regionPredetectionModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>RegionPredetectionModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.regionPredetectionModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1300 + key}>
                                            <select onChange={this.updateSettings} id={"regionPredetectionModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">General</option>
                                                <option value="4">RGB</option>
                                                <option value="8">Gray</option>
                                                <option value="16">HSV</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value > 2 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-MinImageDimension"}>MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="16384" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-MinImageDimension"} onKeyUp={this.updateRange} type="knumber" min="16384" max="2147483647" step="1" defaultValue="262144" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-Sensitivity"}>Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-Sensitivity"} onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-SpatialIndexBlockSize"}>SpatialIndexBlockSize</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="32" step="5" defaultValue="1" factor="1" />
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-SpatialIndexBlockSize"} onKeyUp={this.updateRange} type="knumber" min="1" max="32" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 16 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-RelativeBarcodeRegions"}>RelativeBarcodeRegions</label>
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-RelativeBarcodeRegions"} type="text" defaultValue="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-ForeAndBackgroundColours"}>ForeAndBackgroundColours</label>
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-ForeAndBackgroundColours"} type="text" defaultValue="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-AspectRatioRange"}>AspectRatioRange</label>
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-AspectRatioRange"} type="text" defaultValue="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-HeightRange"}>HeightRange</label>
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-HeightRange"} type="text" defaultValue="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-WidthRange"}>WidthRange</label>
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-WidthRange"} type="text" defaultValue="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-RegionPredetectionModes-" + key.toString() + "-FindAccurateBoundary"}>FindAccurateBoundary</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="1" step="1" defaultValue="1" factor="1" />
                                                    <input data-id={"SMA-RegionPredetectionModes-" + key.toString() + "-FindAccurateBoundary"} onKeyUp={this.updateRange} type="knumber" min="0" max="0" step="1" defaultValue="1" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textFilterModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>TextFilterModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.textFilterModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1400 + key}>
                                            <select onChange={this.updateSettings} id={"textFilterModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralContour</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 2 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-TextFilterModes-" + key.toString() + "-MinImageDimension"}>MinImageDimension</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                    <input data-id={"SMA-TextFilterModes-" + key.toString() + "-MinImageDimension"} onKeyUp={this.updateRange} type="knumber" min="65536" max="2147483647" step="1" defaultValue="65536" factor="1" />
                                                </div>
                                                <div>
                                                    <label htmlFor={"SMA-TextFilterModes-" + key.toString() + "-Sensitivity"}>Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                    <input data-id={"SMA-TextFilterModes-" + key.toString() + "-Sensitivity"} onKeyUp={this.updateRange} type="knumber" min="0" max="9" step="1" defaultValue="0" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card style={{ padding: '1vw', marginTop: '1vw' }} id="div-runtimesettings-textureDetectionModes-container" className="div-runtimesettings-mode-container">
                                <Card.Title style={{ width: '100%' }}>TextureDetectionModes</Card.Title>
                                <div className="div-algsContainer">
                                    {this.props.runtimeSettings.furtherModes.textureDetectionModes.map((value, key) =>
                                        <div key={this.messageKeyBase + 1500 + key}>
                                            <select onChange={this.updateSettings} id={"textureDetectionModes_" + (key + 1).toString()} value={value}>
                                                <option value="0">Skip</option>
                                                <option value="1">Auto</option>
                                                <option value="2">GeneralWidthConcentration</option>
                                            </select>
                                            <Card className="div-runtimesettings-details-container paddingOneVW" style={value === 2 ? style.show : style.hide}>
                                                <div>
                                                    <label htmlFor={"SMA-TextureDetectionModes-" + key.toString() + "-Sensitivity"}>Sensitivity</label>
                                                    <input type="range" onChange={this.updateRangeValue} min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                    <input data-id={"SMA-TextureDetectionModes-" + key.toString() + "-Sensitivity"} onKeyUp={this.updateRange} type="knumber" min="1" max="9" step="1" defaultValue="5" factor="1" />
                                                </div>
                                                <Button style={{ width: '45%', marginRight: '9%' }} variant="outline-success" onClick={this.getModeArgument}>Get Current</Button>
                                                <Button style={{ width: '45%' }} variant="outline-primary" onClick={this.setModeArguments}>Submit </Button>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div >
                    </div >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal >
        );
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
export default SetUpUI;
