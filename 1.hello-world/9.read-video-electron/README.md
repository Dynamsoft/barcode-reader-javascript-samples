# Hello World Sample for Electron

[Electron](https://www.electronjs.org/) is a framework for creating native applications with web technologies. Follow this guide to learn how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into an Electron application.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/1.hello-world/9.read-video-electron">Read Barcodes from Camera - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 14.16.0` is used in this article.

## Create an empty Application

Create a folder with the name "read-video-electron" and a `package.json` file inside it with the following content:

```json
{
  "name": "read-video-electron",
  "version": "1.0.0",
  "description": "How to read barcodes from a video input in an Electron App",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "tom@dynamsoft.com",
  "dependencies": {
    "electron": "14.0.1",
    "dynamsoft-javascript-barcode": "^9.6.32"
  }
}
```

Then, run `npm install` to install the dependencies.

```cmd
npm install
```

## Start to implement

### Create a `main.js` file

As defined in the `package.json` file, `main.js` is the entry point of the application, we define it like this:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
```

Two modules are imported in this file:

* `app`: controls the application's event lifecycle.
* `BrowserWindow`: creates and manages application windows.

The code basically opens `index.html` in a window. For more information, check out [Electron Quick Start](https://www.electronjs.org/docs/latest/tutorial/quick-start).

### Create an index.html file

Create the page to be loaded in the created window.

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Read barcodes from a video input in Electron!</title>
    <link href="style.css" rel="stylesheet">
</head>

<body>
    <h1>Read barcodes from a video input</h1>
    <button id='readBarcode'>Read Barcode via Camera</button>
    <div id="UIElement">
        <div id="barcodeScannerUI"></div>
    </div>
    <input id="resultText" type="text" readonly="true">
    <script src="./node_modules/dynamsoft-javascript-barcode/dist/dbr.js"></script>
    <script src="action.js"></script>
</body>

</html>
```

The page loads action.js which makes use of the library to create a barcode scanner and read barcodes from a video input:

```javascript
(async function () {
    Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
    Dynamsoft.DBR.BarcodeReader.loadWasm();
    let pScanner = null;
    document.getElementById('readBarcode').onclick = async () => {
        try {
            let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
            scanner.onFrameRead = results => {
                if (results.length) {
                    console.log(results);
                }
            };
            scanner.onUniqueRead = (txt, result) => {
                const format = result.barcodeFormat ? result.barcodeFormatString : result.barcodeFormatString_2;
                document.getElementById('resultText').value = format + ': ' + txt;
            };
            document.getElementById("barcodeScannerUI").appendChild(scanner.getUIElement());
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    };
})();
```

Also, style.css defines the styles for the UI

```css
body {
    text-align: center;
}

#barcodeScannerUI {
    width: 100%;
    height: 100%;
}

#UIElement {
    margin: 2vmin auto;
    text-align: center;
    font-size: medium;
    height: 40vh;
    width: 80vw;
}
#resultText {
    display: block;
    margin: 0 auto;
    padding: 0.4rem 0.8rem;
    color: inherit;
    width: 80vw;
    border: none;
    font-size: 1rem;
    border-radius: 0.2rem;
    text-align: center;
}
```

## Run the application

Run the application with the following command and see how it goes.

```cmd
npm start
```

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
