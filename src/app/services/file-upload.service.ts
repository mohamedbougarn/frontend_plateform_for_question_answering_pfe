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
  upload(file:File):Observable<any> {//file 
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("image", file);// , file.name
      console.log("form data =",formData)
      console.log("file name =", file.name)
    // Make http post request over api
    // with formData as req
    console.log("last etap of service upload image ",this.http.post(this.url+'api/upload',formData))
    return this.http.post(this.url+'api/upload',formData)
    
}
}
