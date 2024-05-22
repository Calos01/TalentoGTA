import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paise } from '../Interfaces/paise';

@Injectable({
  providedIn: 'root'
})
export class PaiseService {

  private ip = environment.endPoint
  private url = this.ip + '/paises';

  constructor(
    private http: HttpClient    
  ) {}

  getListPaises(): Observable<Paise[]> {
    return this.http.get<Paise[]>(
      `${this.url}`
    );
  }
}
