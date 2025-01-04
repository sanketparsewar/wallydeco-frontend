import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent,RouterLink,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
