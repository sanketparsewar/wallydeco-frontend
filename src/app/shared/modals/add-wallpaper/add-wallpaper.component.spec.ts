import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWallpaperComponent } from './add-wallpaper.component';

describe('AddWallpaperComponent', () => {
  let component: AddWallpaperComponent;
  let fixture: ComponentFixture<AddWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWallpaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
