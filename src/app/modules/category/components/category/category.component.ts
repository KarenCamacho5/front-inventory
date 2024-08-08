import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) {}

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {

    this.categoryService.getCategories()
      .subscribe( (data:any) => {

        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);

      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }
}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}

