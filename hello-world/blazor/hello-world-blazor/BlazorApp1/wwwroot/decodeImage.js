// Create JS function "startImageDecode"
window.startImageDecode = async () => {
    const inputElement = document.getElementById("inputElement");
    const resultsContainer = document.getElementById("results");

    const file = inputElement.files[0]; // Get the first file from the input element

    try {
        if (file) {
            // Convert file to blob
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Blob([arrayBuffer]);

            cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
            const result = await cvRouter.capture(blob, "ReadBarcodes_SpeedFirst");
            resultsContainer.innerText = `File: ${file.name}\n`;
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
        resultsContainer.innerText += `Error: ${errMsg}`
    }
}