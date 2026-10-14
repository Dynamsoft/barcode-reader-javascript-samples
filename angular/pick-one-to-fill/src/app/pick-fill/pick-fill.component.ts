import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CameraEnhancer, CameraView, CaptureVisionRouter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-pick-fill',
  templateUrl: './pick-fill.component.html',
  styleUrls: ['./pick-fill.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PickFillComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  fields = { sn: '', mac: '', eid: '' };
  activeField: string | null = null;
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
            if (result.barcodeResultItems.length > 0 && this.activeField) {
              const text = result.barcodeResultItems[0].text;
              this.ngZone.run(() => {
                (this.fields as any)[this.activeField!] = text;
                this.scanning = false;
              });
              await this.cvRouter!.stopCapturing();
              await this.cameraEnhancer!.close();
            }
          },
        });
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  async scanForField(field: string) {
    this.activeField = field;
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
