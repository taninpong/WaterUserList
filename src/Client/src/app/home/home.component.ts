import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AreasService } from '../services/areas.service';
import { Areas } from '../models/areas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  areasData = new Areas();
  username:String;
  password:String;
  user:User;
  loginFlg = false;
  constructor(private areasservices: AreasService,private userservice: UserService, private router: Router) { }

  ngOnInit() {
    
  }

}
