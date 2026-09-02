// You must use `import type`; otherwise, 
// the entire 'dynamsoft-barcode-reader-bundle' package
// will be imported into the compiled output.
//
// Since the 'dynamsoft-barcode-reader-bundle' package
// has already been imported in the business logic, 
// importing it again in the UI definition is unnecessary.
import type * as Types from 'dynamsoft-barcode-reader-bundle';
type CaptureVisionRouter = Types.CaptureVisionRouter;
type CameraEnhancer = Types.CameraEnhancer;

const camera = (document.currentScript as any).currentDMCamera as CameraEnhancer;

// Start from dbrjs 11.6.3100:
// you can import SDK variables from `dynamsoftExports`
const { beep, vibrate, CaptureVisionRouter, CameraEnhancer } = (camera as any).dynamsoftExports as (typeof Types);
const { cvRouter, handleBarcodeText } = (camera as any).uiContext as {
  cvRouter: CaptureVisionRouter;
  handleBarcodeText: (text: string) => void;
};

const scanlight = document.createElement('div');
Object.assign(scanlight.style, {
  position: 'absolute',
  width: '100%',
  height: '3%',
  borderRadius: '50%',
  boxShadow: '0px 0px 2vw 1px #00e5ff',
  background: '#fff',
  animation: '3s infinite dm-camera-scanlight',
  pointerEvents: 'none',
  userSelect: 'none',
  display: 'none',
});
camera.setRegionBox({ innerUi: scanlight });

const ui = camera.ui;


const elTorch = ui.querySelector('.dm-camera-mn-torch') as HTMLElement;
const elTorchAuto = ui.querySelector('.dm-camera-mn-torch-auto') as HTMLElement;
const elTorchOn = ui.querySelector('.dm-camera-mn-torch-on') as HTMLElement;
const elTorchOff = ui.querySelector('.dm-camera-mn-torch-off') as HTMLElement;
if (elTorchAuto) { elTorchAuto.style.display = undefined == camera.isTorchOn ? '' : 'none'; }
if (elTorchOn) { elTorchOn.style.display = true == camera.isTorchOn ? '' : 'none'; }
if (elTorchOff) { elTorchOff.style.display = false == camera.isTorchOn ? '' : 'none'; }

// You need to bind the events yourself to determine when `beep()` and `vibrate()` are triggered;
// the SDK includes built-in, callable versions of both functions.
const elBeepOn = ui.querySelector('.dm-camera-mn-beep-on') as HTMLElement;
const elBeepOff = ui.querySelector('.dm-camera-mn-beep-off') as HTMLElement;
let isBeepOn = true;
isBeepOn ? elBeepOff.style.display = 'none' : elBeepOn.style.display = 'none';
const elVibrateOn = ui.querySelector('.dm-camera-mn-vibrate-on') as HTMLElement;
const elVibrateOff = ui.querySelector('.dm-camera-mn-vibrate-off') as HTMLElement;
let isVibrateOn = false;
isVibrateOn ? elVibrateOff.style.display = 'none' : elVibrateOn.style.display = 'none';

const elResolutionBox = ui.querySelector('.dm-camera-mn-resolution-box') as HTMLElement;
const elZoom = ui.querySelector('.dm-camera-mn-zoom') as HTMLElement;
const elZoomSpan = elZoom?.querySelector('span') as HTMLElement;
const elToast = ui.querySelector('.dm-camera-mn-toast') as HTMLElement;
const elCameraClose = ui.querySelector('.dm-camera-mn-camera-close') as HTMLElement;
const elTakePhoto = ui.querySelector('.dm-camera-mn-take-photo') as HTMLElement;
const elCameraSwitch = ui.querySelector('.dm-camera-mn-camera-switch') as HTMLElement;
const elCameraAndResolutionSettings = ui.querySelector('.dm-camera-mn-camera-and-resolution-settings') as HTMLElement;
const divCameras = elCameraAndResolutionSettings?.querySelector('.dm-camera-mn-cameras') as HTMLElement;
const arrElResolutionOption = elCameraAndResolutionSettings?.querySelectorAll('.dm-camera-mn-resolution-option') as any as HTMLElement[];

