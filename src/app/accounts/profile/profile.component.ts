import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id_client :any='';
  nom_client:any;
  prenom_client:any;
  email_client:any;
  mobile_client :any;
  password : any;


  dataclient : any;




  constructor(public clientservice : ClientService,
    public route : ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void 
  {
    //this.getprofile();
    this.id_client = this.route.snapshot.paramMap.get('id_client');
    console.log(this.id_client);
    this.getprofile()
  }


  getprofile()
  {
    this.clientservice.GetClient(this.id_client).subscribe(data =>{
      console.log(data);
      this.nom_client=data[0].nom_client;
      this.prenom_client=data[0].prenom_clinet;
      this.email_client=data[0].email_client;  
      this.mobile_client = data[0].mobile_client ;
       
     // this.nom_client=data.

    })
  }


  back() {
    this._location.back();
  }

}
