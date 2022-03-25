import { Component, OnInit } from '@angular/core';
import { MustMatch } from './must-match.validators';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
//import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})

export class RegistryComponent implements OnInit 
{
  registerForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,public clientService : ClientService) { }

  ngOnInit(): void 
  {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname:['',Validators.required],
        email:['',Validators.required],
        mobile:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(6)]],
        password_confirm:['',Validators.required]
      },{
        Validator :MustMatch('password','password_confirm')
      });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() 
  {
    console.log('offfffffffffffffffffffffffffff')
    this.submitted = true;

    if(this.registerForm.value.password  && this.registerForm.value.password.length> 0 && this.registerForm.value.password_confirm && this.registerForm.value.password_confirm.length >0 && this.registerForm.value.password_confirm === this.registerForm.value.password) 
    {
      let client_firstName : any;
      let client_lastName : any;
      let client_Mobile: any;
      let client_Email: any;
      let client_Pwd : any;
       client_firstName = this.registerForm.value.firstname;
       client_lastName = this.registerForm.value.lastname;
       client_Mobile = this.registerForm.value.mobile;
       client_Email = this.registerForm.value.email;
       client_Pwd = this.registerForm.value.password;
 
 
     this.clientService.AddClient(client_firstName,client_lastName,client_Mobile,client_Email,client_Pwd).subscribe(result =>
       {
 
       })
    }
    
    console.log(this.submitted)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
// convenience getter for easy access to form fields

}
