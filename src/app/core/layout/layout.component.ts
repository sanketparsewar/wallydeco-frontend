import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../../component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, RouterOutlet, RouterLink,CommonModule,FormsModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  currentRoute: String='';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {  }
  ngOnInit() {
  //   this.currentRoute='home'
  //   console.log(this.currentRoute);
  //  this.router.events.pipe(
  //   filter(event => event instanceof NavigationEnd)
  // ).subscribe((event: NavigationEnd) => {
  //   this.currentRoute = event.urlAfterRedirects.split('/')[1] || ''; // Handle base route
  // });
  }
  

  closeNavbar() {
    const navbar = document.getElementById('navbarSupportedContent');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
