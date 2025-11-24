// Create JS function "startVideoDecode"
window.startVideoDecode = async () => {
    const cameraViewContainer = document.getElementById("camera-view-container");
    const resultsContainer = document.getElementById("results");

    try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
        cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
        // Get default UI and append it to DOM.
        cameraViewContainer.style.display = "block"
        cameraViewContainer.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
            onDecodedBarcodesReceived: (result) => {
                if (!result.barcodeResultItems.length) return;

                resultsContainer.textContent = "";
                for (let item of result.barcodeResultItems) {
                    resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
                }
            },
        });

        // Filter out unchecked and duplicate results.
        const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        // Open camera and start scanning barcode.
        await cameraEnhancer.open();
        
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(ex);
    }
}

// Create JS function "stopVideoDecode"
window.stopVideoDecode = async () => {
    const cameraViewContainer = document.getElementById("camera-view-container");
    const resultsContainer = document.getElementById("results");

    try {
        if (!cvRouter?.disposed) {
            await cvRouter?.dispose();
        }
        if (!cameraEnhancer?.disposed) {
            await cameraEnhancer?.dispose();
        }

        // Reset components
        cameraViewContainer.style.display = "none";
        cameraViewContainer.innerHTML = "";
        resultsContainer.textContent = "";
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(ex);
    }
}