camera.addEventListener('opened', async () => {
  if ('customized-video' != camera.requestedCamera) {

    // mirror front camera
    camera.isMirrored = camera.currentCamera?.isFront;

    if (elTorch) { elTorch.style.display = ''; }

    // show current resolution
    if (elResolutionBox || arrElResolutionOption?.length) {
      let resolutionFriendlyName;
      // Notice: rule should match names in the resolution options
      {
        let rsl = camera.currentResolution;
        let maxDimension = Math.max(rsl.width, rsl.height);
        let minDimension = Math.min(rsl.width, rsl.height);
        if (minDimension <= 1080) {
          resolutionFriendlyName = minDimension + 'P';
        } else if (maxDimension < 3000) {
          resolutionFriendlyName = '2K'
        } else { // maxDimension >= 3000
          resolutionFriendlyName = Math.round(maxDimension / 1000) + 'K';
        }
      }

      if (elResolutionBox) {
        elResolutionBox.textContent = resolutionFriendlyName;
        elResolutionBox.style.display = '';
      }

      if (arrElResolutionOption?.length) {
        for (let option of arrElResolutionOption) {
          if (option.textContent === resolutionFriendlyName) {
            option.setAttribute('selected', '');
          } else if (option.hasAttribute('selected')) {
            option.removeAttribute('selected');
          }
        }
      }
    }

    // show current camera
    if (divCameras) {
      const infos = await CameraEnhancer.getDeviceInfos();
      const curCam = camera.currentCamera;
      if (!curCam) { return; } // rarely, after await, camera may already change
      const curCamLabel = curCam.trackLabel || curCam.label;
      divCameras.textContent = '';
      for (let info of infos) {
        const opt = document.createElement("div");
        opt.classList.add('dm-camera-mn-camera-option');
        opt.setAttribute('data-device-id', info.deviceId);
        opt.textContent = info.trackLabel || info.label;
        if (opt.textContent === curCamLabel) {
          opt.setAttribute('selected', '');
        }
        divCameras.append(opt);
      }
    }

    // show switch camera button
    if (elCameraSwitch) { elCameraSwitch.style.display = ''; }
  }
});

camera.addEventListener('closed', () => {
  if (elTorch) { elTorch.style.display = 'none'; }
  if (elResolutionBox) { elResolutionBox.style.display = 'none'; }
  if (elCameraSwitch) { elCameraSwitch.style.display = 'none'; }
  if (elCameraAndResolutionSettings) { elCameraAndResolutionSettings.style.display = 'none'; }
});

elTorchAuto?.addEventListener('pointerdown', () => {
  camera.turnOnTorch();
  elTorchAuto.style.display = 'none';
  elTorchOn.style.display = '';
});
elTorchOn?.addEventListener('pointerdown', () => {
  camera.turnOffTorch();
  elTorchOn.style.display = 'none';
  elTorchOff.style.display = '';
});
elTorchOff?.addEventListener('pointerdown', () => {
  if (!camera.isSupportTorch) {
    funcShowToast('Torch Not Supported');
    return;
  }
  camera.turnAutoTorch();
  elTorchOff.style.display = 'none';
  elTorchAuto.style.display = '';
});
camera.addEventListener('torchAutoOn', () => {
  funcShowToast('Torch Auto On');
  if (elTorchAuto) { elTorchAuto.style.display = 'none'; }
  if (elTorchOn) { elTorchOn.style.display = ''; }
});


elBeepOn?.addEventListener('pointerdown', () => {
  isBeepOn = false;
  elBeepOn.style.display = 'none';
  elBeepOff.style.display = '';
});
elBeepOff?.addEventListener('pointerdown', () => {
  isBeepOn = true;
  elBeepOff.style.display = 'none';
  elBeepOn.style.display = '';
});
elVibrateOn?.addEventListener('pointerdown', () => {
  isVibrateOn = false;
  elVibrateOn.style.display = 'none';
  elVibrateOff.style.display = '';
});
elVibrateOff?.addEventListener('pointerdown', () => {
  isVibrateOn = true;
  elVibrateOff.style.display = 'none';
  elVibrateOn.style.display = '';
});
// only effective if `cvRouter.startCapturing()` is executed in the business logic.
cvRouter.addResultReceiver({
  onDecodedBarcodesReceived: (result) => {
    if (result.barcodeResultItems?.length) {
      isBeepOn && beep();
      isVibrateOn && vibrate();
    }
  }
});

