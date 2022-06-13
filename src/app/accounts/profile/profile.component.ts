import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
  id_client :any='';
  nom_client:any;
  prenom_client:any;
  email_client:any;
  mobile_client :any;
  password : any;
  prenom_client1:any;
  email_client1:any

  dataclient : any;
  isUpdateProfile = false;



  constructor(public clientservice : ClientService,
    public route : ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void 
  {
    //this.getprofile();
    this.id_client = this.route.snapshot.paramMap.get('id_client');
    console.log(this.id_client);
    this.getprofile()
   
    //console.log(this.email_client)
    this.prenom_client1=this.prenom_client
    this.email_client1 = this.email_client
  }


  getprofile()
  {
    this.clientservice.GetClient(this.id_client).subscribe(data =>{
      console.log(data);
      this.nom_client=data[0].nom_client;
      this.prenom_client=data[0].prenom_clinet;
      this.email_client=data[0].email_client;  
      this.mobile_client = data[0].mobile_client ;
      this.password= data[0].password_client ;
       
     // this.nom_client=data.
      this.prenom_client1=this.prenom_client
      this.email_client1 = this.email_client

    })
    
  }
 
  updatecleint()
  {
    this.clientservice.UpdateClient(this.id_client,
      this.nom_client,
      this.prenom_client,
      this.mobile_client,
      this.email_client,
      this.password).subscribe(data =>{
      console.log(data);
  
    })

    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon:'success',
      timer: 3000,
      title: 'Profile updated in successfully'
    })
    this.isUpdateProfile =false;
  }

  back() 
  {
    this._location.back();
  }

  log(value:any) 
  {
    console.log(value);
    this.isUpdateProfile = true;
  }

}

/**
 * 
 * update Profile
 * 
 */
