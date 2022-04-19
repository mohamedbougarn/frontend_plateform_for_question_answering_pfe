import { Component, OnInit } from '@angular/core';
//import { ContextService } from '../services/context.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
contextIdToUpdate : any = 0;
  type : any = 1 ;
  id_context : any = '';  
  context : any = '';
  id_client : any = '';
  contextTitle : any = '';
  contexts : any;
  p : any = 1;
  modalAddContext!: BsModalRef;

  constructor(public router : Router,public contextService :ContextService,private bsModalService: BsModalService) { }

  ngOnInit(): void {

    this.id_client=localStorage.getItem('id');
    this.GetContext()
  }


  
  GetContext()
  {
      this.contextService.GetByIdContext(this.id_context,this.id_client).subscribe(result =>
        {
          console.log('heloooooooooooooooooooooo')
          console.log(result);
          this.contexts = result;
        })
  }


  ModalAddContextOpen(modal : any)
  {
    this.modalAddContext = this.bsModalService.show(modal, {
      animated: true,
      backdrop: 'static'
    });
  }



  addcentext()
  {
    this.id_client=localStorage.getItem('id');
    console.log('le id  client ===== ' , this.id_client)


    this.contextService.SetContext(this.contextIdToUpdate,this.context,this.id_client,this.contextTitle,this.type).subscribe(result =>
      {
        this.closeDialog();
        this.GetContext();
      })
    // console.log("context = ",this.context, "\n question = ",this.question , "\n réponce = ",this.reponse)
    //  this.reponse==="";
    //  this.question==="";
    //  this.contextTitle = '';
    //  this.context = '';
  }

  SelectType(event:any,contextId:any)
  {
    console.log(event.target.value);
    console.log(contextId);
    this.type = event.target.value;
    this.contextIdToUpdate = contextId;
    this.Updatecentexttype();
    }

  
    
  Updatecentexttype()
  {
    // this.id_client=localStorage.getItem('id');
    // console.log('le id  client ===== ' , this.id_client)


    this.contextService.UpdateContext(this.contextIdToUpdate,this.context,this.id_client,this.contextTitle,this.type).subscribe(result =>
      {

        // this.closeDialog();
         this.GetContext();
      })
    // console.log("context = ",this.context, "\n question = ",this.question , "\n réponce = ",this.reponse)
    //  this.reponse==="";
    //  this.question==="";
    //  this.contextTitle = '';
    //  this.context = '';
  }



  //for closing dialog
  closeDialog()
  {
    this.modalAddContext.hide();
  }


}
