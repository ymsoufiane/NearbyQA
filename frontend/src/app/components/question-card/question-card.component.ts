import { Component, Input } from '@angular/core';
import { Question, RestService, favorite_question, Response as QuestionResponse, Response } from 'src/app/services/api.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent {
  @Input() question!: Question;
  is_favorite: boolean = false;
  nbLikes: number = 0;
  constructor(public rest: RestService) { }
  ngOnInit(): void {
    let user_id = localStorage.getItem('user_id')
    this.question.favorite_questions.forEach((q: favorite_question) => {
      this.nbLikes = this.question.favorite_questions.length;
      if (q.user_id.$oid == user_id) {
        this.is_favorite = true;
      }
    })
  }
  favoriteQuestion() {

    this.rest.favoriteQuestion(this.question._id.$oid, this.is_favorite).subscribe({
      next: (resp: any) => {
        this.is_favorite = !this.is_favorite;
        (this.is_favorite) ?
          this.nbLikes += 1 : this.nbLikes -= 1
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  respondQuestion(event: Event): void {

    if ((event as KeyboardEvent).key == 'Enter') {
      let content = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = "";
      let response: Response = { content: content } as Response
      this.rest.respondeQuestion(this.question._id.$oid, response).subscribe({
        next: (resp: any) => {
          this.question.responses.push(resp)
        }
      });
    }
  }


}
