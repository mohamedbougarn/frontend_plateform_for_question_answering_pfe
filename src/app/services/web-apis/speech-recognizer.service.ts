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



  /*############### start party for speech to text ###################*/


  initialize(language: string): boolean {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.setLanguage(language);
      return true;
    }

    return false;
  }

  setLanguage(language: string): void {
    this.language = language;
    this.recognition.lang = language;
  }

  start(): void {
    if (!this.recognition) {
      return;
    }

    this.recognition.start();
    this.isListening = true;
  }

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

  onEnd(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.End
          });
          this.isListening = false;
        });
      };
    });
  }

  onResult(): Observable<SpeechNotification<string>> {
    return new Observable(observer => {
      this.recognition.onresult = (event: any) => {
        let interimContent = '';
        let finalContent = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalContent += event.results[i][0].transcript;
            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.FinalContent,
                content: finalContent
              });
            });
          } else {
            interimContent += event.results[i][0].transcript;
            // console.log('interim transcript', event, interimContent);
            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.InterimContent,
                content: interimContent
              });
            });
          }
        }
      };
    });
  }

  onError(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onerror = (event:any) => {
        // tslint:disable-next-line:no-any
        const eventError: string = (event as any).error;
        console.log('error', eventError);
        let error: SpeechError;
        switch (eventError) {
          case 'no-speech':
            error = SpeechError.NoSpeech;
            break;
          case 'audio-capture':
            error = SpeechError.AudioCapture;
            break;
          case 'not-allowed':
            error = SpeechError.NotAllowed;
            break;
          default:
            error = SpeechError.Unknown;
            break;
        }

        this.ngZone.run(() => {
          observer.next({
            error
          });
        });
      };
    });
  }

  stop(): void {
    this.recognition.stop();
  }

  /*############### end party for speechto text ###################*/

}
