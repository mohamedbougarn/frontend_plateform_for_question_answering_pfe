import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangueService } from 'src/app/services/langue.service';
import { SuperComponent } from 'src/app/services/super';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends SuperComponent {

      id :any ;
      nom : any ;
      prenom : any ;
      Mylanguages : any ;
      currentLanguage: any ;//string = defaultLanguage;
      id_langue : any = '';
  constructor(public router : Router, private langueservice:LangueService,
    private speechRecognizer: SpeechRecognizerService) {
    super();
   }

  ngOnInit(): void
  {
    // Read item:
    //let item = JSON.parse(localStorage.getItem(dataSource));
   
    this.Getlangue();
    
    //for current language in console controle
    //this.selectLanguage(event);
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

  selectLanguage(event: any): void {


    
    this.currentLanguage = event.target.value;
    sessionStorage.setItem('language',this.currentLanguage);
    
    this.speechRecognizer.setLanguage(this.currentLanguage);

    console.log(this.currentLanguage)


  }
  
  Getlangue()
  {
    this.langueservice.GetLanguage(this.id_langue).subscribe(result =>
      {
      this.Mylanguages = result;
        // console.log("Get language ===  ", result);

         console.log(this.Mylanguages);
         this.currentLanguage = this.Mylanguages[1].lib_langue;
         sessionStorage.setItem('language',this.currentLanguage);
      })
    }

  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
