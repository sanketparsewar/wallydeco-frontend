import { Component, OnInit } from '@angular/core';
import { ScrollCarouselComponent } from '../../component/scroll-carousel/scroll-carousel.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FaqComponent } from '../../component/faq/faq.component';
import { FeaturesComponent } from '../../component/features/features.component';
import { AbstractFrameComponent } from '../../component/abstract-frame/abstract-frame.component';
import { TopPickedWallpapersComponent } from '../../component/top-picked-wallpapers/top-picked-wallpapers.component';
import { StoryComponent } from '../../component/story/story.component';
import { FollowComponent } from '../../component/follow/follow.component';

@Component({
  selector: 'app-home',
  imports: [
    ScrollCarouselComponent,
    TopPickedWallpapersComponent,
    StoryComponent,
    AbstractFrameComponent,
    FeaturesComponent,
    FaqComponent,
    FollowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // wallpapers = [
  //   { img: 'w11.jpg', title: 'Dreamscape Delight' },
  //   { img: 'w12.jpg', title: 'Luxury Linen Elegance' },
  //   { img: 'w13.jpg', title: 'Vintage Floral Charm' },
  //   { img: 'w15.jpg', title: 'Geometric Fusion' },
  //   { img: 'w20.jpg', title: 'Modern Minimalist' },
  //   { img: 'w21.jpg', title: "Nature's Embrace" },
  //   { img: 'w22.jpg', title: 'Urban Chic' },
  //   { img: 'w23.jpg', title: 'Artistic Abstract' },
  // ];

  jobSteps = ['DECO', 'ART', 'PAPER'];
  stepIndex = 0;
  textIndex = 0;
  currentText = '';
  isDeleting = false;

  constructor() {}

  ngOnInit(): void {
    this.createAnimationInput();
    this.typeWriterEffect();
  }

  createAnimationInput(): void {
    const animationInput = document.createElement('input');
    animationInput.setAttribute('name', 'animation');
    animationInput.setAttribute('type', 'hidden');
    document.body.append(animationInput);
  }

  typeWriterEffect(): void {
    const jobElement = document
      .getElementById('typewriter')
      ?.querySelector('span');

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
