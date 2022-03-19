import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ContextService } from '../services/context.service';
import { QRService } from '../services/q-r.service';
import { ContextConversationService } from '../services/context-conversation.service';


@Component({
  selector: 'app-add-centext',
  templateUrl: './add-centext.component.html',
  styleUrls: ['./add-centext.component.css']
})
export class AddCentextComponent implements OnInit {
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

  messageSent : any ='' ;
  messageReceived : any = '';
  isMsg = false;
  constructor(public route : ActivatedRoute,public router : Router,
    public contextService : ContextService,
    public qrService : QRService,
    public contextconversationService : ContextConversationService,
    private bsModalService : BsModalService) { }//private modalService: BsModalService

  ngOnInit(): void {
    

    this.contextId = this.route.snapshot.paramMap.get('id_context')
    this.id_client=localStorage.getItem('id');
    this.Getbyidcontext();
    this.getQr_by_ID_context();
    this.Getallcontext_conversation()

  }
 
  

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




  
  
  
    //get all de table context_conversation et affiche dans la conversation html
    Getallcontext_conversation()
    {
      this.contextconversationService.GetContext_conversation().subscribe(restlt_conversation =>
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
     


}
