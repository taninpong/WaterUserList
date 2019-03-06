import { Component, OnInit } from '@angular/core';
import { Areas } from '../models/areas';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Users } from '../models/users';
import * as XLSX from 'xlsx';
import { AreasService } from '../services/areas.service';
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  areas: Areas = new Areas();
  cwt_list: any = [];
  role_list: string[] = ["ทั้งหมด", "ผู้ดูแลระบบ", "ผู้บริหาร/เจ้าของโครงการ", "สถิติจังหวัด", "เจ้าหน้าผู้ควบคุมงาน", "เจ้าหน้าที่เก็บรวบรวมข้อมูล"];
  status_list = ['ทั้งหมด', 'เปิดการใช้งาน', 'ปิดการใช้งาน'];
  user_list: any = [];
  filtered_cwt = "ทั้งหมด";
  filtered_role = "ทั้งหมด";
  filtered_status = "ทั้งหมด";
  filtered_users;
  all_user = [];
  users_for_search: string[];
  checked_map = {};
  page = 1;
  deleted = false;
  sort_by = "รหัสเจ้าหน้าที่";
  sort_with = "น้อยไปมาก";
  col_name = ["รหัสเจ้าหน้าที่", "ชื่อ", "นามสกุล", "อีเมลล์", "เบอร์โทรศัพท์", "สิทธิ์"];
  col_name_map = { "รหัสเจ้าหน้าที่": "USERID", "ชื่อ": "FIRSTNAME", "นามสกุล": "LASTNAME", "อีเมลล์": "EMAIL", "เบอร์โทรศัพท์": "PHONE", "สิทธิ์": "TID" };
  sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  status_map = { "เปิดการใช้งาน": true, "ปิดการใช้งาน": false };
  sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  constructor(private areaservice: AreasService, private userservice: UserService, private router: Router) { }

  ngOnInit() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    let user_role = user.TID;
    let user_area: string = user.CWT;
    this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
    if (user_role === '1') {
      this.userservice.getAllUserData().then(datas => {
        let users: Users = new Users();
        users.users = datas;
        this.user_list = datas;
        this.all_user = datas;
        this.filtered_users = this.user_list.slice(0, 50 * this.page);
        this.users_for_search = this.user_list.map(usr => usr.USERID + ":" + usr.FIRSTNAME + " " + usr.LASTNAME);
        this.createCheckedMap();
        this.sortData();
      }).catch(err => { console.log(err) });
    } else {
      this.userservice.getFilteredUser(user.TID, user.CWT).then(datas => {
        let users: Users = new Users();
        users.users = datas;
        this.user_list = datas;
        this.all_user = datas;
        this.filtered_cwt = user.CWT_NAME;
        this.filtered_users = this.user_list.slice(0, 50 * this.page);
        this.users_for_search = this.user_list.map(usr => usr.USERID + ":" + usr.FIRSTNAME + " " + usr.LASTNAME);
        this.createCheckedMap();
        this.sortData();
      }).catch(err => { console.log(err) });
    }

    if (user.TID === '4') {
      this.areaservice.getAreaByFS(user.USERID).then(result => {
        this.areas.areas = result;
        sessionStorage.setItem('areas', JSON.stringify(this.areas.areas));
      }).catch(err => { console.log(err) });
    } else if (user.TID <= '3') {
      this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
      if (user.TID == '3') {
        if (this.areas.areas.length == 0) {
          this.areaservice.getAreaByCWT(user.CWT).then(res => {
            this.areas.areas = res;
            sessionStorage.setItem('areas', JSON.stringify(this.areas.areas));
          }).catch(err => console.log(err));
        }
      } else {
        if (this.areas.areas.length == 0) {
          this.areaservice.getAllAreaData().then(res => {
            this.areas.areas = res;
            sessionStorage.setItem('areas', JSON.stringify(this.areas.areas));
          }).catch(err => console.log(err));
        }
      }
    }
    this.cwt_list = this.areas.getCWT();
    this.cwt_list.unshift({ id: "0", name: "ทั้งหมด" })
  }

  sortData() {
    if (this.sort_with_map[this.sort_with] == 'A') {
      this.user_list.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]]));
    } else {
      this.user_list.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]])).reverse();
    }
    this.filtered_users = this.user_list.slice(0, 50 * this.page);
  }

  checkAll() {
    Object.keys(this.checked_map).forEach(
      item => { this.checked_map[item] = this.checked_map['0'] }
    );
  }

  filterData() {
    this.user_list = this.all_user;
    if (!(this.filtered_cwt == "ทั้งหมด" && this.filtered_role == "ทั้งหมด" && this.filtered_status == "ทั้งหมด")) {
      if (this.filtered_cwt != "ทั้งหมด") {
        this.user_list = this.user_list.filter(user => user.CWT_NAME === this.filtered_cwt);
      }
      if (this.filtered_role != "ทั้งหมด") {
        this.user_list = this.user_list.filter(user => user.TYPE_NAME === this.filtered_role);
      }
      if (this.filtered_status != "ทั้งหมด") {
        this.user_list = this.user_list.filter(user => user.STATUS === this.status_map[this.filtered_status]);
      }
    }
    this.filtered_users = this.user_list.slice(0, 50 * this.page);
  }

  private createCheckedMap() {
    this.checked_map["0"] = false;
    for (let user of this.user_list) {
      this.checked_map[user.USERID] = false;
    }
  }

  getUserRoleName(role) {
    let role_map = { '1': "ผู้ดูแลระบบ", '2': "ผู้บริหาร/เจ้าของโครงการ", '3': "สถิติจังหวัด", '4': "เจ้าหน้าผู้ควบคุมงาน", '5': "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
    return role_map[role];
  }

  getCwtNameById(id) {
    return this.cwt_list.find(cwt => cwt.id === id).name
  }

  editUser(user) {
    localStorage.setItem("edit_user", JSON.stringify(user));
    this.router.navigate(["/edit_user"]);
  }
  createUser() {
    this.router.navigate(["/create_user"]);
  }
  deleteConfirm() {
    this.deleted = true;
  }
  deleteUser() {
    let delete_ids = Object.keys(this.checked_map).filter(k => this.checked_map[k] && k != '0');
    delete_ids.forEach(element => {
      let index = this.user_list.findIndex(user => user.USERID === element);
      this.user_list.splice(index, 1);
      this.filtered_users = this.user_list.slice(0, 50 * this.page);
      this.userservice.deleteUsers(element).then(result => { console.log(result) }).catch(err => { console.log(err) });
    });
    this.deleted = false;
  }
  uploadUser() {
    this.router.navigate(["/upload_user"]);
  }

  onSearchSelected($event) {
    let user_id = $event.split(":")[0];
    this.filtered_users = this.user_list.filter(usr => usr.USERID === user_id);
  }

  exportToExcel() {
    let progress_list = this.createJsonDataForExport();
    console.log(progress_list);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'staff.xlsx');
  }

  createJsonDataForExport() {
    let key_to_thai = { USERID: "รหัส", TITLE: "คำนำหน้า", FIRSTNAME: "ชื่อ", LASTNAME: "สกุล", EMAIL: "อีเมลล์", PHONE: "โทรศัพท์", PASSWORD: "รหัสผ่าน", SSN: "รหัสบัตรประชาชน", TYPE_NAME: "ชื่อสิทธิ์", CWT_NAME: "จังหวัด" };
    let result_list = [];
    this.user_list.forEach(u => {
      let juser = {};
      Object.keys(u).forEach(data => {
        if (Object.keys(key_to_thai).findIndex(k => k === data) != -1) {
          juser[key_to_thai[data]] = u[data];
        }
      });
      result_list.push(juser);
    });
    return JSON.parse(JSON.stringify(result_list));
  }

  showPage() {
    this.filtered_users = this.user_list.slice(50 * (this.page - 1), 50 * this.page);
  }
  reloadUser() {
    this.ngOnInit();
  }
}
