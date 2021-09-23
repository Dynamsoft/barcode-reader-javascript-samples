/* The purpose of this file is to combine the DBR Scanner initialization code as well as the common operations among all the samples in the settings folder */

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
         * The library requires a license to work. If no license is specified, a 7-day built-in 
         * trial license will be used by default which is the case in this sample.
         * Note that network connection is required for this built-in license to work.
         */

        /* When using your own license, uncomment the following line and specify your own license string. */

        // Dynamsoft.DBR.initLicense("DLS2eyJvcmdhbml6YXR****");

        /** If you don't have a license yet, you can request a trial on this page: 
         * https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sample
         * or, you can purchase a license on this page:
         * https://www.dynamsoft.com/store/dynamsoft-barcode-reader/#js?product=dbr&package=js&utm_source=sample
         */

        /** LICENSE ALERT - THE END */

        loadingText.hidden = false;
        let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
        initialSettings = await scanner.getRuntimeSettings();
        await scanner.setUIElement(document.getElementById('div-video-container'));
        startReading();
    } catch (ex) {
        alert(ex.message);
        throw ex;
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
    for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].addEventListener('click', function () {
            var _tip = this;
            _tip.setAttribute('data-balloon-visible', '');
            setTimeout(function () {
                _tip.removeAttribute('data-balloon-visible');
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
                resultBox.value = result.barcodeFormatString + ": " + result.barcodeText;
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