import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPickedWallpapersComponent } from './top-picked-wallpapers.component';

describe('TopPickedWallpapersComponent', () => {
  let component: TopPickedWallpapersComponent;
  let fixture: ComponentFixture<TopPickedWallpapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPickedWallpapersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPickedWallpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
