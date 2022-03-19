import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QRService {

  url = environment.URL_CORE;
headers = new HttpHeaders();


  constructor(public http: HttpClient) {}

  GetQr(){
    this.headers.append('Content-Type', 'application/json');
        return this.http
          .get<any>(this.url+'context/get',{})
          .pipe(map(res => {  
          return res ;                    
    })); 
}


SetQr(id_context : any,question:any,reponse:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'qr/add',{id_context,question,reponse})
        .pipe(map(res => {  
        return res ;                    
  })); 
}


GetQr_by_ID_context(id_context : any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'qr/get',{id_context})
        .pipe(map(res => {  
        return res ;                    
  })); 
}



}
