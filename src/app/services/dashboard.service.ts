import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class DashboardService 
{

  url = environment.URL_CORE; 
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }



  /**
 * for get count of context
*/
GetCountContext(id_client:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'context/count',{id_client})
        .pipe(map(res => {  
        return res ;                    
  })); 
}



 /**
 * for get count of context convertaion
*/
GetCountContextConvertation(id_client:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'context_conversation/count',{id_client})
        .pipe(map(res => {  
        return res ;                    
  })); 
}




 /**
 * for get count of context convertaion
*/
GetCountClient(){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'client/count',{})
        .pipe(map(res => {  
        return res ;                    
  })); 
}


}
