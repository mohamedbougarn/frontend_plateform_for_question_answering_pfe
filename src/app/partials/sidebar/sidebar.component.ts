import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  idclient :any ;
  constructor(public router : Router) { }

  ngOnInit(): void 
  {
    this.idclient = localStorage.getItem('id');
    console.log("id de client = "+this.idclient)
  }


  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
