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



  /**
 * for get count of context
*/
GetCountContext(client:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .post<any>(this.url+'context/count',{client})
        .pipe(map(res => {  
        return res ;                    
  })); 
}



 /**
 * for get count of context
*/
GetCountContextConvertation(client:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .post<any>(this.url+'context_conversation/count',{client})
        .pipe(map(res => {  
        return res ;                    
  })); 
}



}
