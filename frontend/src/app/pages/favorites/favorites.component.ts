import { Component } from '@angular/core';
import { Question, RestService } from 'src/app/services/api.service';
import { QuestionState } from 'src/app/services/question-state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  constructor(
    public rest: RestService,public questionService:QuestionState) { }
  questions!: Question[];

  ngOnInit(): void {
    this.questionService.setQuestions([])
    //this.getUsers();
    this.getQuestions()
    this.questionService.questions$.subscribe(questions => {
      this.questions = questions;
    });
  }

  getQuestions(): void {
    this.rest.getFavoriteQuestions().subscribe({
      next: (resp:any) => {
        this.questionService.setQuestions(resp)
        // close modal
      },
      error: (e:any) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }
 
}
