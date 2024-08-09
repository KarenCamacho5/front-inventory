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

    // Actualizar las categorias
    updateProduct(body: any, id: any){
      const endpoint = `${base_url}/products/${id}`;
      return this.http.put(endpoint, body);
    }
}
