import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProductosComponent} from "./components/listar-productos/listar-productos.component";
import {CrearProductoComponent} from "./components/crear-producto/crear-producto.component";
import {VerProductoComponent} from "./components/ver-producto/ver-producto.component";

const routes: Routes = [
  { path: '', component: ListarProductosComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: CrearProductoComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard de angular
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
