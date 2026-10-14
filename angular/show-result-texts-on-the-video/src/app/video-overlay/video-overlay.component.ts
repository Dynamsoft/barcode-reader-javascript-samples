import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, EnumCapturedResultItemType, type BarcodeResultItem } from 'dynamsoft-barcode-reader-bundle';
import '../dynamsoft.config';

@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.css'],
  standalone: true,
})
export class VideoOverlayComponent {
  constructor(private ngZone: NgZone) {}
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('overlays') overlaysEl?: ElementRef<HTMLDivElement>;
  resultText = '';
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

        const cameraEnhancer = this.cameraEnhancer;

        await this.cvRouter.addResultReceiver({
          onCapturedResultReceived: (result) => {
            this.ngZone.run(() => {
              if (this.overlaysEl) this.overlaysEl.nativeElement.innerHTML = '';

              const items = result.items.filter(
                (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
              ) as BarcodeResultItem[];

              let text = '';
              for (const item of items) {
                text += `${item.formatString}: ${item.text}\n`;
                try {
                  const pts = item.location.points;
                  const clientPts = pts.map((p: any) => cameraEnhancer.convertToClientCoordinates(p));
                  const minX = Math.min(...clientPts.map((p: any) => p.x));
                  const minY = Math.min(...clientPts.map((p: any) => p.y));
                  const maxX = Math.max(...clientPts.map((p: any) => p.x));

                  const overlay = document.createElement('div');
                  overlay.style.cssText = `position:fixed;left:${minX}px;top:${minY - 24}px;max-width:${maxX - minX}px;background:rgba(254,174,55,0.9);color:#000;font:bold 11px/1.3 monospace;padding:2px 5px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
                  overlay.textContent = item.text;
                  this.overlaysEl?.nativeElement.appendChild(overlay);
                } catch (_) {}
              }
              this.resultText = text;
            });
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification('barcode', true);
        await this.cvRouter.addResultFilter(filter);

        await this.cameraEnhancer.open();
        await this.cvRouter.startCapturing('ReadBarcodes_SpeedFirst');
      } catch (ex: any) {
        alert(ex.message || ex);
      }
    })();
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
