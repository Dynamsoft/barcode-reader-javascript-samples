/* The purpose of this file is to combine the DBR Scanner initialization code as well as the common operations among all the samples in the settings folder */

if(location.protocol === "file:") {
    const message = `The page is opened via file:// and "BarcodeScanner" may not work properly. Please open the page via https:// or host it on "http://localhost/".`;
    console.warn(message);
    alert(message);
}

let pScanner = null;
let initialSettings = null;
let loadingText = document.getElementById('lib-load');
let modalSettings = document.getElementById('settingsModal');
let settingsBtn = document.getElementById('openSimpleSettingsMenu');
let closeModalBtn = document.getElementById('closeModalBtn');
let resultBox = document.getElementById('result');

// Create a BarcodeScanner instance on page load to speed things up.
window.onload = async function () {
    try {
        /** LICENSE ALERT - README 
         * To use the library, you need to first specify a license key using the API "license" as shown below.
         */

        Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';

        /** 
         * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days. 
         * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
         * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.6.32&utm_source=github#specify-the-license or contact support@dynamsoft.com.
         * LICENSE ALERT - THE END 
         */

        loadingText.hidden = false;
        pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance();
        let scanner = await pScanner;
        initialSettings = await scanner.getRuntimeSettings();
        await scanner.setUIElement(document.getElementById('div-ui-container'));
        startReading();
    } catch (ex) {
        let errMsg;
        if (ex.message?.includes("network connection error")) {
            errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        } else {
            errMsg = ex.message||ex;
        }
        console.error(errMsg);
        alert(errMsg);
    }

    // Open the settings modal menu once the settings button is clicked
    settingsBtn.onclick = function () {
        modalSettings.style.display = "block";
    }

    // Close the modal when the 'x' is clicked
    closeModalBtn.onclick = function () {
        modalSettings.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modalSettings) {
            modalSettings.style.display = "none";
        }
    }

    /* The following defines an ontouchstart event for all the tooltip elements. This trigger is being added to take into account that there is no 'hover' event when using a mobile browser. Therefore, this event will be added so that the tooltip appears whenever it is tapped on a mobile browser */
    const tooltips = document.getElementsByClassName("tooltip");
    for (let _tip of tooltips) {
        _tip.addEventListener('click', function () {
            var _this = this;
            _this.setAttribute('data-balloon-visible', '');
            setTimeout(function () {
                _this.removeAttribute('data-balloon-visible');
            }, 3000);
        })
    }
    if (typeof initPage === "function")
        initPage();
};

// open the scanner video and start decoding once the Read Barcode button is clicked
async function startReading() {
    try {
        let scanner = await pScanner;
        scanner.onFrameRead = (_results) => {
            for (let result of _results) {
                const format = result.barcodeFormatString;
                resultBox.value = format + ": " + result.barcodeText;
            }
        };
        await scanner.show();
        loadingText.hidden = true;
        resultBox.style.visibility = "visible";
        settingsBtn.style.visibility = "visible";
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
}

function showModes(elID, modes, index) {
    var modesToShow = [];
    for (var i = 0; i < modes.length; i++) {
        var m = modes[i];
        if (i === index) {
            modesToShow.push("<strong>" + m + "</strong>")
        } else {
            modesToShow.push(m)
        }
    }
    document.getElementById(elID).innerHTML = modesToShow.join(", ");
}