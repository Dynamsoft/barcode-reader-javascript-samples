import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDecodeComponent } from './video-decode.component';

describe('VideoDecodeComponent', () => {
  let component: VideoDecodeComponent;
  let fixture: ComponentFixture<VideoDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDecodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
