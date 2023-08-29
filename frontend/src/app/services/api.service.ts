import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface id{
  $oid: string;
}
export interface User {
  _id: id;
  name: string;
  email: string;
  password: string;
  updated_at: string;
}
export interface Response {
  _id: id;
  content: string;
  question_id: string;
  user_id: string;
  user: User;
  updated_at: string;

}
export interface favorite_question{
  _id: id;
  question_id: any;
  user_id: any;
}

export interface Question {
  _id: id;
  title: string;
  content: string;
  location: Array<number>;
  user : User;
  user_id: any;
  responses: Array<Response>;
  favorite_questions: Array<favorite_question>;
  updated_at: string;

}

const endpoint = 'http://127.0.0.1:3000/';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
    // get token from local storage
    const token = localStorage.getItem('token');
    httpOptions.headers =httpOptions.headers.set('token', token!);
  }

   private getOptions(): any {

      const token = localStorage.getItem('token');

      if (token)
        httpOptions.headers =  new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
    return httpOptions;
   }


  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse,data:any): any {

    return throwError(() => error.error);
  }

  siging(User: User): Observable<any> {
    return this.http.post(endpoint + 'signin', User, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  signup(User: User): Observable<any> {
    return this.http.post(endpoint + 'signup', User, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }
  getUsers(): Observable<any> {
    return this.http.get<User>(endpoint + 'users', this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get<User>(endpoint + 'users/' + id, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  addUser(User: any): Observable<any> {
    return this.http.post(endpoint + 'users', User, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

 

  getQuestions(): Observable<any> {
    return this.http.get<Question>(endpoint + 'questions', this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getQuestion(id: string): Observable<any> {
    return this.http.get<Question>(endpoint + 'questions/' + id, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  addQuestion(Question: any): Observable<any> {
    return this.http.post(endpoint + 'questions', Question, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateQuestion(id: string, Question: Question): Observable<any> {
    return this.http.put<Question>(endpoint + 'questions/' + id, Question).pipe(
      catchError(this.handleError)
    );
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete<Question>(endpoint + 'questions/' + id).pipe(
      catchError(this.handleError)
    );

  }

  favoriteQuestion(id: string,is_favorite:boolean): Observable<any> {
    return this.http.post(endpoint + 'questions/' + id + '/favorite_questions',{ is_favorite}, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }

  nearbyQuestions(lat: number, lng: number): Observable<any> {
    return this.http.get<Question>(endpoint + 'questions/nearby?latitude=' + lat + '&longitude=' + lng, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }
  getFavoriteQuestions(): Observable<any> {
    return this.http.get<Question>(endpoint + 'favorite_questions', this.getOptions()).pipe(
      catchError(this.handleError)
    );}

  respondeQuestion(id: string, response: Response): Observable<any> {
    return this.http.post(endpoint + 'questions/' + id + '/responses', response, this.getOptions()).pipe(
      catchError(this.handleError)
    );
  }


}
