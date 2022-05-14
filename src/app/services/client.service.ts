import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }


  AddClient(nom_client :any, prenom_client :any, mobile_client :any,email_client :any, password_client:any){
        this.headers.append('Content-Type', 'application/json');
            return this.http
              .put<any>(this.url+'client/add',{nom_client , prenom_client , mobile_client ,email_client , password_client})
              .pipe(map(res => {  
              return res ;                    
        })); 
    }



    GetClient(id_client :any){
      this.headers.append('Content-Type', 'application/json');
          return this.http
            .put<any>(this.url+'client/get',{id_client})
            .pipe(map(res => {  
            return res ;                    
      })); 
  }
}
