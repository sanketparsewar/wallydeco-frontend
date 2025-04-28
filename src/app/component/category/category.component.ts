import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-category',
  imports: [LoaderComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  tableData: any;
  isLoaded: boolean = false;
  categoryForm!: FormGroup;
  constructor(private categoryService: CategoryService, private fb: FormBuilder,private alertService:AlertService) {

  }
  ngOnInit(): void {
    this.getAllCategories()
    this.categoryForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }

  getAllCategories() {
    this.categoryService.categories$.subscribe({
      next: (data: any) => {
        this.tableData = data;
      }
    })
  }

  addNewCategory() {
    this.isLoaded = true;
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (data: any) => {
        this.categoryService.getAllCategories().subscribe()
        this.categoryForm.reset();
        this.isLoaded = false;
        this.alertService.showSuccess('Added new category');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }

  editCategory(item: any) {
    this.categoryForm.patchValue({
      _id: item._id,
      name: item.name,
    })
  }

  cancle(){
    this.categoryForm.reset();
  }

  onUpdateCategory() {
    this.isLoaded = true;
    this.categoryService.updateCategory(this.categoryForm.value._id, this.categoryForm.value).subscribe({
      next: (data: any) => {
        this.categoryService.getAllCategories().subscribe()
        this.isLoaded = false;
        this.categoryForm.reset();
        this.alertService.showSuccess('Updated category');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }


  onDeleteCategory(id: string) {
    this.isLoaded = true;
    this.categoryService.deleteCategory(id).subscribe({
      next: (data: any) => {
        this.categoryService.getAllCategories().subscribe()
        this.isLoaded = false;
        this.alertService.showSuccess('Deleted category');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }


}
