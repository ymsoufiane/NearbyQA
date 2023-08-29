import { Component } from '@angular/core';
import { RestService, User } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email:string="";
  password:string="";
  err:string="";
  setEmail(event:Event){
    this.email=(<HTMLInputElement>event.target).value;
  }
  setPassword(event:Event){
    this.password=(<HTMLInputElement>event.target).value;
  }
  constructor( public rest: RestService,private router: Router) { }
  submit(){
    const user={email:this.email,password:this.password} as User
    this.rest.siging(user).subscribe({
      next: (resp:any) => {
        this.err="";

        localStorage.setItem('token', resp.token);
        localStorage.setItem('name', resp.name);
        localStorage.setItem('user_id', resp.user_id.$oid);
        this.router.navigate(['/']);
        // close modal
      },
      error: (e:any) => {
        if(e==undefined) {
          this.submit();
          return;
        }
        this.err="Invalid email or password"
      },
      complete: () => console.info('complete')
    });

  }
}
