import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-single-barcode',
  templateUrl: './single-barcode.component.html',
  styleUrls: ['./single-barcode.component.css'],
  standalone: true,
})
export class SingleBarcodeComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  result = '';
  scanning = false;
  isDisposed = false;
  pInit: Promise<void> | null = null;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  ngAfterViewInit() {
    this.pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (this.isDisposed) return;

        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());

        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);

        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const text = result.barcodeResultItems[0].text;
              this.ngZone.run(() => {
                this.result = text;
                this.scanning = false;
              });
              await this.cvRouter!.stopCapturing();
              await this.cameraEnhancer!.close();
            }
          },
        });
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();
  }

  async startScan() {
    this.result = '';
    this.scanning = true;
    await this.pInit;
    if (!this.cvRouter || !this.cameraEnhancer) return;
    await this.cameraEnhancer.open();
    await this.cvRouter.startCapturing('ReadSingleBarcode');
  }

  ngOnDestroy() {
    this.isDisposed = true;
    this.cameraEnhancer?.getUIElement().remove();
    this.pInit?.then(() => {
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    });
  }
}
