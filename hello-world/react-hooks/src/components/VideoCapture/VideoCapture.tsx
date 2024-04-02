import { useEffect, useRef, MutableRefObject } from 'react';
import { CameraEnhancer, CameraView } from 'dynamsoft-camera-enhancer';
import { DecodedBarcodesResult } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter, CapturedResultReceiver } from 'dynamsoft-capture-vision-router';
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

function VideoRecognizer() {
    const uiContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const resultsContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const pCameraView: MutableRefObject<Promise<CameraView> | null> = useRef(null);
    const pCameraEnhancer: MutableRefObject<Promise<CameraEnhancer> | null> = useRef(null);
    const pRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
    useEffect((): any => {
        const init = async () => {
            // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
            const cameraView = await (pCameraView.current = CameraView.createInstance());
            const cameraEnhancer = await (pCameraEnhancer.current = CameraEnhancer.createInstance(cameraView));
            uiContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

            // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
            const router = await (pRouter.current = CaptureVisionRouter.createInstance());
            router.setInput(cameraEnhancer);

            // Define a callback for results.
            const resultReceiver = new CapturedResultReceiver();
            resultReceiver.onDecodedBarcodesReceived = (result: DecodedBarcodesResult) => {
                if (!result.barcodeResultItems.length) return;
    
                resultsContainer.current!.innerHTML = "";
                console.log(result);
                for (let item of result.barcodeResultItems) {
                    resultsContainer.current!.innerHTML += `${item.text}<br><hr>`;
                }
            };
            router.addResultReceiver(resultReceiver);

            // Filter out unchecked and duplicate results.
            const filter = new MultiFrameResultCrossFilter();
            filter.enableResultCrossVerification("barcode", true); // Filter out unchecked barcode.
            // Filter out duplicate barcodes within 3 seconds.
            filter.enableResultDeduplication("barcode", true);
            filter.setDuplicateForgetTime("barcode", 3000);
            await router.addResultFilter(filter);

            // Open camera and start scanning barcode.
            await cameraEnhancer.open();
            await router.startCapturing("ReadSingleBarcode");
        }
        init();

        return async () => {
            (await pRouter.current)!.dispose();
            (await pCameraEnhancer.current)!.dispose();
            console.log('VideoCapture Component Unmount');
        }
    }, []);

    return (
        <div>
            <div ref={uiContainer} className="div-ui-container"></div>
            Results:
            <br />
            <div ref={resultsContainer} className="div-results-container"></div>
        </div>
    );
}

export default VideoRecognizer;
