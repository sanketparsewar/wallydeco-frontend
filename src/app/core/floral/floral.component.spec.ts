import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloralComponent } from './floral.component';

describe('FloralComponent', () => {
  let component: FloralComponent;
  let fixture: ComponentFixture<FloralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
