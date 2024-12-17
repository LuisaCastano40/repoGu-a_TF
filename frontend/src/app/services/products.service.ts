import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {}

  httpClient = inject(HttpClient);

  API_URL_GET = 'http://localhost:3000/obtenerProductos';
  API_URL_POST = 'http://localhost:3000/registrarProducto';
  API_URL_PUT = 'http://localhost:3000/actualizarProducto';
  API_URL_DELETE = 'http://localhost:3000/eliminarProducto';

  //obtener datos
  getProducts() {
    return this.httpClient.get(this.API_URL_GET);
  }

  //crear datos
  createProduct(producto: Productos) {
    return this.httpClient.post(this.API_URL_POST, producto);
  }

  //modificar datos
  updateProduct(id: string | undefined, producto: Productos
  ) {
    return this.httpClient.put(`${this.API_URL_PUT}/${id}`, producto);
  }

  //eliminar
  deleteProduct(id: string | undefined) {
    return this.httpClient.delete(`${this.API_URL_DELETE}/${id}`);
  }

}
