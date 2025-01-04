import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frames',
  imports: [],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent implements OnInit {
  frames = [
    { img: "10.jpg", code: "NZ-137" },
    { img: "11.jpg", code: "NZ-139" },
    { img: "12.jpg", code: "NZ-145" },
    { img: "13.jpg", code: "NZ-147" },
    { img: "14.jpg", code: "NZ-181" },
    { img: "15.jpg", code: "NZ-182" },
    { img: "16.jpg", code: "NZ-183" },
    { img: "17.jpg", code: "NZ-243" },
    { img: "18.jpg", code: "NZ-244" },
    { img: "19.jpg", code: "NZ-245" },
  ];

  constructor() {}

  ngOnInit(): void {
    this.generateAbstractFrameCollection();
  }

  generateAbstractFrameCollection(): void {
    const container = document.getElementById('abstractFrameCollection');
    
    if (!container) {
      console.error('Container element not found.');
      return;
    }

    this.frames.forEach((frame) => {
      const item = `
        <div class="item features-image col-12 col-md-6 col-lg-3">
          <div class="item-wrapper">
            <div class="item-img mb-3">
              <img src="assets/images/wallyart/${frame.img}" alt="Try Refreshing this site..." data-slide-to="3" data-bs-slide-to="4">
            </div>
            <div class="item-content align-left">
              <h5 class="item-title mbr-fonts-style mb-3 mt-0 display-7">
                <!-- ${frame.code} -->
              </h5>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += item;
    });
  }
}
