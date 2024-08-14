// Create JS function "startImageDecode"
window.startImageDecode = async (resultsContainer, fileName, image) => {
    try {
        if (image) {
            // Convert file to blob
            const arrayBuffer = await image.arrayBuffer();
            const blob = new Blob([arrayBuffer]);

            cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
            const result = await cvRouter.capture(blob, "ReadBarcodes_SpeedFirst");
            resultsContainer.innerText = `${fileName}:\n`;
            for (let item of result.items) {
                if (item.type !== Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE) {
                    continue;
                }
                resultsContainer.innerText += item.text + "\n";
            }
            if (!result.items.length) resultsContainer.innerText += "No barcode found\n";

            await cvRouter?.dispose()
        }
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
    }
}