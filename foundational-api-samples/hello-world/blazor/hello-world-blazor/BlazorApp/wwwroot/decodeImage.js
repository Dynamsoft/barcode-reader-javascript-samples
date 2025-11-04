// Create JS function "startImageDecode"
window.startImageDecode = async () => {
  const inputElement = document.getElementById("inputElement");
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerText = ""; // Reset results container

  const { files } = inputElement;

  try {
    for (let file of files) {
      cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
      // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
      if (files.length > 1) {
        resultsContainer.innerText += `\nFile: ${file.name}\n`;
      }
      for (let item of result.items) {
        if (item.type !== Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE) {
          continue;
        }
        resultsContainer.innerText += item.text + "\n";
        console.log(item.text);
      }
      if (!result.items.length) resultsContainer.innerText += "No barcode found\n";
    }
  } catch (ex) {
    let errMsg = ex.message || ex;
    console.error(ex);
    alert(errMsg);
  } finally {
    inputElement.value = "";
    await cvRouter?.dispose();
  }
};
