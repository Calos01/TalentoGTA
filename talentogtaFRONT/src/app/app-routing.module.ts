import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { AgregarEditarEmpleadoComponent } from './components/agregar-editar-empleado/agregar-editar-empleado.component';

const routes: Routes = [
  {path:'', redirectTo:'ListEmpleado', pathMatch:'full'},
  {path:'ListEmpleado',component:ListEmpleadoComponent},
  // {path:'VerMascota/:id',component:VerMascotaComponent},
  {path:'editarempleado/:id',component:AgregarEditarEmpleadoComponent},
  {path:'agregarempleado',component:AgregarEditarEmpleadoComponent},
  {path:'**', redirectTo:'ListEmpleado', pathMatch:'full'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
