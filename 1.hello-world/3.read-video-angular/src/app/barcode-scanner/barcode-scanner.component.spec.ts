import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDecodeComponent } from './barcode-scanner.component';

describe('BarcodeScannerComponent', () => {
  let component: VideoDecodeComponent;
  let fixture: ComponentFixture<VideoDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDecodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
