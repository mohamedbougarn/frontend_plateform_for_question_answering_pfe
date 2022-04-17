import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContextService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }


  // GetContext(){
  //       this.headers.append('Content-Type', 'application/json');
  //           return this.http
  //             .get<any>(this.url+'context/get',{})
  //             .pipe(map(res => {  
  //             return res ;                    
  //       })); 
  //   }


    SetContext(id_context : any,text:any,id_client:any,title:any, type : any){
      this.headers.append('Content-Type', 'application/json');
          return this.http
            .put<any>(this.url+'context/add',{id_context,text,id_client,title,type})
            .pipe(map(res => {  
            return res ;                    
      })); 
  }

  UpdateContext(id_context : any,text:any,id_client:any,title:any, type : any){
    this.headers.append('Content-Type', 'application/json');
        return this.http
          .put<any>(this.url+'context/type/update',{id_context,text,id_client,title,type})
          .pipe(map(res => {  
          return res ;                    
    })); 
}

  GetByIdContext(id_context:any,id_client : any){
    this.headers.append('Content-Type', 'application/json');
        return this.http
          .put<any>(this.url+'context/get',{id_context,id_client})
          .pipe(map(res => {  
          return res ;                    
    })); 
}



}
