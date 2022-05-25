import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, RadialChartOptions } from 'chart.js';
import { SingleDataSet,BaseChartDirective } from 'ng2-charts';
// import * as chartData from './data.json';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ContextService } from 'src/app/services/context.service';
import { ClientService } from 'src/app/services/client.service';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;
/*******************************CHART 1 ****************************** */

chartData1 = [
  {
    data: [40, 38, 20, 64],
    label: 'Women',
    borderWidth: 1,
    hidden: false
  },
  {
    data: [27, 45, 62, 12],
    label: 'Men',
    borderWidth: 1,
    hidden: false
  },
  {
    data: [16, 37, 5, 8],
    label: 'Children',
    borderWidth: 1,
    hidden: false
  },
  {
    data: [60, 22, 35, 33],
    label: 'Cats',
    borderWidth: 1,
    hidden: false
  }
]
chartLabels1 = [
  'Jan', 'Feb', 'Mar', 'Apr'
];
chartOptions1 = {
  responsive: true,
  responsiveAnimationDuration: 100,
  scales: {
    xAxes: [{
      ticks: {
        display: true
      }
    }],
    yAxes: [{
      ticks: {
        display: true
      }
    }]
  },
  layout: {
    padding: {
      right: 20
    }
  }
};

/***********************************CHART 1 END************************** */
  chartData2 = [
    {
      data: [40, 38, 20, 64],
      label: 'Women',
      borderWidth: 1,
      hidden: false
    }
  ]
  chartLabels2 = [
    'Jan', 'Feb', 'Mar', 'Apr'
  ];
  chartOptions2 = {
    responsive: true,
    responsiveAnimationDuration: 100,
    scales: {
      xAxes: [{
        ticks: {
          display: true 
        }
      }],
      yAxes: [{
        ticks: {
          display: true
        }
      }]
    },
    layout: {
      padding: {
        right: 20
      }
    }
  };


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  // public barChartLabels: Label[] = ['2022'];//['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public dataCount : any = [];
  public labelContext : any =''  ;
  public dataContext1 : any = [];
  public labelContext1 : any =''  ;
  public barChartData: ChartDataSets[] = [ 
    { data:[] , label:'' },
  ];


 

  
  public barChartLabels: Label[]=[];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend: boolean = true;

  /******************************** */
  public barChartColors :Array < any > = [{
    backgroundColor: ['#fb9db1','#86c7f3','#ffd56c','#9BFAA9','#FACF9B','#c5d6cf' ,'#57c785', '#fc8c1d', '#fdf57d','#511849'],
    borderColor: ['#fb9db1','#86c7f3','#ffd56c','#9BFAA9', '#FACF9B', '#c5d6cf','#57c785','#fc8c1d', '#fdf57d','#511849']
  }];


  /****************************************************star piechart**/


    //Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
      responsiveAnimationDuration: 100
      
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

   

  
    /************************************************************** */










    /************************************************************** */


  countcontext : any;
  id_client :any;
  top : any = 3;
  month : any = '';
  countcontextconvertation : any;
  countclient : any;
  contexts : any;
  clients : any;
  idclient : any;
  datatopmsgpertitle: any;
  totalapi : any = 0;
  radarchart : any=[];
  barchart : any=[]



  Data : any[] = [];
  res : never[]=[];
  constructor(public contextService : ContextService,
    public clientService : ClientService,
    public dashboardservice : DashboardService){}

  ngOnInit() {
    this.id_client= localStorage.getItem('id');
    this.getcountclient()
    this.getcountcontext()
    this.getcountcontextconvertation()
    this.gettopmsgperdate();
    this.gettopmsgperannee();
    //this.GetContext();

    this.getcountapi()
    // this.dashboardservice.GetTop_Msg_Annee(this.id_client,2).subscribe(result =>{

    //  // this.barChartLabels.push
    //  console.log(result)


    //   for(var i in result)
    //    {
    //     this.barChartLabels = Object.keys(result[i].annee);
    //    }
    //    console.log(this.barChartLabels)
    //   //this.barChartLabels = Object.keys(result);
    //   console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    //   console.log(result)
    //   //this.barChartLabels.push(result[0].annee)
    //   result.forEach((element :any) => {
        
    //     console.log(element)
  
    //       // this.barChartData[0].label.push(element.title);
    //       // this.barChartData[0].data.push(element.count_message);
    //       this.dataContext = element.count_message;
    //       var Data="{data:"+this.dataContext+",label:'"+element.title+"'},";

    //       console.log(Data)
    //       // for(var i in result)
    //       // {

    //         this.barChartData.push(JSON.parse(Data));
    //         //console.log(this.barChartData);
            
    //       //   //this.barChartData[i].data.push(element.count_message);
    //       //   // this.pieChartLabels.push(result[i].title);
    //       //   // this.pieChartData.push(result[i].count_message); 
    //       // }
        
    //     // this.barChartData[0].data.push(result[label]['volumeSales']);
    //     // this.barChartData[1].data.push(data[label]['valueSales']);
    //   });
    // });;
 
  /*********************************************** */






   }


  // GetContext()
  // {
  //     this.contextService.GetContext().subscribe(result =>
  //       {
  //         console.log('heloooooooooooooooooooooo')
  //         console.log(result);
  //         this.contexts = result;
  //       })
  // }

  GetClient()
  {
    console.log('list clients')
    //console.log(result);

  }
  //chart 1

  
