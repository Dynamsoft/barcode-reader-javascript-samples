import { Component, ViewChild } from '@angular/core';
import { BarcodeResultItem } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent {
  pRouter: Promise<CaptureVisionRouter> | null = null;

  @ViewChild('iptRef') iptRef: any;
  @ViewChild('resRef') resRef: any;

  ngOnInit(): void {
    this.pRouter = CaptureVisionRouter.createInstance();
  }

  captureImage = async (e: any) => {
    try {
      this.resRef!.innerText = "";
      const router = await this.pRouter;
      const result = await router!.capture(e.target.files[0]);
      for (let item of result.items) {
        let _item = item as BarcodeResultItem;
        console.log(_item.text);
        this.resRef.nativeElement!.innerText += `${_item.formatString} : ${_item.text}\n`;
      }
      this.iptRef.nativeElement!.value = '';
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async ngOnDestroy() {
    (await this.pRouter)!.dispose();
    console.log('ImageCapture Component Unmount');
  }
}
