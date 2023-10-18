export class Productos {
  _id?: string;
  nombre: string;
  descripcion: string;
  sku: number;
  imagen: string;
  precio: number;
  stock: number;
  categoria: string;

  constructor(id: string, nombre: string, descripcion: string, sku: number, imagen: string, precio: number, stock: number, categoria: string) {
    this._id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.sku = sku;
    this.imagen = imagen;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
  }
}
