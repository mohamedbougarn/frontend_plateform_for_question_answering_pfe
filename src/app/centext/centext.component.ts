import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';


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
  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
  }


  getMessage()

  {
    this.message = [{id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''},
                    {id:1,message:''}]
  }
}
