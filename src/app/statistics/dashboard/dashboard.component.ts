import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
// import * as chartData from './data.json';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ContextService } from 'src/app/services/context.service';
import { ClientService } from 'src/app/services/client.service';
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
        display: false
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
          display: false
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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  contexts : any;
  clients : any;
  idclient : any;
  constructor(public contextService : ContextService,public clientService : ClientService){}

  ngOnInit() {
    
    //this.GetContext();
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
 
}
