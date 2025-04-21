import { Routes } from '@angular/router';
import { profileGuard } from './shared/guards/profile/profile.guard';
import { authGuard } from './shared/guards/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./core/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'floral',
        loadComponent: () =>
          import('./core/floral/floral.component').then((m) => m.FloralComponent)
      },
      {
        path: 'frames',
        loadComponent: () =>
          import('./core/frames/frames.component').then((m) => m.FramesComponent)
      },
      {
        path: 'trending',
        loadComponent: () =>
          import('./core/trending/trending.component').then((m) => m.TrendingComponent)
      },
      {
        path: 'favourite',
        canActivate: [profileGuard],
        loadComponent: () =>
          import('./core/favourite/favourite.component').then((m) => m.FavouriteComponent)
      },
      {
        path: 'wallpaper/:wallpaperId',
        loadComponent: () =>
          import('./core/wallpaper/wallpaper.component').then((m) => m.WallpaperComponent),
      },
      {
        path: 'user',
        children: [{
          path: 'profile',
          canActivate: [profileGuard],
          loadComponent: () =>
            import('./core/profile/profile.component').then((m) => m.ProfileComponent)
        },
        {
          path: 'orders',
          canActivate: [profileGuard],
          loadComponent: () =>
            import('./core/orders/orders.component').then((m) => m.OrdersComponent)
        },
        {
          path: 'order-details/:id',
          canActivate: [profileGuard],
          loadComponent: () =>
            import('./core/orderDetails/orderDetails.component').then((m) => m.OrderDetailsComponent)
        },

        {
          path: 'admin-dashboard',
          // canActivate: [profileGuard],
          loadComponent: () =>
            import('./core/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
        },
        ]
      },

      {
        path: 'cart',
        canActivate: [profileGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./core/cart/cart.component').then((m) => m.CartComponent),
          },
          {
            path: 'checkout',
            loadComponent: () =>
              import('./core/checkout/checkout.component').then((m) => m.CheckoutComponent)
          }
        ]
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'login',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./core/auth/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

