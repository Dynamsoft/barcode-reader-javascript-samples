# DBR JavaScript Sample Creator — API Reference: Framework Integration

---

## General Framework Pattern

All framework samples share the same structure:

1. **`dynamsoft.config.ts`** — SDK initialization (license, resource paths, WASM preload). Import as
   a side effect in the root component or entry file.
2. **VideoCapture component** — Camera scanning with lifecycle-aware initialization and cleanup.
3. **ImageCapture component** — File-based decoding with lazy router creation.

---

## `dynamsoft.config.ts` (All Frameworks)

```ts
import { CoreModule, LicenseManager } from "dynamsoft-barcode-reader-bundle";

CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js
 * to get your own trial license good for 30 days.
 * LICENSE ALERT - THE END
 */
LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

// Optional: preload WASM to reduce latency on first decode
CoreModule.loadWasm();
```

---

## React

### VideoCapture Component

```tsx
import { useEffect, useRef, useState } from "react";
import "../../dynamsoft.config";
import {
  CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter
} from "dynamsoft-barcode-reader-bundle";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

function VideoCapture() {
  const [resultText, setResultText] = useState("");
  const cameraViewContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let resolveInit: () => void;
    const pInit: Promise<void> = new Promise((r) => { resolveInit = r; });
    let isDestroyed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        cameraViewContainer.current!.append(cameraView.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;
            let text = "";
            for (let item of result.barcodeResultItems) {
              text += `${item.formatString}: ${item.text}\n\n`;
            }
            setResultText(text);
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
        if (isDestroyed) throw Error(componentDestroyedErrorMsg);
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          alert(ex.message || ex);
        }
      }
      resolveInit!();
    })();

    return () => {
      isDestroyed = true;
      pInit.then(() => {
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      }).catch(() => {});
    };
  }, []);

  return (
    <div>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "70vh" }} />
      Results:
      <div>{resultText}</div>
    </div>
  );
}

export default VideoCapture;
```

### ImageCapture Component (React)

```tsx
import { useRef, useEffect, MutableRefObject, useState } from "react";
import "../../dynamsoft.config";
import {
  EnumCapturedResultItemType, CaptureVisionRouter, BarcodeResultItem
} from "dynamsoft-barcode-reader-bundle";

function ImageCapture() {
  const [resultText, setResultText] = useState("");
  const pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  const isDestroyed = useRef(false);

  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files as any as File[])];
    e.target.value = "";
    setResultText("");
    try {
      const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());
      if (isDestroyed.current) return;

      let text = "";
      for (let file of files) {
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        if (isDestroyed.current) return;
        if (files.length > 1) text += `\n${file.name}:\n`;
        for (let item of result.items) {
          if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          const b = item as BarcodeResultItem;
          text += `${b.formatString}: ${b.text}\n`;
        }
        if (!result.items.length) text += "No barcode found";
        setResultText(text);
      }
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  };

  useEffect((): any => {
    isDestroyed.current = false;
    return () => {
      isDestroyed.current = true;
      pCvRouter.current?.then(r => r.dispose()).catch(() => {});
    };
  }, []);

  return (
    <div>
      <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={captureImage} />
      <div>{resultText}</div>
    </div>
  );
}

export default ImageCapture;
```

---

## Vue 3 (Composition API)

### VideoCapture Component (Vue)

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import {
  CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter
} from "dynamsoft-barcode-reader-bundle";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";
const cameraViewContainer: Ref<HTMLElement | null> = ref(null);
const resultText = ref("");

let resolveInit: () => void;
const pInit: Promise<void> = new Promise(r => { resolveInit = r; });
let isDestroyed = false;
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;

onMounted(async () => {
  try {
    const cameraView = await CameraView.createInstance();
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);

    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);

    cameraViewContainer.value!.append(cameraView.getUIElement());

    cvRouter = await CaptureVisionRouter.createInstance();
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);
    cvRouter.setInput(cameraEnhancer);

    await cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;
        resultText.value = "";
        for (let item of result.barcodeResultItems) {
          resultText.value += `${item.formatString}: ${item.text}\n\n`;
        }
      },
    });

    const filter = new MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification("barcode", true);
    filter.enableResultDeduplication("barcode", true);
    await cvRouter.addResultFilter(filter);
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);

    await cameraEnhancer.open();
    cameraView.setScanLaserVisible(true);
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);
    await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    if (isDestroyed) throw Error(componentDestroyedErrorMsg);
  } catch (ex: any) {
    if ((ex as Error)?.message === componentDestroyedErrorMsg) {
      console.log(componentDestroyedErrorMsg);
    } else {
      alert(ex.message || ex);
    }
  }
  resolveInit!();
});

