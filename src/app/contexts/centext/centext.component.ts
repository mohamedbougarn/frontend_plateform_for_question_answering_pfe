import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ContextConversationService } from 'src/app/services/context-conversation.service';
import { VisiteurService } from 'src/app/services/visiteur.service';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';
import { merge, Observable, of, Subject } from 'rxjs';
import { SpeechEvent } from 'src/app/test/model/speech-event';
import { SpeechError } from 'src/app/test/model/speech-error';
import { SpeechNotification } from 'src/app/test/model/speech-notification';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-centext',
  templateUrl: './centext.component.html',
  styleUrls: ['./centext.component.css']
})
export class CentextComponent implements OnInit {
 
  //Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors :Array < any > = [{
    backgroundColor: ['#fb9db1','#86c7f3','#ffd56c','#9BFAA9','#FACF9B','#c5d6cf' ,'#57c785', '#fc8c1d', '#fdf57d','#511849'],
    borderColor: ['#fb9db1','#86c7f3','#ffd56c','#9BFAA9', '#FACF9B', '#c5d6cf','#57c785','#fc8c1d', '#fdf57d','#511849']
  }];

  /**********************  Pie End********************** */
  /*************************Line Begin***************************** */
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType : ChartType =  'line';
/**********************  Line End  ********************* */
message : any;
id_client : any = '';
top :any = 3; 
id_context : any ;
question : any ;
response : any;
visiteur_convertation : any ;
visiteur_convertationlist : any ;
data_staticts : any ;
countcontext :any;
countcontextconvertation:any;
countclient :any ;
contextforalluserlist : any ;
context_QRlist :any;
p : any = 1;
p1: any = 1;
modalShowQeuestAnse!: BsModalRef;
reponse:any;
id : any = 1;
historygpt3= [{id: this.id , client: 'bot', msgSent: 'Salut',msg_received:'salut .. '}];



currentLanguage: any ;//string = defaultLanguage;
totalTranscript?: string;

transcript$?: Observable<string>;
listening$?: Observable<boolean>;
errorMessage$?: Observable<string>;
defaultError$ = new Subject<string | undefined>();



  constructor(public router : Router,
    private dashboardservice:DashboardService,
    private bsModalService: BsModalService,
    public contextconversationService : ContextConversationService,
    public visiteurservice : VisiteurService,
    private speechRecognizer: SpeechRecognizerService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void 
  {
    this.getcountcontext();
    this.getcountcontextconvertation();
    this.getcountclient();
    this.getcontextforalluser();
    this.Getvisteur_conversation();
    this.getstat()
    this.gettopmsgperdate();

    this.currentLanguage = 'fr-FR';
    console.log(this.currentLanguage)




    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }

  }





  /*********************@start @speech ************************ */

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
   // this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);

    console.log('language =',this.currentLanguage)
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      //this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`
        : notification.content;
    }
  }
  /*********************end @speech ************************* */



  getMessage()

  {
    this.message = [{id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''}]
  }



  getcountcontext()
  {
    
    this.dashboardservice.GetCountContext(this.id_client).subscribe(result =>
      {
        console.log("resultat count context  = ")
        console.log(result[0].ctl_count_context_select)
        this.countcontext = result[0].ctl_count_context_select

      })

  }

  getcountcontextconvertation()
  {
  
    this.dashboardservice.GetCountContextConvertation(this.id_client).subscribe(result =>
      {
        
          console.log("resultat count context conversation = ")
          console.log(result[0].ctl_count_context_convertation_select)
          this.countcontextconvertation = result[0].ctl_count_context_convertation_select
      })

  }




  getcountclient()
  {
    this.dashboardservice.GetCountClient().subscribe(result =>{
      console.log("resultat de count de client = ")
      console.log(result[0].ctl_count_client)
      this.countclient = result[0].ctl_count_client

    })
  }


  getcontextforalluser()
  {
    this.dashboardservice.GetContextForAllAser().subscribe(result =>{
      console.log("resultat pour context all users")
      console.log(result);
      this.contextforalluserlist = result;
      console.log("resultat pour id context all users",result[0].id_context)
      this.id_context= result[0].id_context  //id_context a last id  
    })
  }
  

