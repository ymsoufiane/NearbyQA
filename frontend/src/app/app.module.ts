import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInputComponent } from './components/app-input/app-input.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { PopupComponent } from './components/popup/popup.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { ResponseCardComponent } from './components/response-card/response-card.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileThumbComponent } from './components/profile-thumb/profile-thumb.component';
import { CapitalizePipe } from './pipes/CapitalizePip';
import { DateFormatPipe } from './pipes/DateFormat';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ListQuestionsComponent } from './components/list-questions/list-questions.component';



@NgModule({
  declarations: [
    AppComponent,
    AppInputComponent,
    SigninComponent,
    SignupComponent,
    NavBarComponent,
    HomeComponent,
    PopupComponent,
    QuestionCardComponent,
    ResponseCardComponent,
    GoogleMapComponent,
    ProfileThumbComponent,
    CapitalizePipe,
    DateFormatPipe,
    FavoritesComponent,
    ListQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
