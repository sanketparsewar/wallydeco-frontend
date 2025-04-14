import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
  animations: [
    trigger('featureAnimation', [
      state('normal', style({
        transform: 'translateY(0)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      })),
      state('hover', style({
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      })),
      transition('normal <=> hover', animate('0.3s ease'))
    ])
  ]
})
export class FeaturesComponent {
  animationStates: string[] = [];
  features = [
    {
      icon: 'fa-palette',
      title: 'Endless Designs',
      description: 'Choose from a vast array of designs to suit every taste.'
    },
    {
      icon: 'fa-scroll',
      title: 'Paper Options',
      description: 'Customize your wallpaper with various paper types for the perfect finish.'
    },
    {
      icon: 'fa-tools',
      title: 'Easy Installation',
      description: 'Simple installation process for hassle-free decorating.'
    },
    {
      icon: 'fa-truck-fast',
      title: 'Express Shipping',
      description: 'Get your custom wallpaper delivered quickly to your doorstep.'
    },
    {
      icon: 'fa-store',
      title: 'Interactive Showroom',
      description: 'Experience our designs in our nearby showroom before making a choice.'
    },
    {
      icon: 'fa-pen-ruler',
      title: 'Easy Customization',
      description: 'Customized wallpaper designs for wall.'
    }
  ];

  ngOnInit() {
    this.animationStates = this.features.map(() => 'normal');
  }
}
