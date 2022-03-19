import { Component, OnInit } from '@angular/core';
import { ContextService } from '../services/context.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

  id_context : any = '';  
  context : any = '';
  id_client : any = '';
  contextTitle : any = '';
  contexts : any;
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

    this.contextService.SetContext(this.context,this.id_client,this.contextTitle).subscribe(result =>
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

  closeDialog()
  {
    this.modalAddContext.hide();
  }


}
