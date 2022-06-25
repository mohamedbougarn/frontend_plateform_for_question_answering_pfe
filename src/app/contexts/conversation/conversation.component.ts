import { Component, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';
import { ContextConversationService } from 'src/app/services/context-conversation.service';
import { SpeechError } from 'src/app/test/model/speech-error';
import { SpeechEvent } from 'src/app/test/model/speech-event';
import { SpeechNotification } from 'src/app/test/model/speech-notification';
import Swal from 'sweetalert2';
import { SpeechSynthesizerService } from 'src/app/services/web-apis/speech-synthesizer.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

id : any = 1 ;

//for sxitch button 
selectedspeack = false;

// liste of conversation 
history= [{id: this.id , client: 'bot', msgSent: 'Salut',msg_received:'salut .. '}];





  reponse :any;



  /***
   * declaration de @model 
   */
  currentmodel:any="";


  //question variable 
  question : any ="";




  /***
   * part speech to texte @STT 
   */
   currentLanguage: any ;//string = defaultLanguage;
   totalTranscript?: string;
   
   transcript$?: Observable<string>;
   listening$?: Observable<boolean>;
   errorMessage$?: Observable<string>;
   defaultError$ = new Subject<string | undefined>();




  constructor(private speechRecognizer: SpeechRecognizerService,
    private speechSynthesizer: SpeechSynthesizerService,
    public contextconversationService : ContextConversationService) { }

  ngOnInit(): void
  {

    this.currentLanguage=sessionStorage.getItem('language');
    console.log('currentLanuage' + this.currentLanguage)

    this.speechSynthesizer.initSynthesis();
    //this.speack('bonjour je mappele mohamed' , 'fr');

    // this.speechSynthesizer.initSynthesis();
    //     this.speechSynthesizer.speak('Speack is on',this.currentLanguage)


    /***
     * part STT live with web kit 
     * 
     */
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


  //recherche sur le  totalTranscript pour lintegration avec le message de liste a une string 
  //searche in the totalTranscript for integration with messahe nModel in fom liste to string 
  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      //this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`//this part deleted in futur
        : notification.content;

        //console.log(this.totalTranscript)
        console.log(message)
        this.question = message +'';

       this.currentLanguage=sessionStorage.getItem('language');
      //  this.speechSynthesizer.initSynthesis();
      //  this.speechSynthesizer.speak(message,this.currentLanguage)

    }
  }
  /*********************end @speech ************************* */
/**
 * @speack Text to speech  
 * 
 */
 speack(msaage: any , lang : any) 
 {
   //this.speechSynthesizer.initSynthesis();
   //let message ="je me tire me demande pas pourquoi "
    this.speechSynthesizer.speak(msaage,lang)
 }



/******************* end @speack Text to speech  ****** */







  /**
   * 
   * part select model and 
   * 
   */