ui.addEventListener('click', async (ev) => {
  let target = ev.target as HTMLElement;
  let option;
  if (option = target.closest('.dm-camera-mn-camera-option')) {
    // change camera
    if (option.hasAttribute('selected')) { return; }
    await camera.requestCamera(option.getAttribute('data-device-id')!);
    // if remove usb camera, camera status can be 'paused'
    // anyway, if not 'opened', reopen it
    if ('opened' !== camera.status) { await camera.open(); }
  } else if (option = target.closest('.dm-camera-mn-resolution-option')) {
    // change resolution
    if (option.hasAttribute('selected')) { return; }
    let width = parseInt(option.getAttribute('data-width')!);
    let height = parseInt(option.getAttribute('data-height')!);
    await camera.requestResolution({ width, height });

    if (arrElResolutionOption.length) {
      const selectedOption = elCameraAndResolutionSettings?.querySelector('.dm-camera-mn-resolution-option[selected]');
      if (selectedOption && selectedOption.textContent != option.textContent) {
        funcShowToast(`Fallback to ${selectedOption.textContent}`);
      }
    }
  } else if (target.closest('.dm-camera-mn-camera-and-resolution-settings')) {
    // nothing happen
    return;
  } else if (target.closest('.dm-camera-mn-resolution-box')) { // toggle settings
    if (elCameraAndResolutionSettings) {
      elCameraAndResolutionSettings.style.display = elCameraAndResolutionSettings.style.display ? '' : 'none';
    }
    return;
  }
  // hide settings
  if (elCameraAndResolutionSettings) {
    if ('' === elCameraAndResolutionSettings.style.display) {
      elCameraAndResolutionSettings.style.display = 'none';
    }
  }
});

let taskInfoZoomChange: any = null;
camera.addEventListener('zoom', (e) => {
  if (!elZoom || !elZoomSpan) { return; }
  elZoomSpan.textContent = e!.zoom.toFixed(1);
  elZoom.style.display = '';
  if (null != taskInfoZoomChange) {
    clearTimeout(taskInfoZoomChange);
    taskInfoZoomChange = null;
  }
  taskInfoZoomChange = setTimeout(() => {
    elZoom.style.display = 'none';
    taskInfoZoomChange = null;
  }, 3000);
});

let taskShowToast: any = null;
const funcShowToast = (camera as any).funcShowToast = (info: string, duration = 3000) => {
  if (!elToast) { return; }
  elToast.textContent = info;
  elToast.style.display = '';
  if (null != taskShowToast) {
    clearTimeout(taskShowToast);
    taskShowToast = null;
  }
  if (duration) { // 0 never hide
    taskShowToast = setTimeout(() => {
      elToast.style.display = 'none';
      taskShowToast = null;
    }, duration);
  }
};

elCameraClose?.addEventListener('click', () => {
  camera.close();
  camera.ui.remove();
});

elTakePhoto.addEventListener('pointerdown', async () => {
  funcShowToast('decoding ...', 0);
  let captureResult = await cvRouter.capture(camera.getFrame()); // or add second param like 'ReadBarcodes_ReadRateFirst'
  let text = captureResult.decodedBarcodesResult?.barcodeResultItems?.[0]?.text;
  funcShowToast(text || 'no result');
  if (text) {
    handleBarcodeText(text);
    isBeepOn && beep();
    isVibrateOn && vibrate();
  }
});

let cameraIndex = 0;
elCameraSwitch?.addEventListener('pointerdown', async () => {
  const deviceInfos = await CameraEnhancer.getDeviceInfos();
  cameraIndex = (cameraIndex + 1) % deviceInfos.length;
  await camera.requestCamera(deviceInfos[cameraIndex]);
});
