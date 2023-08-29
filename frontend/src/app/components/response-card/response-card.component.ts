import { Component,Input } from '@angular/core';
import {Response }  from '../../services/api.service';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.css']
})
export class ResponseCardComponent {
  @Input() response!: Response;
}
