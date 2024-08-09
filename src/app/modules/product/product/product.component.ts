import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from '../../category/components/category/category.component';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions' ];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
      .subscribe( data => {
        console.log("respuesta de productos: ", data);
        this.proccessProductResponse(data);
      }, (error: any) => {
        console.log("error en productos: ", error);
      })
    
  }

  proccessProductResponse (resp: any){
    const dateProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00"){
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+ element.picture;
        dateProduct.push(element);
      });

      // seteamos el datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

}

export interface  ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
