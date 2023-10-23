import React from 'react'
import { BarcodeResultItem } from '@dynamsoft/dynamsoft-barcode-reader';
import { CaptureVisionRouter } from '@dynamsoft/dynamsoft-capture-vision-router';
import './ImageCapture.css'

export class ImageCapture extends React.Component {
  pInit: Promise<CaptureVisionRouter> | null = null;
  pDestroy: Promise<void> | null = null;

  async init(): Promise<CaptureVisionRouter> {
    const router = await CaptureVisionRouter.createInstance();
    return router;
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      (await this.pInit).dispose();
    }
  }

  decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const router = await this.pInit;
      const result = await router!.capture(
        e.target.files![0],
        'ReadBarcodes_SpeedFirst'
      );
      for (let item of result.items) {
        alert((item as BarcodeResultItem).text);
      }
      if (!result.items.length) {
        alert('No barcode found');
      }
    } catch (ex: any) {
      let errMsg;
      if (ex.message.includes('network connection error')) {
        errMsg =
          'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
      } else {
        errMsg = ex.message || ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = '';
  }

  async componentDidMount() {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode. 
    if (this.pDestroy) {
      await this.pDestroy;
      this.pInit = this.init();
    } else {
      this.pInit = this.init();
    }
  }

  async componentWillUnmount() {
    await (this.pDestroy = this.destroy());
    console.log('ImageCaptureComponent Unmount');
  }

  render() {
    return (
      <div className="div-image-capture"><input type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={this.decodeImg} /></div>
    )
  }
}