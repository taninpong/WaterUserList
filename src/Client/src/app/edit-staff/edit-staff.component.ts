import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  user: User;
  areas: Areas = new Areas();
  cwt_list: String[] = [];
  role_list: String[] = [];
  selected_cwt;
  selected_role;
  imageSrc;
  users = new Users();
  constructor(private userservice: UserService, private router: Router, private _location: Location) { }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    this.user = JSON.parse(localStorage.getItem("edit_user"));
    if(user.USERID === this.user.USERID){
      this.role_list = this.getRoleList(parseInt(user.TID)-1).map(role => this.getUserRoleName(role));
    }else{
      this.role_list = this.getRoleList(user.TID).map(role => this.getUserRoleName(role));
    }
   
    this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
    
    this.cwt_list = this.areas.getCWT();
    this.selected_cwt = this.user.CWT_NAME;
    this.selected_role = this.getUserRoleName(this.user.TID);
   
  }

  getUserRoleName(role) {
    let role_map = {'1':"ผู้ดูแลระบบ",'2':"ผู้บริหาร/เจ้าของโครงการ", '3':"สถิติจังหวัด", '4':"เจ้าหน้าผู้ควบคุมงาน", '5':"เจ้าหน้าที่เก็บรวบรวมข้อมูล"};
    return role_map[role];
  }

  getRoleList(user_role){
   let role_level = ['1','2','3','4','5'];
   return role_level.filter(role => role > user_role);
  }

  getRoleLevelByName(roleName) {
    let role_map = { "ผู้ดูแลระบบ":'1',"ผู้บริหาร/เจ้าของโครงการ": '2', "สถิติจังหวัด" :'3', "เจ้าหน้าผู้ควบคุมงาน" : "4", "เจ้าหน้าที่เก็บรวบรวมข้อมูล" : "5" };
    return role_map[roleName];
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

  saveData() {
    let area_id = this.areas.getIdCwtByName(this.selected_cwt);
    this.user.CWT = area_id;
    this.user.CWT_NAME = this.selected_cwt;
    this.user.TID = this.getUserRoleName(this.selected_role);
    this.user.TYPE_NAME = this.selected_role;
    // if (this.imageSrc) {
    //   this.userservice.uploadImageService(data.pic[0]);
    // }
    this.userservice.updateUser(this.user).then(result => { 
      this.backClicked();
     }).catch(err => { console.log(err) });
  }

  backClicked() {
    this._location.back();
  }
}
