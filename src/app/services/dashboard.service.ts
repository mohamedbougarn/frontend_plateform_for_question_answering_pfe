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

/**
 * for get all context where type = 1  and status = 1
*/
GetContextForAllAser()
{
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'context/alluser',{})
        .pipe(map(res => {  
        return res ;                    
  })); 
}

/**
 * for get stat of context messag / date 
*/
GetStat_Msg_Date(){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .post<any>(this.url+'stat/msg_date',{})
        .pipe(map(res => {  
        return res ;                    
  })); 
}



/**
 * for get stat of top count(messag) /  context
*/
GetTop_Msg_Title(id_client :any , top : any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .post<any>(this.url+'stat/top_msg_title',{id_client,top})
        .pipe(map(res => {  
        return res ;                    
  })); 
}

}
