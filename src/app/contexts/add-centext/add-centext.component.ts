import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, scan, tap } from 'rxjs/operators';

//import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { QRService } from 'src/app/services/q-r.service';
import { ContextService } from 'src/app/services/context.service';
import { ContextConversationService } from 'src/app/services/context-conversation.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { defaultLanguage, languages } from 'src/app/test/model/languages';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';
import { SpeechEvent } from 'src/app/test/model/speech-event';
import { SpeechError } from 'src/app/test/model/speech-error';
import { SpeechNotification } from 'src/app/test/model/speech-notification';
import { SuperComponent } from 'src/app/services/super';
//import {ICustomFile} from "file-input-accessor";


//const URL = 'http://localhost:8080/api/upload';


@Component({
  selector: 'app-add-centext',
  templateUrl: './add-centext.component.html',
  styleUrls: ['./add-centext.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush //
})
export class AddCentextComponent extends SuperComponent {



/*################ les variiable du test 2 de apload #################*/
// Variable to store shortLink from api response
shortLink: string = "";
loading: boolean = false; // Flag variable
file: any = null; // Variable to store file

  // url = 'http://localhost:3000/api/upload';

  // uploader = new FileUploader({
  //   url: this.url,
  //   maxFileSize: 1024 * 1024 * 1
  //   });

  // coreUpload = 'http://localhost:3000/api/upload'


  url = environment.URL_CORE;


  id : any = 1;
  history= [{id: this.id , client: 'bot', msgSent: 'Salut',msg_received:'You sent '}];
  modalAddqr! : BsModalRef;
  context : any = '';
  contextbyid : any = '';
  question : any = '';

  reponse : any = '';
  reponseApi : any = '';
  id_client : any = '';
  contect_convertation : any = '';
  contect_convertationlist : any = '';
   msg : any ; //message value
  //bsModalRef!: BsModalRef;
  contextLst : any;
  qrListbyidcontext : any ;
  selectedContext : any = '';
  contextTitle : any ='';
  contextId : any = '';
  titleContext : any;
  contextText : any;
  percentDone: any;
  uploadSuccess: any;
  messageSent : any ='' ;
  messageReceived : any = '';
  isMsg = false;

  /********************** */
  nameImage : any ='';
  picture : any ='';
  submitted : any = false;
  public obj : any = '{}'
  //public uploader!: FileUploader;
  fileUploadForm = this.fb.group({
    file: [null]
  })
  filename:any;


/**for speech  */


  //languages: string[] = languages;
  currentLanguage: any ;//string = defaultLanguage;
  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();


  /** ***************  */

  @ViewChild('fileInput') el!: ElementRef;
  constructor(public route : ActivatedRoute,public router : Router,
    public contextService : ContextService,
    public qrService : QRService,
    public contextconversationService : ContextConversationService,
    private bsModalService : BsModalService,
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    public fb : FormBuilder,
    private speechRecognizer: SpeechRecognizerService) 
    { 
      super();
    }//private modalService: BsModalService

  ngOnInit(): void {
    
    this.currentLanuage=sessionStorage.getItem('language');
    console.log('currentLanuage' + this.currentLanuage)
   


     /*##################### Registration Form #####################*/
  


    /*########################## File Upload ########################*/
    /*###################*/

    this.contextId = this.route.snapshot.paramMap.get('id_context')
    this.id_client=localStorage.getItem('id');
    this.Getbyidcontext();
    this.getQr_by_ID_context();
    this.Getallcontext_conversation();


    /*** speech add ngoninit */

    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }

    /************************ */
    //this.selectLanguage();
    
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

  
  onChargeimage(event:any) 
  {
    let path;
    this.file = event.target.files[0];
    this.filename = event.target.files[0].name;
    console.log("the file is" , this.file)
    console.log("file name is ", this.filename)
    const formdata = new FormData();
     formdata.append('image', this.file);
    this.http.post('http://localhost:3000/api/upload/', formdata).subscribe(
      result=> {
       
        console.log('result');

        console.log(result);
        console.log('result');
        console.log('resultat json =', JSON.stringify(result))
        let obj = JSON.parse(JSON.stringify(result));

        path= this.url + obj.path;
        console.log(path)
        //console.log(result.path)
        this.sendphoto(path);

      },
      (error) => {
        console.error(error);
      }
    );
  
   // this.onUpload()
  }

    // On file Select
    onChange(event:any) 
    {
      this.file = event.target.files[0];
      console.log("the file is" , this.file)
      
     // this.onUpload()
    }
 

      // OnClick of button Upload
      onUpload() 
      {
        this.loading = !this.loading;
        console.log("file" ,this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    this.shortLink = event.link;
  
                    this.loading = false; // Flag variable 
                }
            }
        );
      }
  
  
      /*#########################add poto to database ###########################*/

  sendphoto(path:any)//depuit database 
  {
   
    // if (this.msg.length>0)
    // {
    
    this.contextconversationService.AddphotoContext_conversation(this.contextId,path).subscribe(resultphoto =>
      {
        let photo:any;
        
        photo = resultphoto;

        console.log("add  resultat conversation photo test ", photo);
        this.Getallcontext_conversation()

       
      })
     
    
  // this.msg = '';
  //  } for if 
  }


  /*#########################################################################*/






  /*######################################################*/


  
  onContextSelected(event : any)

  {
      console.log(event.target.value)

      this.contextId = event.target.value ;
  }


  Getbyidcontext()
  {
    this.contextService.GetByIdContext(this.contextId,this.id_client).subscribe(result =>
      {
      this.titleContext = result[0].title;
      this.contextText = result[0].text;
        console.log("Getbyidcontext ",result[0])
      })
  }



  //modal open
  ModalAddQrOpen(modal : any)
  {
    this.modalAddqr = this.bsModalService.show(modal, {
      animated: true,
      backdrop: 'static'
    });
  }


  //modal close
  closeDialog()
  {
    this.modalAddqr.hide();
  }


  //methode ajout  
  add_Q_r()
  {

     console.log('contextId ' + this.contextId)
     console.log('question  ' + this.question);
     console.log('response  '  + this.reponse)
      this.qrService.SetQr(this.contextId,this.question,this.reponse).subscribe(result =>
        {
         // this.contextId = 0;
         this.closeDialog();
         this.getQr_by_ID_context();
        })  
        
  }



  modalUpdateOpen(template: TemplateRef<any>,contextId:any,text:any)
  {
     
      // this.bsModalRef = this.modalService.show(template, {
      //   animated: true,
      //   backdrop: 'static'
      // });
  }


  //liste des qusetion reponse  par id context
    getQr_by_ID_context()
    {
     
      this.qrService.GetQr_by_ID_context(this.contextId).subscribe(result =>
        {
          // this.contextId = 0;
          // this.question = '';
          // this.reponse ='';
          this.qrListbyidcontext = result;

          console.log(" resulta qest reponce ", result);

        })
    
      
    }

