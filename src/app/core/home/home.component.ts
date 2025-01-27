import { Component, OnInit } from '@angular/core';
import { ScrollCarouselComponent } from '../../component/scroll-carousel/scroll-carousel.component';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [ScrollCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  wallpapers = [
    { img: "w11.jpg", title: "Dreamscape Delight" },
    { img: "w12.jpg", title: "Luxury Linen Elegance" },
    { img: "w13.jpg", title: "Vintage Floral Charm" },
    { img: "w15.jpg", title: "Geometric Fusion" },
    { img: "w20.jpg", title: "Modern Minimalist" },
    { img: "w21.jpg", title: "Nature's Embrace" },
    { img: "w22.jpg", title: "Urban Chic" },
    { img: "w23.jpg", title: "Artistic Abstract" },
  ];

  jobSteps = ["DECO", "ART", "PAPER"];
  stepIndex = 0;
  textIndex = 0;
  currentText = '';
  isDeleting = false;

  constructor() {}

  ngOnInit(): void {
    this.generateTopPickedWallpapers();
    this.createAnimationInput();
    this.typeWriterEffect();
  }

  generateTopPickedWallpapers(): void {
    const container = document.getElementById('topPickedWallpapers');

    if (!container) {
      console.error('Container element not found.');
      return;
    }

    this.wallpapers.forEach((wallpaper) => {
      const item = `
        <div class="item features-image col-12 col-md-6 col-lg-3">
          <div class="item-wrapper">
            <div class="item-img mb-3">
              <img src="assets/images/wallpapers/${wallpaper.img}" alt="Try Refreshing this site..." data-slide-to="3" data-bs-slide-to="4">
            </div>
            <div class="item-content align-left">
              <h5 class="item-title mbr-fonts-style mb-3 mt-0 display-7">
                <strong>${wallpaper.title}</strong>
              </h5>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += item;
    });
  }

  createAnimationInput(): void {
    const animationInput = document.createElement('input');
    animationInput.setAttribute('name', 'animation');
    animationInput.setAttribute('type', 'hidden');
    document.body.append(animationInput);
  }

  typeWriterEffect(): void {
    const jobElement = document.getElementById('typewriter')?.querySelector('span');

    if (!jobElement) {
      console.error('Typewriter element not found.');
      return;
    }

    const updateText = () => {
      const currentJob = this.jobSteps[this.stepIndex];

      if (this.isDeleting) {
        this.currentText = currentJob.slice(0, --this.textIndex);
      } else {
        this.currentText = currentJob.slice(0, ++this.textIndex);
      }

      jobElement.textContent = this.currentText;

      let typeSpeed = 150;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      if (!this.isDeleting && this.currentText === currentJob) {
        this.isDeleting = true;
        typeSpeed = 500;
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.stepIndex = (this.stepIndex + 1) % this.jobSteps.length;
        typeSpeed = 200;
      }

      setTimeout(updateText, typeSpeed);
    };

    updateText();
  }
}
