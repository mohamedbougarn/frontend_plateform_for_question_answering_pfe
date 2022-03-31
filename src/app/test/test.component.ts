import { DatePipe } from '@angular/common';
import { Component, OnInit,NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechRecognizerService } from 'src/app/services/web-apis/speech-recognizer.service';
declare const annyang: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[DatePipe ]
})
export class TestComponent implements OnInit {
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	// Keep active api calls subscription.
	public searchForm!: FormGroup;
	public isUserSpeaking: boolean = false;
  	constructor(private ngZone: NgZone,
	private fb: FormBuilder,
    private datePipe: DatePipe,
    private voiceRecognition: SpeechRecognizerService ) { 
		// Initialize form group.
		this.searchForm = this.fb.group({
		  searchText: ['', Validators.required],
		});}

  
  ngOnInit(): void {this.initVoiceInput();
  }

  initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err:any) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res:any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid :any) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

		if(annyang){
      annyang.abort();
    }
	}

	/*##################### test component speech ###################################*/

	/**
   *  Function to @stop @recording .
   */
	 stopRecording() 
	 {
		this.voiceRecognition.stop();
		this.isUserSpeaking = false;
	 }

 	
   /**
   * Function for @initializing @voice @input so user can chat with machine.
   */
	  
   initVoiceInput() 
	  {
		// Subscription for initializing and this will call when user stopped speaking.
		this.voiceRecognition.init().subscribe(() => {
			// User has stopped recording
			// Do whatever when mic finished listening
  		});

  // Subscription to detect user input from voice to text.
  this.voiceRecognition.speechInput().subscribe((input) => {
	// Set voice text output to
	this.searchForm.controls.searchText.setValue(input);
 	 });
	  }



	/**
   *  Function to @enable @voice @input .
   */
  startRecording() 
  {
	this.isUserSpeaking = true;
    this.voiceRecognition.start();
    this.searchForm.controls.searchText.reset();
  }




	/**############################ end ############################################ */
}
