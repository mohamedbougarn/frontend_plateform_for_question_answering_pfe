import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();



  constructor(public http: HttpClient) { }


  GetLanguage(id_langue:any){
    this.headers.append('Content-Type', 'application/json');
        return this.http
          .put<any>(this.url+'langue/get',{id_langue})
          .pipe(map(res => {  
          return res ;                    
    })); 
}

}
