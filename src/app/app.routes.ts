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
import { CartComponent } from './core/cart/cart.component';
import { FavouriteComponent } from './core/favourite/favourite.component';
import { profileGuard } from './shared/guards/profile/profile.guard';
import { authGuard } from './shared/guards/auth/auth.guard';
import { CheckoutComponent } from './core/checkout/checkout.component';

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
      { path: 'favourite', component: FavouriteComponent },
      {
        path: 'wallpaper/:wallpaperId',
        component: WallpaperComponent,
      },
      {
        path: 'user',
        children: [{
          path: 'profile',
        canActivate: [profileGuard],
          component: ProfileComponent
        },
        {
          path: 'admin-dashboard',
        // canActivate: [profileGuard],
          component: AdminDashboardComponent,
        },
        ]
      },

      {
        path: 'cart',
        canActivate: [profileGuard],
        children: [
          {
            path: '',
            component: CartComponent
          },
          {
            path: 'checkout',
            component: CheckoutComponent
          }
        ]
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [authGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        canActivate: [authGuard],
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

