let dbrWebViewBridge = null;
if (window.DBR_Android) {
    class DBRWebViewBridge {
        constructor() {
            // The following field 'DBR_Android' is specified in the relevant code of the WKWebView
            this.methodsMap = window.DBR_Android;
        }

        setCameraUI(list) {
            this.methodsMap.setCameraUI(list);
        };
        switchFlashlight(state) {
            this.methodsMap.switchFlashlight(state.toString());
        };
        startScanning() {
            this.methodsMap.startScanning();
        }
        stopScanning() {
            this.methodsMap.stopScanning();
        };
        getRuntimeSettings() {
            return new Promise((resolve, reject) => {
                try {
                    const res = this.methodsMap.getRuntimeSettings();
                    resolve(JSON.parse(res));
                } catch (ex) { reject(ex); }
            });
        }
        getEnumBarcodeFormat() {
            return new Promise((resolve, reject) => {
                try {
                    const res = this.methodsMap.getEnumBarcodeFormat();
                    resolve(JSON.parse(res));
                } catch (ex) { reject(ex); }
            });
        }
        updateRuntimeSettings(settings) {
            return new Promise((resolve, reject) => {
                try {
                    this.methodsMap.updateRuntimeSettings(JSON.stringify(settings));
                    resolve();
                } catch (ex) { reject(ex); }
            });
        }
        // handle callback when the barcode results are returned
        onBarcodeRead() { };
    }
    dbrWebViewBridge = new DBRWebViewBridge();
} else if (window.webkit) {
    class DBRWKWebViewBridge {
        constructor() {
            this.methodsMap = window.webkit.messageHandlers;
            this.msgHandlersQueue = {};
        }

        setCameraUI(list) {
            this.methodsMap.setCameraUI.postMessage({ id: generateRandomId(), data: list });
        };
        switchFlashlight(state) {
            this.methodsMap.switchFlashlight.postMessage({ id: generateRandomId(), data: state });
        };
        startScanning() {
            this.methodsMap.startScanning.postMessage({ id: generateRandomId() });
        };
        stopScanning() {
            this.methodsMap.stopScanning.postMessage({ id: generateRandomId() });
        };
        getRuntimeSettings() {
            return new Promise((resolve, reject) => {
                const id = generateRandomId();
                this.msgHandlersQueue[id] = { resolve, reject };
                this.methodsMap.getRuntimeSettings.postMessage({ id });
            });
        }
        getEnumBarcodeFormat() {
            return new Promise((resolve, reject) => {
                const id = generateRandomId();
                this.msgHandlersQueue[id] = { resolve, reject };
                this.methodsMap.getEnumBarcodeFormat.postMessage({ id });
            });
        }
        updateBarcodeFormatIds(data) {
            return new Promise((resolve, reject) => {
                const id = generateRandomId();
                this.msgHandlersQueue[id] = { resolve, reject };
                this.methodsMap.updateBarcodeFormatIds.postMessage({ data, id });
            });
        }
        updateExpectedBarcodesCount(data) {
            return new Promise((resolve, reject) => {
                const id = generateRandomId();
                this.msgHandlersQueue[id] = { resolve, reject };
                this.methodsMap.updateExpectedBarcodesCount.postMessage({ data, id });
            });
        }
        postMessage(id, data) {
            this.msgHandlersQueue["" + id].resolve(data);
            Reflect.deleteProperty(this.msgHandlersQueue, id);
        };
        rejectError(id, error) {
            this.msgHandlersQueue["" + id].resolve(error);
            Reflect.deleteProperty(this.msgHandlersQueue, id);
        }
        onBarcodeRead() { };

    }

    function generateRandomId() {
        let id = "id" + new Date().getTime().toString();
        for (let i = 0; i < 4; i++) {
            id += Math.floor(Math.random() * 9).toString();
        }
        return id;
    }

    dbrWebViewBridge = new DBRWKWebViewBridge();
} else {
    alert("Failed to initialize dbrWebViewBridge");
}
