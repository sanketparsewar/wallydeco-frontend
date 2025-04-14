import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  currentRoute: String = '';
  loggedUser: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // this.getLoggedUser()
  }
  getLoggedUser() {
    this.authService.getLoggedUser().subscribe({
      next: (data: any) => {
        this.loggedUser = data.user;
      },
    });
  }
  closeNavbar() {
    const navbar = document.getElementById('navbarSupportedContent');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
