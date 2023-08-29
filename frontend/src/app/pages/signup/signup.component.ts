import { Component } from '@angular/core';
import { RestService, User } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name : string = "";
  email : string = "";
  password : string = "";
  errMessage : string = "";
  successMessage : string = "";
  constructor( public rest: RestService) { }
  setName(event:Event){
    this.name=(<HTMLInputElement>event.target).value;
  }
  setEmail(event:Event){
    this.email=(<HTMLInputElement>event.target).value;
  }
  setPassword(event:Event){
    this.password=(<HTMLInputElement>event.target).value;
  }
  submit(){
    const user={name:this.name,email:this.email,password:this.password} as User
    this.rest.signup(user).subscribe({
      next: (resp:any) => {
        this.errMessage="";
        this.successMessage="Account created successfully"
      },
      error: (e:any) => {
        if(e==undefined) {
          this.submit();
          return;
        }

        if(e?.errors?.length>0)
        this.errMessage=e.errors[0];
      }
      ,
      complete: () => console.info('complete')
    });
  }
}
