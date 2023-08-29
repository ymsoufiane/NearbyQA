import { Component } from '@angular/core';
import { ModalService } from '../../services';
import { Question, RestService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  name :string;
  title:string="";
  question:string="";
  lat:number=0;
  lng:number=0;
  constructor(protected modalService: ModalService,public rest: RestService,private router: Router) { 
    this.name=localStorage.getItem('name') || "username"
  }

  setPosition(position: {lat: number, lng: number}) {
    this.lat=position.lat;
    this.lng=position.lng;
  }
 
  addQuestion(){
    let question={title:this.title,content:this.question,location:[this.lat,this.lng]} as Question
    this.rest.addQuestion(question).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.title="";
        this.question="";
        this.lat=0;
        this.lng=0;
        this.modalService.close();
      },
      error: (e:any) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/signin']);
    //Router.prototype.navigateByUrl('/signin');
    
  }

}
