import { Component, OnInit } from '@angular/core';
import { Tablets } from '../models/tablets';
import { Tablet } from '../models/tablet';
import { Router } from '@angular/router';
import { TabletService } from '../services/tablet.service';
import { Users } from '../models/users';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
@Component({
  selector: 'app-tablet-list',
  templateUrl: './tablet-list.component.html',
  styleUrls: ['./tablet-list.component.css']
})
export class TabletListComponent implements OnInit {

  tablets: Tablet[] = [];
  filtered_tablet: Tablet[];
  checked_map = {};
  users: Users = new Users();
  page = 1;
  sort_by = "รหัสเจ้าหน้าที่";
  sort_with = "น้อยไปมาก";
  col_name = ["ชื่อจังหวัด", "ชื่อสิทธิ์", "รหัสเจ้าหน้าที่ผู้ถือ","Serial เครื่อง Tablet", "หมายเลขซิม", "หมายเลขแบตสำรอง"];
  col_name_map = { "ชื่อจังหวัด": "cwt","ชื่อสิทธิ์":"tid", "รหัสเจ้าหน้าที่ผู้ถือ":"user_id" ,"Serial เครื่อง Tablet": "tablet_sn", "หมายเลขซิม": "sim", "หมายเลขแบตสำรอง": "powerbank_sn"};
  sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  constructor(private router: Router, private tabletservice: TabletService, private userservice: UserService) { }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    if (user.TID == "3") {
      this.tabletservice.getTabletDataByCWT(user.CWT).then(response => {
        this.tablets = response;
        this.showPage();
        this.createCheckedMap();
      }).catch(err => { console.log(err) });
      this.userservice.getFilteredUser('2', user.CWT).then(users => {
        this.users.users = users;
        this.sortData()
      }).catch(err => { console.log(err) });
    }else if(user.TID == "1"){
      this.tabletservice.getTabletData().then(response => {
        this.tablets = response;
        this.showPage();
        this.createCheckedMap();
      }).catch(err => { console.log(err) });
      this.userservice.getFilteredUser('2', user.CWT).then(users => {
        this.users.users = users;
        this.sortData()
      }).catch(err => { console.log(err) });
    }
  }

  sortData() {
    if (this.sort_with_map[this.sort_with] == 'A') {
      this.tablets.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]]));
    } else {
      this.tablets.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]])).reverse();
    }
    this.filtered_tablet = this.tablets.slice(50 * (this.page - 1), 50 * this.page);
  }

  checkAll() {
    Object.keys(this.checked_map).forEach(
      item => { this.checked_map[item] = this.checked_map['0'] }
    );
  }

  private createCheckedMap() {
    this.checked_map["0"] = false;
    for (let tablet of this.tablets) {
      this.checked_map[tablet.tablet_sn] = false;
    }
  }

  createTablet() {
    this.router.navigate(["/createtablet"]);
  }

  deleteTablet() {
    let delete_ids = Object.keys(this.checked_map).filter(k => this.checked_map[k] && k != '0');
    delete_ids.forEach(element => {
      let index = this.tablets.findIndex(tablet => tablet.tablet_sn === element);
      let deleted_area = this.tablets.splice(index, 1);
      this.tabletservice.deleteTablet(element).then(res => { console.log(res) }).catch(err => { console.log(err) });
    });
    this.showPage();
  }

  reloadData() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    if (user.TID == "3") {
      this.tabletservice.getTabletDataByCWT(user.CWT).then(response => {
        this.tablets = response;
        this.showPage();
        this.createCheckedMap();
      }).catch(err => { console.log(err) });
      this.userservice.getFilteredUser('4', user.CWT).then(users => {
        this.users.users = users;
        this.sortData()
      }).catch(err => { console.log(err) });
    }
  }

  showPage() {
    this.filtered_tablet = this.tablets.slice(50 * (this.page - 1), 50 * this.page);
  }

  editTablet(tablet: Tablet) {
    localStorage.setItem("tablet", JSON.stringify(tablet));
    this.router.navigate(["/edittablet"]);
  }

  uploadTablet(){
    this.router.navigate(["/upload_tablet"]);
  }
}
