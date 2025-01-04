import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollCarouselComponent } from './scroll-carousel.component';

describe('ScrollCarouselComponent', () => {
  let component: ScrollCarouselComponent;
  let fixture: ComponentFixture<ScrollCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
