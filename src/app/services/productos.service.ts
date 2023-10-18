import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Productos} from "../models/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // url = 'http://192.168.1.161:3000/api/productos';
  url = 'https://test-node-1.onrender.com/api/productos';
  constructor(private http: HttpClient) {
  }

  getProductos(query?:any): Observable<any> {
    return this.http.get(this.url, {params: query});
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  actualizarProducto(id: string, producto: Productos): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