GetMsgResponseApi()
{
  if (this.msg.length>0)
  {
    //add the service GetResponseApi that service send request in core to other request to flask before get ther responce 
    this.contextconversationService.GetResponseApi(this.contextText,this.msg).subscribe(result =>
      {
         console.log('resultat de lappele api flask est =',result['response'])

         this.reponseApi=result['response'];

         if(this.reponseApi.length > 0)
         {
           this.sendmsg();
         }
      })
    }
}
    
    sendmsg()//depuit database 
    {
     
            this.contextconversationService.AddContext_conversation(this.contextId,this.msg,this.reponseApi).subscribe(resultconversation =>
              {
                // this.contextId = 0;
                // this.question = '';
                // this.reponse ='';
                this.contect_convertation = resultconversation;
      
                console.log("add  resultat conversation test ", resultconversation);
                this.Getallcontext_conversation();

      
               
              })
             
            this.msg = '' ;
            this.reponseApi = '' ;
      
      }
      
    




  
  
  
    //get all de table context_conversation et affiche dans la conversation html
    Getallcontext_conversation()
    {
      this.contextconversationService.GetContext_conversation(this.contextId).subscribe(restlt_conversation =>
        {
          console.log("Get allcontext conversation",restlt_conversation);
          this.contect_convertationlist = restlt_conversation;

        })
    }



    

    newMessage() 
    {
      if (this.msg.length>0)
      {
        console.log('test from new message')

        let newMsg = {id: this.id + 1 ,
            client: 'bot',
            msgSent: this.msg,
            msg_received:'you sent '+this.msg+' .'}
  
        // this.history.push({user: 'user', value: this.msg});
        // //this.messageReceived.add(this.botValue, this.inputValue);
        // this.messageReceived = 
        
        setTimeout( () => {
          }
        ,1000 );
  
        this.history.push(newMsg);
        console.log(this.history);
        this.msg = '';
        
      }
      else
       {
         console.log("eurreur de ")
        }
      
    }
     
/********************************************************** */


// OnFileInit()
//   {
//     this.uploader = new FileUploader({
//       url: this.coreUpload + this.id_client
//       //, itemAlias: 'file'
//     });
//     this.uploader.response.subscribe( res => {

//       var fileUploaded = JSON.parse(res);
//       console.log(fileUploaded)

//         if(fileUploaded.filename)
//         {
//           this.nameImage = fileUploaded.filename;
//           this.picture = this.url + this.id_client + '/' + this.nameImage;
//         }
//   } );

//     this.uploader.onCompleteItem = (item: any, res: any, status : any) => 
//     {
//     };

//   this.uploader.onAfterAddingFile = (fileItem) => 
//   {
//     fileItem.withCredentials = false;
//     let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);

//   }
  
// }

//   OnFileSelect(input:any) {
//     console.log(input.files);
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();
//       reader.onload = (e: any) => {
//       //  console.log('Got here: ', e.target.result);
//         this.obj.photoUrl = e.target.result;
//       }
//       reader.readAsDataURL(input.files[0]);
//     }
//   }

//   OnFileSubmit() 
//   {
//     this.submitted = true;
//     this.uploader.uploadAll();
//     if(!this.fileUploadForm.valid) {
//     //  alert('Please fill all the required fields to create a super hero!')
//     //  return false;
//     } else {
//      // console.log(this.registrationForm.value)
//     }
//   }

  // OnRemoveFiledFile() {
  //   let newFileList = Array.from(this.el.nativeElement.files);
  //   this.picture = 'http://kieferfoto.hu/wp-content/uploads/2016/09/cropped-Flat-Camera-Icon.png';
  //  // this.editFile = true;
  //  // this.removeFile = false;
  //   this.fileUploadForm.patchValue({
  //     file: [null]
  //   });
  // }

  /*###########################################################*/

  
}  
