import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url ="http://localhost:8080/api/v1";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

// Estamos accediendo a los productos 
  getProducts(){
    const endpoint =`${base_url}/products`;
    return this.http.get(endpoint)
  }

  // Agregar productos 

  saveProduct(body: any){
    const endpoint =`${base_url}/products`;
    return this.http.post(endpoint, body);
  }

    // Actualizar las productos
    updateProduct(body: any, id: any){
      const endpoint = `${base_url}/products/${id}`;
      return this.http.put(endpoint, body);
    }

     // Eliminar productos
    deleteProduct(id: any){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  } 


  // Buscar producto por nombre 
  getProductByName(name: any){
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }
}
