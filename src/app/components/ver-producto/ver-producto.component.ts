import {Component} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Productos} from "../../models/productos";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent {
  producto: Productos = {
    _id: '',
    nombre: '',
    descripcion: '',
    sku: 0,
    imagen: '',
    precio: 0,
    stock: 0,
    categoria: ''
  }
  id: string | null;

  constructor(
    private _productoService: ProductosService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this._productoService.obtenerProducto(this.id).subscribe(data => {
      this.producto = data;
    }, (error: any) => {
      console.log(error)
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.info('El producto fue eliminado con éxito!', 'Producto Eliminado!');
      this.router.navigate(['/'])
    }, (error: any) => {
      console.log(error)
    })
  }

  formatearNumero(numero: number) {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, //(esto es suficiente para números enteros, pero imprimirá 3500,10 como $3500,1)
      maximumFractionDigits: 0, // (hace que 3500,99 se imprima como $2501)
    });
    return formatter.format(numero);
  }
}
