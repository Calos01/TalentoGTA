import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { TipoIdentificacionService } from 'src/app/Services/tipo-identificacion.service';
import { AreaService } from 'src/app/Services/area.service';
import { Empleado, EmpleadoCreate } from 'src/app/Interfaces/empleado';
import { PaiseService } from 'src/app/Services/paise.service';
import { Paise } from 'src/app/Interfaces/paise';
import { TipoIdentificacion } from 'src/app/Interfaces/tipo-identificacion';
import { Area } from 'src/app/Interfaces/area';
import { fechaIngresoValidator } from 'src/app/validators/fecha-ingreso.validator';

@Component({
  selector: 'app-agregar-editar-empleado',
  templateUrl: './agregar-editar-empleado.component.html',
  styleUrls: ['./agregar-editar-empleado.component.css']
})
export class AgregarEditarEmpleadoComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id!: number;
  titulo: string = "Agregar";
  paises: Paise[] = [];
  tiposIdentificacion: TipoIdentificacion[] = [];
  areas: Area[] = [];

  constructor(
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute,
    private paiseService: PaiseService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private areaService: AreaService
  ) {    
    this.form = this.fb.group({
      primer_apellido: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Z ]*$')]], 
      segundo_apellido: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Z ]*$')]], 
      primer_nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Z ]*$')]], 
      otro_nombre: ['', [Validators.maxLength(50), Validators.pattern('^[A-Z ]*$')]],
      paise_id: ['', Validators.required],
      tipo_identificacion_id: ['', Validators.required],
      numero_identificacion: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9\\-]+$')]],
      fecha_ingreso: ['', [Validators.required, fechaIngresoValidator()]],
      area_id: ['', Validators.required]
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); // id del routing parsear ya que devuelve string
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.titulo = "Editar";
      this.obtenerEmpleado(this.id);
      // Agregando controles de estado y fecha_registro en modo de edición
      this.form.addControl('estado', this.fb.control({ value: '', disabled: true }));
      this.form.addControl('fecha_registro', this.fb.control({ value: '', disabled: true }));
      this.form.addControl('fecha_actualizacion', this.fb.control({ value: '', disabled: true }));
    }
    this.getPaises();
    this.getTiposIdentificacion();
    this.getAreas();
  }

  getPaises() {
    this.paiseService.getListPaises().subscribe(data => {
      this.paises = data;
    });
  }

  getTiposIdentificacion() {
    this.tipoIdentificacionService.getListTipoIdentificacion().subscribe(data => {
      this.tiposIdentificacion = data;
    });
  }

  getAreas() {
    this.areaService.getListArea().subscribe(data => {
      this.areas = data;
    });
  }

  obtenerEmpleado(id: number) {
    this._empleadoService.getEmpleadoId(id).subscribe(data => {
      // const fechaRegistro = new Date(data.created_at);
      this.form.setValue({
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido,
        primer_nombre: data.primer_nombre,
        otro_nombre: data.otro_nombre,
        paise_id: data.paise_id,
        tipo_identificacion_id: data.tipo_identificacion_id,
        numero_identificacion: data.numero_identificacion,
        fecha_ingreso: data.fecha_ingreso,
        area_id: data.area_id,
        estado: data.estado,
        fecha_registro: data.created_at,
        fecha_actualizacion: data.updated_at
      });
    });
  }

  agregarEditarEmpleado() {
    if (this.form.invalid) {
      return;
    }

    const empleado: EmpleadoCreate = this.form.value;
    
    this.loading = true;
    
    if (this.id !== 0) {
      this.editarEmpleado(this.id, empleado);
    } else {
      empleado.estado = 'Activo'; 
      this.agregarEmpleado(empleado);
    }
  }

  editarEmpleado(id: number, empleado: EmpleadoCreate) {
    // empleado.id = this.id; // tienes que setear el id porque si no su id será 0 por defecto
    this._empleadoService.updateEmpleado(id, empleado).subscribe(() => {
      this.router.navigate(['/ListadoEmpleado']); // para volver al listado
      this.mensajeAgregado('actualizado');
    });
  }

  agregarEmpleado(empleado: EmpleadoCreate) {
    this._empleadoService.addEmpleado(empleado).subscribe(data => {
      this.router.navigate(['/ListadoEmpleado']); // para volver al listado
      this.mensajeAgregado('agregado');
    });
  }

  mensajeAgregado(texto: string) {
    this._snackBar.open(`Empleado ${texto} exitosamente`, "", {
      duration: 4000,
      horizontalPosition: 'end'
    }); 
  }
}