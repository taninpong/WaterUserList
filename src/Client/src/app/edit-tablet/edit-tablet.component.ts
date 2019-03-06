import { Component, OnInit } from '@angular/core';
import { Tablet } from '../models/tablet';
import { Location } from '@angular/common';
import { TabletService } from '../services/tablet.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { AreasService } from '../services/areas.service';
@Component({
  selector: 'app-edit-tablet',
  templateUrl: './edit-tablet.component.html',
  styleUrls: ['./edit-tablet.component.css']
})
export class EditTabletComponent implements OnInit {
  tablet: Tablet = new Tablet();
  cwt_list: String[] = [];
  role_list: String[] = [];
  user_list: string[] = [];
  selected_cwt: string;
  selected_role: string;
  selected_user: string;
  users: Users = new Users();
  areas: Areas = new Areas();
  user: User = new User();
  constructor(private _location: Location, private tabletservice: TabletService, private userservice: UserService, private areaservice: AreasService) { }

  ngOnInit() {
    this.tablet = JSON.parse(localStorage.getItem("tablet"));
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.selected_cwt = this.tablet.cwt;
    this.selected_role = this.tablet.tid;

    if (this.user.TID > '3') {
      this.userservice.getLowerUser('2').then(users => {
        this.users.users = users;
        this.user_list = this.users.users.map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
        if (this.tablet.user_id != null) {
          this.selected_user = this.tablet.user_id + ": " + this.users.getUserByID(this.tablet.user_id).FIRSTNAME + "  " + this.users.getUserByID(this.tablet.user_id).LASTNAME;
        }
        this.role_list = this.users.getLowerRole(parseInt(this.user.TID) - 1);
        this.createAreasData();
      }).catch(err => { console.log(err) });
    } else {
      this.userservice.getFilteredUser('2', this.user.CWT).then(users => {
        this.users.users = users;
        this.user_list = this.users.users.map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
        if (this.tablet.user_id != null) {
          this.selected_user = this.tablet.user_id + ": " + this.users.getUserByID(this.tablet.user_id).FIRSTNAME + "  " + this.users.getUserByID(this.tablet.user_id).LASTNAME;
        }
        this.role_list = this.users.getLowerRole(parseInt(this.user.TID) - 1);
        this.createAreasData();
      }).catch(err => { console.log(err) });
    }
  }
  roleSelected() {
    if (this.selected_cwt == null) {
      this.user_list = this.users.users.filter(user => user.TYPE_NAME == this.selected_role).map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
    } else {
      this.user_list = this.users.users.filter(user => user.CWT_NAME == this.selected_cwt).filter(user => user.TYPE_NAME == this.selected_role).map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
    }
    this.tablet.tid = this.selected_role;
  }
  cwtSelected() {
    if (this.selected_role == null) {
      this.user_list = this.users.users.filter(user => user.CWT_NAME == this.selected_cwt).map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
    } else {
      this.user_list = this.users.users.filter(user => user.CWT_NAME == this.selected_cwt).filter(user => user.TYPE_NAME == this.selected_role).map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
    }
    this.tablet.cwt = this.selected_cwt;
  }
  createAreasData() {
    let area = sessionStorage.getItem("areas");
    if (area == null) {
      if (this.user.TID <= '3') {
        this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
        if (this.user.TID == '3') {
          if (this.areas.areas.length == 0) {
            this.areaservice.getAreaByCWT(this.user.CWT).then(res => {
              this.areas.areas = res;
              this.cwt_list = this.areas.getCWT();
              sessionStorage.setItem('areas', JSON.stringify(this.areas.areas));
            }).catch(err => console.log(err));
          }
        } else {
          if (this.areas.areas == null || this.areas.areas == undefined) {
            this.areaservice.getAllAreaData().then(res => {
              this.areas.areas = res;
              this.cwt_list = this.areas.getCWT();
              sessionStorage.setItem('areas', JSON.stringify(this.areas.areas));
            }).catch(err => console.log(err));
          }
        }
      }
    } else {
      this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
      this.cwt_list = this.areas.getCWT();
    }
  }
  saveData() {
    this.tablet.user_id = this.selected_user.split(":")[0];
    this.tabletservice.updateTablet(this.tablet).then(res => {
      console.log(res);
      this.backClicked();
    }
    ).catch(err => { console.log(err) });
  }

  backClicked() {
    this._location.back();
  }
}
