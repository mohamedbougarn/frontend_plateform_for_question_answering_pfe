import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesizerService {
  speechSynthesizer!: SpeechSynthesisUtterance;
// Keep active api calls subscription.
public searchForm!: FormGroup;
public isUserSpeaking: boolean = false;
 
  constructor() { this.initSynthesis();}


  initSynthesis(): void {
    this.speechSynthesizer = new SpeechSynthesisUtterance();
    this.speechSynthesizer.volume = 1;
    this.speechSynthesizer.rate = 1;
    this.speechSynthesizer.pitch = 0.2;
    
  }

  speak(message: string, language: string): void {
    this.speechSynthesizer.lang = language;
    this.speechSynthesizer.text = message;
    speechSynthesis.speak(this.speechSynthesizer);
  }




}

