import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-floral',
  imports: [],
  templateUrl: './floral.component.html',
  styleUrl: './floral.component.css',
})
export class FloralComponent implements OnInit {
  flowerImages: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateFloralCollection();
  }

  generateFloralCollection(): void {
    const container = document.getElementById('floralCollection');

    if (!container) {
      console.error('Container element not found.');
      return;
    }

    // Generate array of image names
    for (let i = 1; i <= 25; i++) {
      this.flowerImages.push(`pushpa_${i}.jpg`);
    }

    // Create and append image elements
    this.flowerImages.forEach((img, index) => {
      const item = `
        <div class="item features-image col-12 col-md-6 col-lg-3">
          <div class="item-wrapper">
            <div class="item-img mb-3">
              <img src="assets/images/wallpapers/pushpa/${img}" alt="Try Refreshing this site..." data-slide-to="3" data-bs-slide-to="4">
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
