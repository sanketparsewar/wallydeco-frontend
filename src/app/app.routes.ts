import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/home/home.component';
import { FloralComponent } from './core/floral/floral.component';
import { FramesComponent } from './core/frames/frames.component';
import { TrendingComponent } from './core/trending/trending.component';

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
      { path: 'floral', component:FloralComponent },
      { path: 'frames', component:FramesComponent },
      { path: 'trending', component:TrendingComponent },
    ],
  },
];
