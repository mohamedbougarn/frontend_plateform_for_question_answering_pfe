import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : any = '';
  password : any = '';
  submitted = false;

  loginForm!: FormGroup;
  clientId = 0 ; 

  constructor(public router : Router,public loginService :LoginService,public formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get f() { return this.loginForm.controls; }


  login()
  {
  
    console.log('offffffffffffffffffffffffffff')
    this.submitted = true;

    this.email=this.loginForm.value.email;
    this.password = this.loginForm.value.password;
        
        this.loginService.loginClient(this.email,this.password).subscribe(result => {

          console.log('haloooooooooooooooooooooooooooooooo');
          console.log(result);
          this.clientId = result[0].ctl_client_login;

          if(this.clientId > 0)
          {
            console.log('client psssssssst' + this.clientId )
            this.loginService.getClient(this.clientId.toString()).subscribe(result =>
              {
                console.log('client ');
                console.log(result);
                // set info in local storage 
                console.log("inside localstorage");
                console.log("nom client" ,result[0].nom_client );
                localStorage.setItem('nomuser', result[0].nom_client);
                localStorage.setItem('prenomuser', result[0].prenom_clinet);
                localStorage.setItem('id', result[0].id_client);

                //localStorage.setItem('datauser',result[0]);

                console.log('les data 1 est',localStorage.getItem('datauser'));
                




                //

                this.router.navigate(['/dashboard/'+this.clientId]);
              })
          }
        })
      
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }


    // login
    //if(>0)
  //  {select }
  // else {
  //   error
  // }
    //  if(this.email === 'admin' && this.password === 'admin')
    //  {
    //    this.router.navigate(['/dashboard']);
    //  }
  }
}
