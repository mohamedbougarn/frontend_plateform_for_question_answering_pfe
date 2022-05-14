import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }



  
  AddApi(id_client:any,key:any){
    this.headers.append('Content-Type', 'application/json');
        return this.http
          .put<any>(this.url+'api/add',{id_client,key})
          .pipe(map(res => {  
          return res ;                    
    })); 
}


GetApi(id_client:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'api/get',{id_client})
        .pipe(map(res => {  
        return res ;                    
  })); 
}


}
