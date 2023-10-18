import {Component} from '@angular/core';
import {ProductosService} from '../../services/productos.service';
import {Productos} from "../../models/productos";
import {MatPaginatorIntl} from "@angular/material/paginator";

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
  listProductos: Productos[] = [];
  displayedColumns: string[] = [
    'nombre',
    'sku',
    'imagen',
    'precio',
    'acciones'
  ];
  length = 0;
  pageSize = 3;

  constructor(
    private _productoService: ProductosService,
    private paginator: MatPaginatorIntl
  ) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.listProductos = data.datos;
      this.length = data.total;
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

  handlePageEvent(event: any) {
    this._productoService.getProductos(event).subscribe(data => {
      this.listProductos = data.datos;
    }, (error: any) => {
      console.log(error)
    })
  }

  onChangeSearch(event: any) {
    const query = {
      search: event.target.value,
      length: this.length,
      pageSize: this.pageSize
    }
    this._productoService.getProductos(query).subscribe(data => {
      this.listProductos = data.datos;
      this.length = data.total;
    }, (error: any) => {
      console.log(error)
    })
  }
}
