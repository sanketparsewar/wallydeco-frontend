import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesComponent } from './frames.component';

describe('FramesComponent', () => {
  let component: FramesComponent;
  let fixture: ComponentFixture<FramesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FramesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
