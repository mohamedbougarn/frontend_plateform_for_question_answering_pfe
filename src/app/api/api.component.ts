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


end_date : any;
/**para for time */
currentDate: any;
targetDate: any;
cDateMillisecs: any;
tDateMillisecs: any;
difference: any;
seconds: any;
minutes: any;
hours: any;
days: any;
year: number = 0;
month: number =0;
months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
day: number = 0;












  UserKey : any ='';
  id_client : any ='';
  nom_client : any ='';
  methode:any ='PUT';
  URL1 : any = 'http://127.0.0.1:3000/api/getresponse/context';
  URL2 : any = 'http://127.0.0.1:3000/api/getresponse/wiki';
  URL3 : any = 'http://127.0.0.1:3000/api/getresponse/gpt3';

  messageinput1 ={
    "key":"ton API KEY",
    "id_context" : "Id_context",
    "question": "ton question",
    "lang":"fr"
};

  messageoutput1 ={"message_text":"ton question ","response":"la réponse"}

  //for wikipedia
  messageinput2 ={
    "key":"ton klé API",
    "question":"ton question",
    "lang":"en"
  };

  messageoutput2 ={
    "message": "ton question",
    "response": "la répense "
  };

  messageinput3 ={
    "key":"ton klé API",
    "question":"ton question",
    "lang":"fr"
  };

  messageoutput3 ={
    "message": "ton question",
    "response": "la répense "
  };

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
      position: 'top',
      icon: 'success',
      title: 'Your content is copied  ',
      showConfirmButton: false,
      timer: 1500
    })
 
    //alert('Your content is copied.\n Paste in text editor to see copied content(ctrl + V, cmd+ V)');
  }

  ngOnInit():void 
  {
    this.id_client=localStorage.getItem('id');


    this.apiService.GetApi(this.id_client).subscribe(data => 
      {   
        console.log(data);
        //localStorage.setItem('end-date',data[0].end_date);
        this.end_date=data[0].end_date;
        this.UserKey= data[0].key;


        this.year=this.end_date.substring(0,4);
        console.log(this.year);
        this.month=this.end_date.substring(5,7)-1;
        console.log(this.month);
        this.day=this.end_date.substring(8,10);
        console.log(this.day);
      })
      
    // this.end_date=localStorage.getItem('end-date');
    // console.log(this.end_date)

    // this.year=this.end_date.substring(0,4);
    // console.log(this.year);
    // this.month=this.end_date.substring(5,7)-1;
    // console.log(this.month);
    // this.day=this.end_date.substring(8,10);
    // console.log(this.day);

   // console.log(this.end_date)




    this.nom_client=localStorage.getItem('nomuser');
    console.log(this.nom_client)
    this.Get_key_database()
    //console.log(JSON.stringify(this.messageurl1));
    this.input1 = (JSON.stringify(this.messageinput1));
    this.output1 = (JSON.stringify(this.messageoutput1));
    this.input2 = (JSON.stringify(this.messageinput2));
    this.output2 = (JSON.stringify(this.messageoutput2));
    this.input3 = (JSON.stringify(this.messageinput3));
    this.output3 = (JSON.stringify(this.messageoutput3));
    
    //this.myTimer();
    
  } 

  // ngAfterViewInit()//: void 
  // {
  //   //
  //   console.log(this.end_date)

  //   // this.year=Number(this.end_date.substring(0,4));
  //   // console.log(this.year);
  //   // this.month=Number(this.end_date.substring(5,7));
  //   // console.log(this.month);
  //   // this.day=Number(this.end_date.substring(8,10));
  //   // console.log(this.day);
  //   //this.Get_key_database()
  //   //console.log(this.year)
  //  // this.myTimer();
        
  // }

  Get_key_database()
  {
    console.log('le id  client ===== ' , this.id_client)
    this.apiService.GetApi(this.id_client).subscribe(data => 
      {   
        // console.log(data);
        // this.end_date=data[0].end_date;
        // this.year=Number(this.end_date.substring(0,4));
        // console.log(this.year);
        // this.month=Number(this.end_date.substring(5,7));
        // console.log(this.month);
        // this.day=Number(this.end_date.substring(8,10));
        // console.log(this.day);
        // console.log(this.end_date)
        this.UserKey= data[0].key;
      })



  }


  /***
   * for calculate time of end date key API
   * 
   */

  x = setInterval(()=>{
    this.currentDate = new Date();
    this.targetDate = new Date(this.year,this.month,this.day);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    //console.log(this.difference)
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
   
    
  }, 1000);


   myTimer() {
    this.currentDate = new Date();
    this.targetDate = new Date(this.year,this.month-1,this.day);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    //console.log(this.difference)
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
   
    
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

    warningNotification(){
      Swal.fire({
        position: 'top',
        title:'Hi',
        titleText: 'generate your key first !!',
        icon: 'warning'})
    }
    // GenerateKey1()
    // {
    //  this.UserKey =  Md5.hashStr(new Date() +this.id_client+ this.nom_client );
    //  console.log(this.UserKey)
    // }

    /***********************************end copy**/
}
