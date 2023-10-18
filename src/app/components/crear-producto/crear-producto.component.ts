import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Productos} from "../../models/productos";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductosService} from "../../services/productos.service";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  productoForm: FormGroup
  titulo = 'CREAR PRODUCTO'
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductosService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      sku: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      categoria: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditarProducto();
  }

  agregarProducto() {
    const producto: Productos = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      sku: this.productoForm.get('sku')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      precio: this.productoForm.get('precio')?.value,
      stock: this.productoForm.get('stock')?.value,
      categoria: this.productoForm.get('categoria')?.value
    }
    console.log(this.id)
    if (this.id !== null) {
      this._productoService.actualizarProducto(this.id, producto).subscribe(data => {
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto Actualizado!');
        this.router.navigate(['/'])
        this.productoForm.reset();
      }, (error: any) => {
        console.log(error)
      })
    } else {
      this._productoService.crearProducto(producto).subscribe(data => {
        this.toastr.success('Producto agregado con éxito!', 'Éxito!');
        this.router.navigate(['/'])
        this.productoForm.reset();
      }, (error: any) => {
        console.log(error)
      })
    }
  }

  obtenerProducto(id: string) {
    this._productoService.obtenerProducto(id).subscribe(data => {
      this.productoForm.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        sku: data.sku,
        imagen: data.imagen,
        precio: data.precio,
        stock: data.stock,
        categoria: data.categoria
      })
    }, (error: any) => {
      console.log(error)
    })
  }

  esEditarProducto() {
    if (this.id !== null) {
      this.titulo = 'EDITAR PRODUCTO'
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          sku: data.sku,
          imagen: data.imagen,
          precio: data.precio,
          stock: data.stock,
          categoria: data.categoria
        })
      }, (error: any) => {
        console.log(error)
      })
    }
  }
}
