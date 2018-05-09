import {EventEmitter} from '@angular/core';
export class ErrorMessageService {
  private errorMessage: string;
  constructor() { }

  setMessage(message){
    this.errorMessage=message;
  }
  getMessage(){
    return this.errorMessage;
  }

}
