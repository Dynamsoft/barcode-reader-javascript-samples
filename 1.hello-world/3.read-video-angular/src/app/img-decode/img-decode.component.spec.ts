import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDecodeComponent } from './img-decode.component';

describe('HelloWorldComponent', () => {
  let component: ImgDecodeComponent;
  let fixture: ComponentFixture<ImgDecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgDecodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgDecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
