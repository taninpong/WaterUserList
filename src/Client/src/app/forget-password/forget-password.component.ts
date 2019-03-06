import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  user_id:string;
  email:string;
  constructor(private userservice:UserService) { }

  ngOnInit() {
  }

  sendPasswordToEmail(){
    this.userservice.getUserByID(this.user_id).then(result => {
      this.email = result[0]
      console.log(this.email);
    }).catch(err => {console.log(err)});
  }

}
