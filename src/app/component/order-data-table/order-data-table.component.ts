import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-data-table',
  imports: [LoaderComponent,CommonModule],
  templateUrl: './order-data-table.component.html',
  styleUrl: './order-data-table.component.css'
})
export class OrderDataTableComponent {
  isLoaded:boolean = false;

}
