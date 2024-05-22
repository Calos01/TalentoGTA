import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombreApellido', 'tipoIdentificacion', 'nroIdentificacion', 'paisEmpleo', 'email', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  filterForm: FormGroup;
//progressbar
  loading:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private _empleadoService:EmpleadoService, public dialog: MatDialog) {
    this.filterForm = this.fb.group({
      primer_nombre: [''],
      otros_nombres: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      tipo_identificacion: [''],
      numero_identificacion: [''],
      pais_empleo: [''],
      email: [''],
      estado: ['']
    });
  }
  
  ngOnInit(): void {
    this.ObtenerEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //cambiando el label de la paginacion
    this.paginator._intl.itemsPerPageLabel="Items por pagina: "
    //ordenamiento de columnas
    this.dataSource.sort = this.sort;
  }

  
  applyFilter(event : Event) {
    const filterValue = (event.target as HTMLInputElement).value; // obtenemos valor
    // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();//filtros
  }

  ObtenerEmpleados(filters: any = {}): void {
    this.loading = true;
    this._empleadoService.getListEmpleados(filters).subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
    });
  }

  onFilter(): void {
    const filters = this.filterForm.value;
    this.ObtenerEmpleados(filters);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.ObtenerEmpleados();
  }

  deleteEmpleado(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Confirmación', message: '¿Está seguro de que desea eliminar el empleado?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._empleadoService.deleteEmpleado(id).subscribe(() => {
          this._snackBar.open('Empleado eliminado exitosamente', '', {
            duration: 3000,
            horizontalPosition: 'right',
          });
          this.ObtenerEmpleados();
        });
      }
    });
  }

}
