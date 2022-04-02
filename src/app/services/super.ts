import { Component, OnInit } from "@angular/core";

@Component({
    template:''
   })
  
  export class SuperComponent implements OnInit {

   public currentLanuage : any ;
   public clientName : any= ''
   public clientPicture : any='https://thinkmarketingmagazine.com/wp-content/uploads/2016/01/Real-Madrid-star-Cristiano-Ronaldo-will-open-his-CR7-footwear-brand-in-Alexandria.jpg'
   public clientId :any;
  ngOnInit(): void {
    this.currentLanuage = sessionStorage.getItem('language');
    this.clientName =  localStorage.getItem('nomuser');
   this.clientId = localStorage.getItem('id');
    console.log(this.currentLanuage);
    console.log('nom sous super .ts',this.clientName);
}
}
