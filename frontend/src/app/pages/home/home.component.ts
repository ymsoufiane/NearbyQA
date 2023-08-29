import { Component } from '@angular/core';
import { RestService, Question } from '../../services/api.service';
import { QuestionState } from '../../services/question-state';
import { LocationState } from 'src/app/services/location.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lat: number = 33.576551;
  lng: number = -7.633345;
  isLoading: boolean = true;

  constructor(
    public rest: RestService, public questionService: QuestionState, public locationState: LocationState) { }
  questions!: Question[];


  ngOnInit(): void {
    this.getQuestions()
    this.locationState.location$.subscribe(location => {
      if(location.lat==null || (this.lat==location.lat&& this.lng==location.lng)) return

      this.lat = location.lat;
      this.lng = location.lng;
      this.questionService.setQuestions([])
      this.getQuestions()


    });

    this.questionService.questions$.subscribe(questions => {
      this.questions = questions;
    });
  }


  getQuestions(): void {
    this.rest.nearbyQuestions(this.lat, this.lng).subscribe({
      next: (resp: any) => {
        this.questionService.addQuestions(resp)
        this.isLoading = false

      },
      error: (e: any) => {
        console.log(e);
        this.isLoading = false
      },
      complete: () => console.log("complete")

    });
  }
}
