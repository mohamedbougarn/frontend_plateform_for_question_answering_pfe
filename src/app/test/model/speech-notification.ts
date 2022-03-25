import { SpeechError } from './speech-error';
import { SpeechEvent } from './speech-event'

// speech-notification.ts
export interface SpeechNotification<T> {
    event?: SpeechEvent;
    error?: SpeechError;
    content?: T;
}