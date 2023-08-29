import { Component,Input } from '@angular/core';
import { Question } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent {
 @Input() questions!: Question[];
 
}
