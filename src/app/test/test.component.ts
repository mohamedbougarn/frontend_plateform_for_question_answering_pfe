import { DatePipe } from '@angular/common';
import { Component, OnInit,NgZone, ChangeDetectionStrategy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';
import { LangueService } from '../services/langue.service';
import { defaultLanguage } from './model/languages';
import { SpeechError } from './model/speech-error';
import { SpeechEvent } from './model/speech-event';
import { SpeechNotification } from './model/speech-notification';
declare const annyang: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[DatePipe ],
   //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {
  
  //languages: string[] = languages;
  Mylanguages : any ;
  currentLanguage: any ;//string = defaultLanguage;
  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();

  id_langue :any ='';

  	constructor(
	private speechRecognizer: SpeechRecognizerService,
  private langueservice:LangueService  ) { }

  
  ngOnInit(): void {
	  


    this.Getlangue();


    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
  }


  /********* @select @language from database  *************** */

  Getlangue()
  {
    this.langueservice.GetLanguage(this.id_langue).subscribe(result =>
      {
      this.Mylanguages = result;
        // console.log("Get language ===  ", result);

         console.log(this.Mylanguages);
         this.currentLanguage = this.Mylanguages[1].lib_langue;
         this.speechRecognizer.setLanguage(this.currentLanguage);

      })
  }


  /**********  end @select @language        ****************** */




  /*********************start speech************************ */

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(event: any): void {

    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    this.currentLanguage = event.target.value;
    
    this.speechRecognizer.setLanguage(this.currentLanguage);

	console.log('language =',this.currentLanguage)
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      //this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`
        : notification.content;
    }
  }
  /*********************end speech ************************* */





}
