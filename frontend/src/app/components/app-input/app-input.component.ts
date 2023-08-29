import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css'],

})
export class AppInputComponent {
  @Input() label: string;
  @Input() type: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  value: any;
  isDisabled: boolean;

  constructor() {
    this.label = '';
    this.type = 'text';
    this.isDisabled = false;
   }

   
   onChange = (value: any) => {
    this.value = value;
    this.valueChange.emit(value);
   };



}
