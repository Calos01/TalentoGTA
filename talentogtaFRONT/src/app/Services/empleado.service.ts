import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoCreate } from '../Interfaces/empleado';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private ip:string = environment.endPoint;
  private url:string = this.ip + '/empleados';

  constructor(
    private http: HttpClient    
  ) {}
  
  // return this.http.get<Empleado[]>(
  //   `${this.url}`
  // );
  getListEmpleados(filters: any = {}): Observable<Empleado[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });
    return this.http.get<Empleado[]>(`${this.url}`, { params });
  }
  getEmpleadoId(id:number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.url}/${id}`);
  }

  addEmpleado(empleado:EmpleadoCreate): Observable<EmpleadoCreate> {
    return this.http.post<EmpleadoCreate>(
      `${this.url}`,empleado
    );
  }

  updateEmpleado(idemp:number, emp:EmpleadoCreate): Observable<EmpleadoCreate> {
    return this.http.put<EmpleadoCreate>(
      `${this.url}/${idemp}`, emp
    );
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
