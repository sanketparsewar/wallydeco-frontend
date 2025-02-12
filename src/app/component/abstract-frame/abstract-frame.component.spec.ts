import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFrameComponent } from './abstract-frame.component';

describe('AbstractFrameComponent', () => {
  let component: AbstractFrameComponent;
  let fixture: ComponentFixture<AbstractFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
