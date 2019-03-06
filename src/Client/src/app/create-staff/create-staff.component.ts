import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EX_EA } from '../models/EAData';
@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {
  user: User = new User();
  users = new Users();
  areas: Areas = new Areas();
  cwt_list: String[] = [];
  role_list: String[] = [];
  imageSrc;
  selected_cwt;
  selected_role;
  constructor(private userservice: UserService, private router: Router, private _location: Location) { }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    this.userservice.getFilteredUser(user.TID, user.CWT).then(result => {
      this.users.users = result;
    }).catch(err => { console.log(err) });
    this.role_list = this.users.getLowerRole(user.TID);
    this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
    this.cwt_list = this.areas.getCWT();
    //this.user.USERID = "0000000";
    this.user.STATUS = false;
  }

  onSelectCwt() {
    this.user.CWT = this.areas.getIdCwtByName(this.selected_cwt);
    this.user.CWT_NAME = this.selected_cwt;
    //this.user.USERID = this.user.CWT+this.user.USERID.slice(2,7)
    if (this.user.TID) {
      let cwt = this.user.CWT;
      let TID = this.user.TID;
      //this.user.USERID = this.users.createNewUserID(cwt,TID);
    }
  }

  onSelectRole() {
    this.user.TID = this.getRoleLevelByName(this.selected_role);
    this.user.TYPE_NAME = this.selected_role;
    //this.user.USERID = this.user.USERID.slice(0,2)+this.user.TID+this.user.USERID.slice(3,7)
    if (this.user.CWT) {
      let cwt = this.user.CWT;
      let TID = this.user.TID;
      this.user.USERID = this.users.createNewUserID(cwt, TID);
    }
  }

  getRoleLevelByName(roleName) {
    let role_map = { "ผู้ดูแลระบบ": '1', "ผู้บริหาร/เจ้าของโครงการ": '2', "สถิติจังหวัด": '3', "เจ้าหน้าผู้ควบคุมงาน": '4', "เจ้าหน้าที่เก็บรวบรวมข้อมูล": '5' };
    return role_map[roleName];
  }

  saveData() {

    let area_id = this.areas.getIdCwtByName(this.selected_cwt);
    this.user.CWT = area_id;
    this.user.CWT_NAME = this.selected_cwt;
    this.user.TID = this.getRoleLevelByName(this.selected_role);
    this.user.TYPE_NAME = this.selected_role;
    // if (this.imageSrc) {
    //   this.userservice.uploadImageService(data.pic[0]);
    // }
    this.userservice.insertUser(this.user).then(result => {
      this.backClicked();
    }).catch(err => { console.log(err) });
  }

  backClicked() {
    this._location.back();
  }

  createImage(files) {
    var file = files[0];
    var reader = new FileReader();
    var src;
    var container = this;
    reader.onload = function (e) {
      src = reader.result;
      container.imageSrc = src;
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