onBeforeUnmount(async () => {
  isDestroyed = true;
  try {
    await pInit;
    cvRouter?.dispose();
    cameraEnhancer?.dispose();
  } catch (_) {}
});
</script>

<template>
  <div>
    <div ref="cameraViewContainer" style="width: 100%; height: 70vh;"></div>
    Results:
    <div style="white-space: pre-wrap;">{{ resultText }}</div>
  </div>
</template>
```

### ImageCapture Component (Vue)

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import "../dynamsoft.config";
import { EnumCapturedResultItemType, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";

let pCvRouter: Promise<CaptureVisionRouter>;
let isDestroyed = false;
const resultText = ref("");

const captureImage = async (e: Event) => {
  const files = [...(e.target as HTMLInputElement).files!];
  (e.target as HTMLInputElement).value = "";
  resultText.value = "";
  try {
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (isDestroyed) return;

    for (let file of files) {
      const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
      if (isDestroyed) return;
      if (files.length > 1) resultText.value += `\n${file.name}:\n`;
      for (let item of result.items) {
        if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
        const b = item as BarcodeResultItem;
        resultText.value += `${b.formatString}: ${b.text}\n`;
      }
      if (!result.items.length) resultText.value += "No barcode found\n";
    }
  } catch (ex: any) {
    alert(ex.message || ex);
  }
};

onBeforeUnmount(async () => {
  isDestroyed = true;
  if (pCvRouter) {
    try { (await pCvRouter).dispose(); } catch (_) {}
  }
});
</script>

<template>
  <div>
    <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" @change="captureImage" />
    <div style="white-space: pre-wrap;">{{ resultText }}</div>
  </div>
</template>
```

---

## Angular

The Angular pattern mirrors React/Vue with `ngAfterViewInit` / `ngOnDestroy` lifecycle hooks and
`@ViewChild` for the camera container:

```ts
import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import "../../dynamsoft.config";
import { CameraView, CameraEnhancer, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";

@Component({ selector: "app-video-capture", template: `
  <div #cameraViewContainer style="width:100%;height:70vh;"></div>
  <div>{{ resultText }}</div>
` })
export class VideoCaptureComponent implements AfterViewInit, OnDestroy {
  @ViewChild("cameraViewContainer") cameraViewContainer!: ElementRef;
  resultText = "";
  private cvRouter!: CaptureVisionRouter;
  private cameraEnhancer!: CameraEnhancer;
  private isDestroyed = false;

  async ngAfterViewInit() {
    const cameraView = await CameraView.createInstance();
    this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    this.cameraViewContainer.nativeElement.append(cameraView.getUIElement());

    this.cvRouter = await CaptureVisionRouter.createInstance();
    this.cvRouter.setInput(this.cameraEnhancer);

    await this.cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;
        this.resultText = result.barcodeResultItems.map(i => `${i.formatString}: ${i.text}`).join("\n");
      },
    });

    const filter = new MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification("barcode", true);
    filter.enableResultDeduplication("barcode", true);
    await this.cvRouter.addResultFilter(filter);

    await this.cameraEnhancer.open();
    cameraView.setScanLaserVisible(true);
    await this.cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.cvRouter?.dispose();
    this.cameraEnhancer?.dispose();
  }
}
```

---

## Next.js

- Use `"use client"` directive — all SDK code runs client-side only.
- Dynamic import with `ssr: false` for SDK if needed:

```ts
"use client";
import "../../dynamsoft.config"; // same config as React
// Everything else is identical to the React pattern
```

---

## Key Framework Rules

1. **`isDestroyed` flag** — Set to `true` in cleanup. Check after every `await` before touching state
   or DOM. This prevents React StrictMode double-invoke issues and Vue/Angular unmount race conditions.
2. **`pInit` promise** — Created before async work begins. Awaited in cleanup before `dispose()`.
   Ensures resources are not disposed mid-initialization.
3. **Camera container ref** — Always a `ref` / `@ViewChild` / `useRef` pointing to a DOM element.
   Never use `document.querySelector` inside framework components.
4. **`dynamsoft.config.ts` is a side effect** — Import it at the top of any component that uses the
   SDK. Multiple imports are fine — the module is only evaluated once.
5. **Dispose order** — Always `cvRouter.dispose()` first, then `cameraEnhancer.dispose()`.
