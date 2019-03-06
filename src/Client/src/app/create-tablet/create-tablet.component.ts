import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Tablet } from '../models/tablet';
import { TabletService } from '../services/tablet.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-create-tablet',
  templateUrl: './create-tablet.component.html',
  styleUrls: ['./create-tablet.component.css']
})
export class CreateTabletComponent implements OnInit {
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
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user.TID > '3') {
      this.userservice.getLowerUser('2').then(users => {
        this.users.users = users;
        this.user_list = this.users.users.map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
        this.role_list = this.users.getLowerRole(parseInt(this.user.TID) - 1);
        this.createAreasData();
      }).catch(err => { console.log(err) });
    } else {
      this.userservice.getFilteredUser('2', this.user.CWT).then(users => {
        this.users.users = users;
        this.user_list = this.users.users.map(user => user.USERID + ": " + user.FIRSTNAME + "  " + user.LASTNAME);
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
        } else if (this.user.TID == '3') {
          this.areaservice.getAreaByCWT(this.user.CWT).then(
            datas => {
              this.areas.areas = datas;
              sessionStorage.setItem("areas", JSON.stringify(datas));
            }
          ).catch(err => {
            console.log(err)
          }
          );
        } else if (this.user.TID == '4') {
          this.areaservice.getAreaByFS(this.user.USERID).then(
            datas => {
              this.areas.areas = datas;
              sessionStorage.setItem("areas", JSON.stringify(datas));
            }
          ).catch(err => {
            console.log(err);
          }
          );
        }
      }
    } else {
      this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
      this.cwt_list = this.areas.getCWT();
    }
  }
  saveData() {
    this.tablet.user_id = this.selected_user.split(":")[0];
    this.tabletservice.insertTablet(this.tablet).then(res => {
      console.log(res);
      this.backClicked();
    }).catch(err => { console.log(err) });
  }

  backClicked() {
    this._location.back();
  }

}
