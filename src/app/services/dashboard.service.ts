import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }






}
