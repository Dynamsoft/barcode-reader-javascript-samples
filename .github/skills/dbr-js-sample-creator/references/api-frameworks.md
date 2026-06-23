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

## Next.js (App Router)

The Dynamsoft SDK is entirely client-side (WASM). Next.js App Router uses **server components
by default**, so you must explicitly opt into client rendering for any component that touches
the SDK.

### Architecture: Server vs Client Components

```text
app/
├── layout.tsx              ← server component (navigation, metadata) — no SDK imports
├── page.tsx                ← server component (home page) — no SDK imports
├── scanner/
│   └── page.tsx            ← "use client" wrapper with dynamic import
└── upload/
    └── page.tsx            ← "use client" wrapper with dynamic import
components/
├── VideoCapture.tsx        ← "use client" — SDK camera scanning logic
└── ImageCapture.tsx        ← "use client" — SDK image decoding logic
dynamsoft.config.ts         ← SDK init (client-side only, imported by components)
public/
└── MyTemplate.json         ← custom templates served as static files
```

**Rule:** `layout.tsx` and top-level `page.tsx` stay as server components. Only the page
wrappers that load SDK components need `"use client"`.

### Page Wrapper Pattern — `next/dynamic` with `ssr: false`

The SDK accesses browser APIs (`navigator`, `document`, WASM). Import SDK components with
`next/dynamic` to prevent server-side rendering:

```tsx
// app/scanner/page.tsx
"use client";

import dynamic from "next/dynamic";

const VideoCapture = dynamic(() => import("../../components/VideoCapture"), {
  ssr: false,
});

export default function ScannerPage() {
  return (
    <main>
      <h2>Camera Scanner</h2>
      <VideoCapture />
    </main>
  );
}
```

```tsx
// app/upload/page.tsx
"use client";

import dynamic from "next/dynamic";

const ImageCapture = dynamic(() => import("../../components/ImageCapture"), {
  ssr: false,
});

export default function UploadPage() {
  return (
    <main>
      <h2>Image Upload</h2>
      <ImageCapture />
    </main>
  );
}
```

### SDK Components

The actual `VideoCapture` and `ImageCapture` components are **identical to the React
patterns** shown above, with one addition — add `"use client"` at the top of each file:

```tsx
// components/VideoCapture.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import "../dynamsoft.config";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";

// ... rest is identical to the React VideoCapture pattern
```

### Custom Templates in Next.js

Place template JSON files in `public/` — they're served at the web root:

```text
public/ReadPDF417.json  →  accessible at "/ReadPDF417.json"
```

Load in your component:

```ts
await cvRouter.initSettings("/ReadPDF417.json");
await cvRouter.startCapturing("ReadPDF417_SpeedFirst"); // template name from JSON
```

### Server Component Layout (no SDK)

```tsx
// app/layout.tsx — stays as a server component
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Barcode Scanner — Dynamsoft",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/scanner">Scanner</Link>
          <Link href="/upload">Upload</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

### Next.js Key Rules

1. **Never import SDK packages in server components** — they access browser globals.
2. **Always use `dynamic()` with `ssr: false`** for components that import from
   `dynamsoft-barcode-reader-bundle`.
3. **`dynamsoft.config.ts` is client-only** — import it inside `"use client"` components only.
4. **Custom templates go in `public/`** and are referenced by absolute URL path.
5. **Everything else follows the React pattern** — `useEffect`, `isDestroyed`, `pInit`,
   `useRef`, cleanup/dispose.

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
