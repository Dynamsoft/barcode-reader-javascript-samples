"use client"

import React, { useEffect, useRef } from "react";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { DecodedBarcodesResult } from "@dynamsoft/dynamsoft-barcode-reader";
import {
  CameraEnhancer,
  CameraView,
} from "dynamsoft-camera-enhancer";
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

function VideoCapture() {
  const uiContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);

  const pInit = useRef(
    null as Promise<{
      cameraView: CameraView;
      cameraEnhancer: CameraEnhancer;
      router: CaptureVisionRouter;
    }> | null
  );
  const pDestroy = useRef(null as Promise<void> | null);

  const init = async (): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> => {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      uiContainer.current!.innerText = "";
      uiContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const router = await CaptureVisionRouter.createInstance();
      router.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (
        result: DecodedBarcodesResult
      ) => {
        if (!result.barcodesResultItems.length) return;

        resultsContainer.current!.innerHTML = "";
        console.log(result);
        for (let item of result.barcodesResultItems) {
          resultsContainer.current!.innerHTML += `${item.formatString}: ${item.text}<br><hr>`;
        }
      };
      router.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification(
        EnumCapturedResultItemType.CRIT_BARCODE,
        true
      ); // Filter out unchecked barcodes.
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication(
        EnumCapturedResultItemType.CRIT_BARCODE,
        true
      );
      filter.setDuplicateForgetTime(
        EnumCapturedResultItemType.CRIT_BARCODE,
        3000
      );
      await router.addResultFilter(filter);

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      await router.startCapturing("ReadSingleBarcode");
      return {
        cameraView,
        cameraEnhancer,
        router,
      };
    } catch (ex: any) {
      let errMsg;
      if (ex.message?.includes("network connection error")) {
        errMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message || ex;
      }
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const { cameraView, cameraEnhancer, router } = await pInit.current;
      router.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  };

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy.current) {
        await pDestroy.current;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("VideoCapture Component Unmount");
      })();
    };
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

export default VideoCapture;
