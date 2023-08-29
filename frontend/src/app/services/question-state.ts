import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from './api.service';

@Injectable({
    providedIn: 'root'
  })

export class QuestionState {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  public questions$: Observable<any[]> = this.questionsSubject.asObservable();
  constructor() { }

  // Set the questions to the BehaviorSubject
  setQuestions(questions: Question[]): void {
    this.questionsSubject.next(questions);
  }

  // Add a single question
  addQuestion(question: Question): void {
    const currentQuestions = this.questionsSubject.getValue();
    this.questionsSubject.next([...currentQuestions, question]);
  }
  addQuestions(questions: Question[]): void {
    const currentQuestions = this.questionsSubject.getValue();
    this.questionsSubject.next([...currentQuestions, ...questions]);

    }

  // Remove a question by id
  removeQuestion(id: string): void {
    const currentQuestions = this.questionsSubject.getValue();
    const updatedQuestions = currentQuestions.filter(q => q._id.$oid !== id);
    this.questionsSubject.next(updatedQuestions);
  }
  
  getQuestions(): Question[] {
    return this.questionsSubject.getValue();
  }
}