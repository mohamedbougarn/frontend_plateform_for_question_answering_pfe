import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';
import { ContextService } from '../services/context.service';
import { QRService } from '../services/q-r.service';
import { ContextConversationService } from '../services/context-conversation.service';
import { FileUploadService } from '../services/file-upload.service' //uploade service 
//import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
//import {ICustomFile} from "file-input-accessor";


//const URL = 'http://localhost:8080/api/upload';


@Component({
  selector: 'app-add-centext',
  templateUrl: './add-centext.component.html',
  styleUrls: ['./add-centext.component.css']
})
export class AddCentextComponent implements OnInit {



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





  id : any = 1;
  history= [{id: this.id , client: 'bot', msgSent: 'Salut',msg_received:'You sent '}];
  modalAddqr! : BsModalRef;
  context : any = '';
  contextbyid : any = '';
  question : any = '';

  reponse : any = '';
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

  @ViewChild('fileInput') el!: ElementRef;
  constructor(public route : ActivatedRoute,public router : Router,
    public contextService : ContextService,
    public qrService : QRService,
    public contextconversationService : ContextConversationService,
    private bsModalService : BsModalService,
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    public fb : FormBuilder) { }//private modalService: BsModalService

  ngOnInit(): void {
    


   


     /*##################### Registration Form #####################*/
  
     //  registrationForm = this.fb.group({
  //   file: [null]
  // })  

  
  

    // this.uploader.onAfterAddingFile = (file) => {
    //   console.log('***** onAfterAddingFile ******')
    //   console.log('file ', file)
    // }

    // this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    // };

    // this.uploader.onCompleteAll = () => {
    //   console.log('******* onCompleteAll *********')
    // }

    // this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
    //   console.log('***** onWhenAddingFileFailed ********')
    // }


    /*########################## File Upload ########################*/
    /*###################*/

    this.contextId = this.route.snapshot.paramMap.get('id_context')
    this.id_client=localStorage.getItem('id');
    this.Getbyidcontext();
    this.getQr_by_ID_context();
    this.Getallcontext_conversation()
    
  }

  
  onChargeimage(event:any) 
  {
    this.file = event.target.files[0];
    console.log("the file is" , this.file)
    const formdata = new FormData();
     formdata.append('image', this.file);
    this.http.post('http://localhost:3000/api/upload', formdata).subscribe(
      (d) => {
        console.log(d);
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


  //liste des qusetion reponce dapronse par id context
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


    
    sendmsg()//depuit database 
    {
      this.Getallcontext_conversation
      if (this.msg.length>0)
      {
      
      this.contextconversationService.AddContext_conversation(this.contextId,this.msg).subscribe(resultconversation =>
        {
          // this.contextId = 0;
          // this.question = '';
          // this.reponse ='';
          this.contect_convertation = resultconversation;

          console.log("add  resultat conversation test ", resultconversation);

         
        })
       

      // console.log(this.msg) 
      //   this.isMsg = true;
      //   this.messageSent = this.msg ;
      //   this.messageReceived = 'you sent '+this.messageSent+'.'
      //   console.log(this.messageSent);
      //   console.log(this.messageReceived)
      this.msg = '';
      }
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
         console.log
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


}  
