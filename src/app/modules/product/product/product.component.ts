import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) {}
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

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
        // element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'+ element.picture;
        dateProduct.push(element);
      });

      // seteamos el datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Producto Agregado", "Exitos0");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar el producto", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

  edit(id:number, name: string, price: number, account: number, category: any){
    const dialogRef = this.dialog.open(NewProductComponent , {
      width: '450px',
      data: {id: id, name: name, price:price, account:account, category:category }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Producto editado", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al editar el producto", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
      data: {id: id, module: "product" }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("Producto Eliminado", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar un producto", "Error");
      }
    });
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
