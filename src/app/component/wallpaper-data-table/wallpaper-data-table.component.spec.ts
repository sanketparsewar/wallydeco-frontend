import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperDataTableComponent } from './wallpaper-data-table.component';

describe('WallpaperDataTableComponent', () => {
  let component: WallpaperDataTableComponent;
  let fixture: ComponentFixture<WallpaperDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WallpaperDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallpaperDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
