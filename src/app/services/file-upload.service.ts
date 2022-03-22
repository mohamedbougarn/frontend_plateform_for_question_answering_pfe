import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  url = environment.URL_CORE;
  headers = new HttpHeaders();

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file:any):Observable<any> {//file 
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.url+'api/upload', formData)
}
}
