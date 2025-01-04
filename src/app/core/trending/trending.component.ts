import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {
  trendImages: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateTrendingCollection();
  }

  generateTrendingCollection(): void {
    const container = document.getElementById('trendingCollection');
    
    if (!container) {
      console.error('Container element not found.');
      return;
    }

    // Generate array of image names
    for (let i = 8; i <= 36; i++) {
      // Skip page 11 as it's not in the original sequence
      if (i !== 11) {
        this.trendImages.push(`TRENDS_page-00${i.toString().padStart(2, '0')}.jpg`);
      }
    }

    // Create and append image elements
    this.trendImages.forEach((img, index) => {
      const item = `
        <div class="item features-image col-12 col-md-6 col-lg-3">
          <div class="item-wrapper">
            <div class="item-img mb-3">
              <img src="assets/images/wallpapers/trends/${img}" alt="Try Refreshing this site..." data-slide-to="3" data-bs-slide-to="4">
            </div>
            <div class="item-content align-left">
              <h5 class="item-title mbr-fonts-style mb-3 mt-0 display-7">
                <!-- NZ-${137 + index} -->
              </h5>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += item;
    });
  }

}