/***
 * 
 * test wich model chosing in chat
 * 
 */

   GetMsgResponseAPI()
   {
    //  if(this.currentmodel=='bert' && this.currentmodel.length>0) 
    //  {
    //   //  this.Getvisteur_conversation()
    //   //  console.log("1111")
    //  }
     if(this.currentmodel=='wikipedia')
     {
       this.GetMsgResponsewikiApi()
       console.log("22222")
     }
     else if(this.currentmodel=='GPT3')
     {
       this.GetMsgResponsegpt3Api()
       console.log("33333")
     }
     else if(this.currentmodel=="")
     {
       
         Swal.fire({
           position: 'top',
           title:'Hi',
           titleText: 'shose your model first !!',
           icon: 'warning'})
       
     }
   }
   
   
   /***
    * 
    * methode that for get responce from @GPT3   
    * 
    */
 
 
   GetMsgResponsegpt3Api()
   {
     if (this.question.length>1)
     {
      this.currentLanguage=sessionStorage.getItem('language');
      let lang=this.currentLanguage.substring(0,2);
      console.log(lang);
      //  let lang='fr';
       //add the service GetResponseApi that service send request in core to other request to flask before get ther responce 
       this.contextconversationService.GetResponseGPT3Api(this.question,lang).subscribe(result =>
         {
            console.log('resultat de lappele api flask est methode GPT3 question responce est  =',result['response'])
   
            this.reponse=result['response'];
   
            if(this.reponse.length > 0)
            {
              if(this.selectedspeack)
                {
                  this.currentLanguage=sessionStorage.getItem('language');
                  this.speack(this.reponse,this.currentLanguage)
                }
              this.sendmsggpt3();
            }
         })
         //this.question = "";
       }
       else if(this.question.length < 1)
       {
         Swal.fire({
           position: 'top',
           title:'Hi',
           titleText: ' your input is Null !!',
           icon: 'warning'})
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
 
         // setTimeout( () => {
         //   }
         // ,1000 );
 
         this.history.push(newMsg);
         console.log(this.history);
         this.question = '';
 
       }
       else
        {
          console.log
         }
       this.question = "";
       this.reponse = "";
 
   }
 
   
 
 
 
    /***
    * 
    * methode that for get responce from @wikipedia   
    * 
    */
     GetMsgResponsewikiApi()
     {
       if(this.question.length>1)
       {
        this.currentLanguage=sessionStorage.getItem('language');
         let lang=this.currentLanguage.substring(0,2);
         console.log(lang);
         //add the service GetResponseApi that service send request in core to other request to flask before get ther responce 
         this.contextconversationService.GetResponsewikiApiconversation(this.question,lang).subscribe(result =>
           {
              console.log('resultat de lappele api flask est methode wikipedia question responce est  =',result['answer'])
     
              this.reponse=result['answer'];
     
              if(this.reponse.length > 0)
              {
                if(this.selectedspeack)
                {
                  this.currentLanguage=sessionStorage.getItem('language');
                  this.speack(this.reponse,this.currentLanguage)
                }
               // this.speack(this.reponse,lang)//for speaking result message 
                this.sendmsgwiki();
                
               // this.speack(this.reponse,lang)
              }
              // else
              // {
              //   this.reponse= "non réponse ?"
              //   this.sendmsgwiki();
              // }
           })
          
       }
       else if(this.question.length < 1)
       {
         Swal.fire({
           position: 'top',
           title:'Hi',
           titleText: ' your input is Null !!',
           icon: 'warning'})
       }
         //this.question = "";
     }
   
   
   
   
   
     sendmsgwiki()
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
   
           // setTimeout( () => {
           //   }
           // ,1000 );
   
           this.history.push(newMsg);
           console.log(this.history);
           this.question = '';
   
         }
         else
          {
            console.log
          }
 
           this.question = "";
           this.reponse = "";
   
     }
 
 

     /**
      * 
      * select the model for @question @ansewer 
      * 
      */

     selectModel(event:any):void
     {
       this.currentmodel=event.target.value;
       console.log(this.currentmodel); 


     }



/***
 * 
 * for activate or desactivated @suitch_speack_button 
 * 
 */
     clickButton(event:any):void
      {
      this.selectedspeack = !this.selectedspeack;
      console.log(this.selectedspeack)
      
        this.currentLanguage=sessionStorage.getItem('language');
      if(this.selectedspeack == true && this.currentLanguage == 'en-US' )
      {
        this.speack('Speack is on', this.currentLanguage) 
        // //this.speechSynthesizer.initSynthesis();
      }
      else if(this.selectedspeack == true && this.currentLanguage == 'fr-FR' )
      {
        this.speack('Parler est activé', this.currentLanguage) 
        //this.speechSynthesizer.initSynthesis();      
      }
      else if(this.selectedspeack == true && this.currentLanguage == 'ar-AR' )
      {
        this.speack('تفعيل الصوت', this.currentLanguage) 
        //this.speechSynthesizer.initSynthesis();      
      }
      

    }


}
