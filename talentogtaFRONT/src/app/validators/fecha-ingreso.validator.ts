import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fechaIngresoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaIngreso = new Date(control.value);
    const fechaActual = new Date();
    const haceUnMes = new Date();
    haceUnMes.setMonth(fechaActual.getMonth() - 1);

    if (isNaN(fechaIngreso.getTime())) {
      // Si la fecha no es válida, retorna null
      return null;
    }

    if (fechaIngreso > fechaActual) {
      return { fechaIngresoInvalida: 'La fecha de ingreso no puede ser superior a la fecha actual.' };      
    }

    if (fechaIngreso < haceUnMes) {
      return { fechaIngresoInvalida: 'La fecha de ingreso no puede ser anterior a un mes desde hoy.' };
    }

    return null;
  };
}