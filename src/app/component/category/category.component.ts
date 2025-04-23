import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [LoaderComponent,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  tableData: any;
  isLoaded: boolean = false;
  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.getAllCategories()
   }

  getAllCategories() {
    this.categoryService.categories$.subscribe({
      next: (data: any) => {
        this.tableData = data;
      }
    })
  }
}
