import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  
  url = environment.URL_CORE;
  headers = new HttpHeaders();
  
  
  constructor(public http:HttpClient) { }


  //sera modifier et ajouter la reponse apres le vas et vien de python 
AddVisiteur_Context_conversation(id_context:any,question:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'visiteur_conversation/add',{id_context,question})
        .pipe(map(res => {  
        return res ;                    
  })); 
}


GetVisiteur_Context_conversation(id_context:any){
  this.headers.append('Content-Type', 'application/json');
      return this.http
        .put<any>(this.url+'visiteur_conversation/get',{id_context})
        .pipe(map(res => {  
        return res ;                    
  })); 
}

}