// // // Added BaseChartDirective 
// // Had to make sure each obj had 'hidden' explicitly in it for some reason

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


  selectLimit(event: any): void {


    
    this.top = event.target.value;
    //sessionStorage.setItem('language',this.currentLanguage);
    console.log('change change')

    console.log(this.top)
    //this.speechRecognizer.setLanguage(this.currentLanguage);
    //this.gettopmsgperdate();
    this.gettopmsgpermonth();

  }


  selecmonth(event: any): void {


    
    this.month = event.target.value;
    //sessionStorage.setItem('language',this.currentLanguage);
    console.log('month month')

    console.log(this.month)
    //this.speechRecognizer.setLanguage(this.currentLanguage);
    this.gettopmsgpermonth();

  }



  gettopmsgpermonth()
  {

    console.log('gettopmsgperdate')

    console.log(this.top);

    this.dashboardservice.GetTop_CountMsg_month(this.id_client,this.month,this.top).subscribe(result =>{
      console.log("resultat de top message context par rapport mois");
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




  gettopmsgperdate()
  { 

    console.log('gettopmsgperdate')

    console.log(this.top);

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


  



  gettopmsgperannee()
  { 

    let top = 2;
    console.log('gettopmsgperannee')

    

    this.dashboardservice.GetTop_Msg_Annee(this.id_client,top).subscribe(result =>{
      console.log("resultat de top message par rapport title context in year");
      console.log(result)
      this.barChartLabels = [];
      let lab1='',lab2='';
      var count1: any[]=[];
      var count2: any[]=[];

      this.barChartData = [ { data: count1, label:result[0].title},
      { data: count2, label:result[1].title}, ];
      //this.barChartData=[];
      //fetching data from data base onto pichart
      count1.push(result[0].count_message);
      count2.push(result[1].count_message);
      lab1 =result[0].title;
      lab2 =result[1].title;
      console.log(lab2);
      // for(var i in result)
      // {

         this.barChartLabels.push(result[0].annee);
         //this.barChartLabels.push(result[1].annee);
        
      //   this.dataCount.push(result[i].count_message); 

        //let Data = [];
        //this.res={data: result[i].count_message ,label:result[i].title};
        //this.res="{data: "+result[i].count_message+",label:"+result[i].title+"},";

       
        this.Data.push(this.res);
        console.log(JSON.parse(JSON.stringify(this.Data)))
        //var  ChartDataSets; 
        //let res=Data+",";
        //console.log(Data);
        //this.barChartData.push(JSON.parse(JSON.stringify(Data)));
        //this.barChartData.push(Data); 
        
        console.log(this.barChartData)
        // 
        // this.labelContext = result[i].title; 

        //this.barChartData.push(JSON.parse(JSON.stringify(this.Data)));
        //console.log('index =',i,' title label ='  , result[i].title)
      
      //this.barChartData.push(JSON.parse(JSON.stringify(this.Data)));


    this.barchart = new Chart("canvasbar", {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
          ,{
            label: "# of Votes",
            data: [3],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });




    })
  }

getcountapi()
{
  this.dashboardservice.GetApi_count(this.id_client).subscribe(result =>{
    console.log(result)
    console.log(result.length)
  for(let i=0;i<result.length;i++)
  {
    console.log(result[i].api)
    this.totalapi += Number(result[i].api);
  }
  let data : any ;
  let labels :any;
  data = result.map((cs : any)=> Number(cs.api))
  labels=result.map((cs : any)=> cs.model)
  //this.totalapi = result['api'];
  console.log(data)
  console.log(labels)
  this.radarchart = new Chart('canvas',{

    type: 'radar',
  data: {
    labels: labels,
    datasets: [{
      label: 'API model IA utilisée externe',
      data: data,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  },
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },

  })

  })

}


}
