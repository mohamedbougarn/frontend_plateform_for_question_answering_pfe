import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }


  loginClient(email_client :any, password_client :any){
        this.headers.append('Content-Type', 'application/json');
            return this.http
              .put<any>(this.url+'login',{email_client , password_client})
              .pipe(map(res => {  
              return res ;                    
        })); 
    }


    getClient(id_client :any){
      this.headers.append('Content-Type', 'application/json');
          return this.http
            .put<any>(this.url+'client/get',{id_client})
            .pipe(map(res => {  
            return res ;                    
      })); 
  }

}
