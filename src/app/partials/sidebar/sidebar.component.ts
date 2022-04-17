import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  idclient :any ;
  constructor() { }

  ngOnInit(): void 
  {
    this.idclient = localStorage.getItem('id');
    console.log("id de client = "+this.idclient)
  }

}
