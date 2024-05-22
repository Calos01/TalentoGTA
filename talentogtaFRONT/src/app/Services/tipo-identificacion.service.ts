import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoIdentificacion } from '../Interfaces/tipo-identificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private ip = environment.endPoint
  private url = this.ip + '/tipoidentificacions';

  constructor(
    private http: HttpClient    
  ) {}

  getListTipoIdentificacion(): Observable<TipoIdentificacion[]> {
    return this.http.get<TipoIdentificacion[]>(
      `${this.url}`
    );
  }
}
