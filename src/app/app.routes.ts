import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/home/home.component';
import { FloralComponent } from './core/floral/floral.component';
import { FramesComponent } from './core/frames/frames.component';
import { TrendingComponent } from './core/trending/trending.component';
import { ProfileComponent } from './core/profile/profile.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';
import { WallpaperComponent } from './core/wallpaper/wallpaper.component';
// import { profileGuard } from './shared/guards/profile/profile.guard';
// import { authGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'floral', component: FloralComponent },
      { path: 'frames', component: FramesComponent },
      { path: 'trending', component: TrendingComponent },
      {
        path:'wallpaper/:id',
        component:WallpaperComponent
      },
      {
        path: 'profile',
        // canActivate: [profileGuard],
        component: ProfileComponent,
      },
      {
        path:'admin-dashboard',
        component:AdminDashboardComponent
      }
    ],
  },
  {
    path: 'auth',
    // canActivate: [authGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
