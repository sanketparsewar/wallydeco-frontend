import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../component/footer/footer.component';
import { DisplayWallpaperComponent } from '../../component/display-wallpaper/display-wallpaper.component';
@Component({
  selector: 'app-floral',
  imports: [FormsModule, CommonModule, FooterComponent, DisplayWallpaperComponent],
  templateUrl: './floral.component.html',
  styleUrl: './floral.component.css',
})
export class FloralComponent implements OnInit {
  category: string = 'Floral';
  constructor() { }

  ngOnInit() { }

}

