import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-wallydeco';
  constructor(private userService: UserService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getUser()
    this.getAllCategories()
  }


  getUser() {
    this.userService.getLoggedUser().subscribe({
      next: () => console.log('Session restored'),
      error: () => console.log('No active session'),
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: () => console.log('categories fetched'),
      error: () => console.log('error fetching categories'),
    });
  }

}
