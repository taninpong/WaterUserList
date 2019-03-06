import { Component, OnInit } from '@angular/core';
import { AreasService } from './services/areas.service';
import { Areas } from './models/areas';
import { User } from './models/user';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  areasData = new Areas();
  user: User;
  fogetPasswordFlag: boolean = false;
  loginFlag:boolean = false;
  constructor(private areasservices: AreasService, private userservice: UserService, private router: Router) {

  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (!this.user) {
      this.user = new User();
      this.user.USERID = "";
      this.user.PASSWORD = "";
    }else{
      this.getAreaData();
    }
  }

  getAreaData(){
    if (this.user.TID < '3') {
      this.areasservices.getAllAreaData().then(
        datas => {
          this.areasData.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
        }
      ).catch(err => {
        console.log(err)
      }
      );
    } else  if (this.user.TID == '3'){
      this.areasservices.getAreaByCWT(this.user.CWT).then(
        datas => {
          this.areasData.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
        }
      ).catch(err => {
        console.log(err)
      }
      );
    }else  if (this.user.TID == '4'){
      this.areasservices.getAreaByFS(this.user.USERID).then(
        datas => {
          this.areasData.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
        }
      ).catch(err => {
        console.log(err)
      }
      );
    }
  }

  loginClick() {
    this.loginFlag = true;
    this.userservice.getUserByIDPassword(this.user.USERID, this.user.PASSWORD).then(result => {
      if (result.length > 0) {
        this.user = result[0];
        this.getAreaData();
        sessionStorage.setItem("user", JSON.stringify(this.user));
        if (this.user.TID > '2' || this.user.TID == '1') {
          this.router.navigate(['/']);
        }else{
          this.router.navigate(['/']);
        }
      }else{
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!!!");
      } 

    }).catch(err => {console.log(err)});
    this.loginFlag = false;
    // this.user = new User();
    // this.user.USERID = '4020001';
    // this.user.FIRSTNAME = 'a';
    // this.user.LASTNAME = "a";
    // this.user.EMAIL = "assss";
    // this.user.PHONE = "089098990";
    // this.user.TID = '2';
    // this.user.CWT = "40";
    // this.user.PASSWORD = "1234";
    // this.user.USERNAME = "asss";
    // this.user.STATUS = true;
    // this.user.TITLE = "Mr";
    // this.user.SSN = "12324141213123";
    // this.user.LEVID = "2";
    // if (this.user.TID < '4') {
    //   this.areasservices.getAllAreaData().then(
    //     datas => {
    //       this.areasData.areas = datas;
    //       sessionStorage.setItem("areas", JSON.stringify(datas));
    //       console.log("recieve area");
    //     }
    //   ).catch(err => {
    //     console.log(err)
    //   }
    //   );
    // } else {
    //   this.areasservices.getAreaByCWT(this.user.CWT).then(
    //     datas => {
    //       this.areasData.areas = datas;
    //       sessionStorage.setItem("areas", JSON.stringify(datas));
    //     }
    //   ).catch(err => {
    //     console.log(err)
    //   }
    //   );
    // }
    // if (this.user.TID == '2') {
    //   this.user.TID = '0';
    // }
    // sessionStorage.setItem("user", JSON.stringify(this.user));
    // this.router.navigate(['/staff']);


  }

  editUser() {
    localStorage.setItem("edit_user", JSON.stringify(this.user));
    this.router.navigate(["/edit_user"]);
  }

  logoutClick() {
    console.log("logOut");
    sessionStorage.removeItem("user");
    this.router.navigate(['/']);
    location.reload();
  }

}
