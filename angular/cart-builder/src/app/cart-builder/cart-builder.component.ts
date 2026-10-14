import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

interface CartItem { text: string; count: number; format: string; }

@Component({
  selector: 'app-cart-builder',
  templateUrl: './cart-builder.component.html',
  styleUrls: ['./cart-builder.component.css'],
  standalone: true,
})
export class CartBuilderComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  items: CartItem[] = [];
  scanning = false;
  isDisposed = false;
  pInit: Promise<void> | null = null;
  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  get totalItems() {
    return this.items.reduce((s, i) => s + i.count, 0);
  }

  ngAfterViewInit() {
    this.pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (this.isDisposed) return;

        this.cameraViewContainer!.nativeElement.append(this.cameraEnhancer.getUIElement());
        this.cameraEnhancer.setVideoFit('cover');

        this.cvRouter = await CaptureVisionRouter.createInstance();
        this.cvRouter.setInput(this.cameraEnhancer);

        await this.cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            this.ngZone.run(() => {
              for (const item of result.barcodeResultItems) {
                const existing = this.items.find((i) => i.text === item.text);
                if (existing) {
                  existing.count++;
                } else {
                  this.items.push({ text: item.text, count: 1, format: item.formatString });
                }
              }
            });
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        filter.enableResultDeduplication('barcode', true);
        await this.cvRouter.addResultFilter(filter);
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
  }

  async toggleScan() {
    await this.pInit;
    if (!this.cvRouter || !this.cameraEnhancer) return;
    if (this.scanning) {
      await this.cvRouter.stopCapturing();
      await this.cameraEnhancer.close();
      this.scanning = false;
    } else {
      await this.cameraEnhancer.open();
      await this.cvRouter.startCapturing('ReadBarcodes_SpeedFirst');
      this.scanning = true;
    }
  }

  clearCart() {
    this.items = [];
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
