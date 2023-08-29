import { Component,Input } from '@angular/core';
import { User } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-thumb',
  templateUrl: './profile-thumb.component.html',
  styleUrls: ['./profile-thumb.component.css']
})
export class ProfileThumbComponent {
  @Input()  image_width:string;
  @Input()  display_name:boolean;
  @Input()  user!:User;
  @Input()  time:string;
  constructor(){
    this.image_width="50"
    this.display_name=true
    this.time=""

  }

}
