import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ContextConversationService } from 'src/app/services/context-conversation.service';


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

  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

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
countcontext :any;
countcontextconvertation:any;
countclient :any ;
contextforalluserlist : any ;
context_QRlist :any;
modalShowQeuestAnse!: BsModalRef;


  constructor(public router : Router,
    private dashboardservice:DashboardService,
    private bsModalService: BsModalService,
    public contextconversationService : ContextConversationService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void 
  {
    this.getcountcontext();
    this.getcountcontextconvertation();
    this.getcountclient();
    this.getcontextforalluser();
  }


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
    })
  }
  

//for opening dialog 
  ModalShowQuestionAnserwerOpen(modal : any)
  {
    this.modalShowQeuestAnse = this.bsModalService.show(modal, {
      animated: true,
      backdrop: 'static'
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

}
