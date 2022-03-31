import { Injectable,NgZone  } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpeechError } from 'src/app/test/model/speech-error';
import { SpeechEvent } from 'src/app/test/model/speech-event';
import { SpeechNotification } from 'src/app/test/model/speech-notification';

import { AppWindow } from 'src/app/test/model/app-window';
// tslint:disable-next-line:no-any
const { webkitSpeechRecognition }: AppWindow = (window as any) as AppWindow;


@Injectable({
  providedIn: 'root'
})
export class SpeechRecognizerService {
  recognition!: any;//SpeechRecognition
  language!: string;
  isListening = false;
  isStoppedSpeechRecog = false;
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private speakingPaused: Subject<any> = new Subject();
  private tempWords: string = '';

  constructor(private ngZone: NgZone) {}


  initialize(language: string): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    this.language = language;
    this.recognition.lang = language;
  }

  // start(): void {
  //   this.recognition.start();
  //   this.isListening = true;
  // }

  onStart(): Observable<SpeechNotification<never>> {
    if (!this.recognition) {
      this.initialize(this.language);
    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.Start
          });
        });
      };
    });
  }


  /*############### start party for speechto text ###################*/
/**
   *  Function to return @observable so voice sample text can be send to input.
   */
    speechInput()
    {
      return this.voiceToTextSubject.asObservable();
    }

    /**
   * Function to @initialize voice recognition.
   */
  init()
  {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.voiceToTextSubject.next(this.text || transcript);
    });
    return this.initListeners();
  }
  /**
   *  @description Add event listeners to get the updated input and when stoped
   */
   initListeners() 
   {
      this.recognition.addEventListener('end',(condition:any)=>{//when say 'end' the rocognation was stopp it 
        this.recognition.stop();
      });
      return this.speakingPaused.asObservable();
   }
/**
   * Function to @mic on to @listen .
   */
  start() 
  {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();
        // Checked time with last api call made time so we can't have multiple start action within 200ms for countinious listening
        // Fixed : ERROR DOMException: Failed to execute 'start' on 'SpeechRecognition': recognition has already started.
        if (!this.recognition.lastActiveTime || (Date.now() - this.recognition.lastActive) > 200) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
      this.voiceToTextSubject.next(this.text);
    });
  }
    
/**
   * Function to @stop recognition.
   */
  stop() 
  {
      this.text='';
      this.isStoppedSpeechRecog = true;
      this.wordConcat();
      this.recognition.stop();
      this.recognition.isActive = false;
      this.speakingPaused.next('stopped speaking');
  }
/**
   * @description Merge previous input with latest input.
   */
  wordConcat() 
  {
    this.text = this.text.trim()+ ' '+this.tempWords;
    this.text= this.text.trim();
    this.tempWords ='';
  }

  /*############### end party for speechto text ###################*/

}
