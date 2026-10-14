import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

const DATABASE: Record<string, string> = {
  '978-0-13-468599-1': 'The Pragmatic Programmer',
  '978-0-596-51774-8': 'JavaScript: The Good Parts',
  '978-1-491-95028-2': 'Fluent Python',
  '4006381333931': 'USB Cable',
  '5901234123457': 'Dark Chocolate Bar',
};

@Component({
  selector: 'app-scan-search',
  templateUrl: './scan-search.component.html',
  styleUrls: ['./scan-search.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ScanSearchComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  query = '';
  match: string | null = null;
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
                this.query = text;
                this.match = DATABASE[text] || null;
                this.scanning = false;
              });
              await this.cvRouter!.stopCapturing();
              await this.cameraEnhancer!.close();
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        await this.cvRouter.addResultFilter(filter);
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  async startScan() {
    this.match = null;
    this.scanning = true;
    await this.pInit;
    if (!this.cvRouter || !this.cameraEnhancer) return;
    await this.cameraEnhancer.open();
    await this.cvRouter.startCapturing('ReadSingleBarcode');
  }

  lookup() {
    this.match = DATABASE[this.query] || null;
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
