import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

      id :any ;
      nom : any ;
      prenom : any ;

  constructor(public router : Router) { }

  ngOnInit(): void
  {
    // Read item:
    //let item = JSON.parse(localStorage.getItem(dataSource));
    this.nom = localStorage.getItem('nomuser');
    this.prenom = localStorage.getItem('prenomuser')
    this.id= localStorage.getItem('id');

    // let data1 = JSON.parse(this.data);
   // console.log("les datastorge in navbar",localStorage.getItem('datauser'));

    // console.log(data1.nom_client)
    // this.nom = data1["id_client"];
     console.log("nom ???" , this.nom)
     console.log("prenom ???" , this.prenom)
     console.log("id de client ???" , this.id)



     //test id 
     if(!this.id)
     {
      this.router.navigate(['/login']);
     }


  }



  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