//for opening dialog 
  ModalShowQuestionAnserwerOpen(modal : any)
  {
    this.modalShowQeuestAnse = this.bsModalService.show(modal, {
      animated: true,
      backdrop: 'static',
      class: 'modal-lg' // for taille de modal
    });

  }


 //for closing dialog
  closeDialog()
  {
    this.modalShowQeuestAnse.hide();
  }



  
  getQR(idcontext:any)
  {
     //let id = idcontext.tostring()
    this.contextconversationService.GetContext_conversation(idcontext.toString()).subscribe(restlt_conversation =>
      {
        console.log("Get allcontext conversation",restlt_conversation);
        this.context_QRlist = restlt_conversation;

      })
  }

  

  //get all de table context_conversation et affiche dans la conversation html
  Getvisteur_conversation()
  {
    //console.log(this.id_context.toString() + "cest la id de la context  vsiteure par papport de conversation ")
    this.visiteurservice.GetVisiteur_Context_conversation("").subscribe(data => 
      {
        console.log("Get all message  visiteur conversation",data);
        this.visiteur_convertationlist = data;
      })     
     
  }

  
  /***
   * 
   * methode that for get responce from @GPT3   
   * 
   */


  GetMsgResponsegpt3Api()
  {
    if (this.question.length>0)
    {
      let lang='fr';
      //add the service GetResponseApi that service send request in core to other request to flask before get ther responce 
      this.contextconversationService.GetResponseGPT3Api(this.question,lang).subscribe(result =>
        {
           console.log('resultat de lappele api flask est methode GPT3 question responce est  =',result['response'])
  
           this.reponse=result['response'];
  
           if(this.reponse.length > 0)
           {
             this.sendmsggpt3();
           }
        })
        this.question = "";
      }
  }





  sendmsggpt3()//depuis database 
  { 
    console.log('test from new message')
    if (this.question.length>0)
    {
        let newMsg = {id: this.id + 1 ,
            client: 'bot',
            msgSent: this.question,
            msg_received: this.reponse}

        // this.history.push({user: 'user', value: this.msg});
        // //this.messageReceived.add(this.botValue, this.inputValue);
        // this.messageReceived = 

        setTimeout( () => {
          }
        ,1000 );

        this.historygpt3.push(newMsg);
        console.log(this.historygpt3);
        this.question = '';

      }
      else
       {
         console.log
        }

  }

  





  
  sendmsg()//depuis database 
  { 
    //console.log(this.question , "cest la question de la vsiteure par papport de conversation ")
    this.visiteurservice.AddVisiteur_Context_conversation(this.id_context,this.question).subscribe(data =>
      {
        this.visiteur_convertation = data;
        console.log("add resultat visiteur conversation test ", data);
        this.Getvisteur_conversation();
      })
      this.question = "";
  }



  getstat()
  {
    this.dashboardservice.GetStat_Msg_Date().subscribe(data => 
      {
        console.log("data of statistic result ");
        console.log(data);
        this.data_staticts = data;

      })

  }


  selectLimit(event: any): void {


    
    this.top = event.target.value;
    //sessionStorage.setItem('language',this.currentLanguage);
    console.log('change change')

    console.log(this.top)
    //this.speechRecognizer.setLanguage(this.currentLanguage);
    this.gettopmsgperdate();

  }




  gettopmsgperdate()
  { 

    console.log('gettopmsgperdate')

    console.log(this.top,this.id_client);

    this.dashboardservice.GetTop_Msg_Title(this.id_client,this.top).subscribe(result =>{
      console.log("resultat de top message par rapport title context");
      console.log(result)
      this.pieChartLabels = [];
      this.pieChartData = [];
      //fetching data from data base onto pichart
      for(var i in result)
      {
        this.pieChartLabels.push(result[i].title);
        this.pieChartData.push(result[i].count_message); 
      }

    })
  }




}
