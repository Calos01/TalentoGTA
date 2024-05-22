import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../Interfaces/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private ip = environment.endPoint
  private url = this.ip + '/areas';

  constructor(
    private http: HttpClient    
  ) {}

  getListArea(): Observable<Area[]> {
    return this.http.get<Area[]>(
      `${this.url}`
    );
  }
}
