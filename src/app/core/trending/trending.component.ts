import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../component/footer/footer.component';
import { DisplayWallpaperComponent } from '../../component/display-wallpaper/display-wallpaper.component';
@Component({
  selector: 'app-trending',
  imports: [FormsModule, CommonModule, FooterComponent, DisplayWallpaperComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  category: string = 'Trending';
  constructor() { }

  ngOnInit() { }

}
