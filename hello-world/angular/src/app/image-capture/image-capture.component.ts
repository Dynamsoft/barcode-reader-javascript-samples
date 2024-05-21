import { Component, ViewChild, ElementRef } from '@angular/core';
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent {

  @ViewChild('resDiv') resDiv?: ElementRef<HTMLDivElement>;

  pCvRouter?: Promise<CaptureVisionRouter>;
  bDestoried = false;

  captureImage = async (e: Event) => {
    let files = [...(e.target! as HTMLInputElement).files as any as File[]];
    (e.target! as HTMLInputElement).value = '';
    this.resDiv!.nativeElement.innerText = "";
    try {
      const cvRouter = await (this.pCvRouter = this.pCvRouter || CaptureVisionRouter.createInstance());
      if (this.bDestoried) return;
      
      for(let file of files){
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (this.bDestoried) return;
  
        if(files.length > 1){
          this.resDiv!.nativeElement.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
          let item = _item as BarcodeResultItem;
          this.resDiv!.nativeElement.innerText += item.text + "\n";
          console.log(item.text);
        }
        if (!result.items.length) this.resDiv!.nativeElement.innerText += 'No barcode found\n';
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  async ngOnDestroy() {
    this.bDestoried = true;
    if(this.pCvRouter){
      try{
        (await this.pCvRouter).dispose();
      }catch(_){}
    }
  }
}
