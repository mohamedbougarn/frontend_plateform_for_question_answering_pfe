import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  UserKey : any ='';
  id_client : any ='';
  nom_client : any ='';
  URL1 : any = 'http://127.0.0.1:3000/api/getresponse/context';
  URL2 : any = 'http://localhost:3000/textmodel2';
  URL3 : any = 'http://localhost:3000/textmodel3';

  messageinput1 ={
    "key":"ton API KEY",
    "id_context" : "Id_context",
    "question": " ton question "
};

  messageoutput1 ={"message_text":"ton question ","response":"la réponse"}


  messageinput3 ={
    "key":"ton API KEY",
    "question": " ton question "
};

  messageoutput3 ={
    "message" : "ton question",
    "response" : "response du GPT3"
  }

  input1: any;
  output1: any;
  input2: any;
  output2: any;
  input3: any;
  output3: any;
  
  constructor(public apiService : ApiService) { }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
   // Swal.fire('Hi', 'We have been copied!', 'success')
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your content is copied  ',
      showConfirmButton: false,
      timer: 1500
    })
 
    //alert('Your content is copied.\n Paste in text editor to see copied content(ctrl + V, cmd+ V)');
  }


  ngOnInit(): void {
    this.id_client=localStorage.getItem('id');
    this.nom_client=localStorage.getItem('nomuser');
    console.log(this.nom_client)
    this.Get_key_database()
    //console.log(JSON.stringify(this.messageurl1));
    this.input1 = (JSON.stringify(this.messageinput1));
    this.output1 = (JSON.stringify(this.messageoutput1));
    this.input3 = (JSON.stringify(this.messageinput3));
    this.output3 = (JSON.stringify(this.messageoutput3));


  }

  Get_key_database()
  {
   
    console.log('le id  client ===== ' , this.id_client)
    this.apiService.GetApi(this.id_client).subscribe(data => 
      {   
        console.log(data);
        this.UserKey= data[0].key;
      })



  }

  GenerateKey()
    {
     this.UserKey =  Md5.hashStr(new Date() + this.id_client+ this.nom_client ) + 'client'+this.id_client;
     console.log(this.UserKey)
     
     this.apiService.AddApi(this.id_client,this.UserKey).subscribe(data => 
      {   
        console.log("test GenerateKey");
        console.log(data);
        //this.UserKey= data[0].key;
      })
    }

    // successNotification(){
    //   Swal.fire('Hi', 'We have been informed!', 'success')
    // }
    // GenerateKey1()
    // {
    //  this.UserKey =  Md5.hashStr(new Date() +this.id_client+ this.nom_client );
    //  console.log(this.UserKey)
    // }

    /***********************************end copy**/
}
