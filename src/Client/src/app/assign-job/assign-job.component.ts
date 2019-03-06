import { Component, OnInit } from '@angular/core';
import { Areas } from '../models/areas';
import { UserService } from '../services/user.service';
import { Area } from '../models/area';
import { User } from '../models/user';
import { Users } from '../models/users';
import { AreasService } from '../services/areas.service';
@Component({
  selector: 'app-assign-job',
  templateUrl: './assign-job.component.html',
  styleUrls: ['./assign-job.component.css']
})
export class AssignJobComponent implements OnInit {

  filtered_users;
  filtered_areas = new Areas();
  user_page = 1;
  ea_page = 1;
  user: User;
  datas = new Areas();
  nodes: any = [];
  options = {};
  checked_user_map = {};
  checked_ea_map = {};
  user_list: any = [];
  has_job;
  reg_list;
  cwt_list;
  amp_list;
  tam_list;
  dis_list;
  ea_list;
  filter_ea_list: Area[] = [];
  job_data: User[] = [];
  job_area_data: Area[] = [];

  selected_reg;
  selected_cwt;
  selected_amp;
  selected_tam;
  selected_dis;
  selected_ea;
  selected_assign = "ทั้งหมด";
  users_for_search: string[];
  ea_id;
  users: Users;
  deleted_ea = [];
  deleted_fi_list = [];
  deleted_fs_list = [];
  area_sort_by = "ชื่อภาค";
  area_sort_with = "น้อยไปมาก";
  area_col_name = ["รหัสภาค", "ชื่อภาค", "รหัสจังหวัด", "ชื่อจังหวัด", "รหัสอำเภอ", "ชื่ออำเภอ", "รหัสตำบล", "ชื่อตำบล", "เขตการปกครอง", "เขตแจงนับ"]
  area_col_name_map = { "รหัสภาค": "REG", "ชื่อภาค": "REG_NAME", "รหัสจังหวัด": "CWT", "ชื่อจังหวัด": "CWT_NAME", "รหัสอำเภอ": "AMP", "ชื่ออำเภอ": "AMP_NAME", "รหัสตำบล": "TAM", "ชื่อตำบล": "TAM_NAME", "เขตการปกครอง": "DISTRICT", "เขตแจงนับ": "EA" }
  area_sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  area_sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  sort_by = "รหัสเจ้าหน้าที่";
  sort_with = "น้อยไปมาก";
  col_name = ["รหัสเจ้าหน้าที่", "ชื่อ", "นามสกุล", "อีเมลล์", "เบอร์โทรศัพท์", "สิทธิ์"];
  col_name_map = { "รหัสเจ้าหน้าที่": "USERID", "ชื่อ": "FIRSTNAME", "นามสกุล": "LASTNAME", "อีเมลล์": "EMAIL", "เบอร์โทรศัพท์": "PHONE", "สิทธิ์": "TID" };
  sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  assign_list = ["ทั้งหมด","มอบหมายแล้ว","ยังไม่ได้มอบหมายงาน"];
  constructor(private userservice: UserService, private areaService: AreasService) { }

  ngOnInit() {
    this.has_job = 0;
    this.job_data = [];
    this.filtered_areas.areas = [];
    this.deleted_ea = [];
    this.deleted_fi_list = [];
    this.deleted_fs_list = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.users = new Users();
    if (this.user.TID === '4') {
      this.areaService.getAreaByFS(this.user.USERID).then(result => {
        this.datas.areas = result;
        this.nodes = this.datas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.selected_reg = this.reg_list[0].name;
        this.selected_cwt = this.user.CWT_NAME;
        this.regSelected();
        this.cwtSelected();
        this.getUserData();
      }).catch(err => { console.log(err) });
    } else if (this.user.TID === '3') {
      this.areaService.getAreaByCWT(this.user.CWT).then(result => {
        this.datas.areas = result;
        this.nodes = this.datas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.selected_reg = this.reg_list[0].name;
        this.selected_cwt = this.user.CWT_NAME;
        this.regSelected();
        this.cwtSelected();
        this.getUserData();
      }).catch(err => { console.log(err) });
    }
  }

  sortEaData() {
    if (this.area_sort_with_map[this.area_sort_with] == 'A') {
      this.filtered_areas.areas.sort((a, b) => a[this.area_col_name_map[this.area_sort_by]].localeCompare(b[this.area_col_name_map[this.area_sort_by]]));
    } else {
      this.filtered_areas.areas.sort((a, b) => a[this.area_col_name_map[this.area_sort_by]].localeCompare(b[this.area_col_name_map[this.area_sort_by]])).reverse();
    }
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 50 * this.ea_page);
  }

  sortData() {
    if (this.sort_with_map[this.sort_with] == 'A') {
      this.user_list.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]]));
    } else {
      this.user_list.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]])).reverse();
    }
    this.filtered_users = this.user_list.slice(0, 50 * this.user_page);
  }

  getUserData() {
    this.userservice.getAllUserData().then(result => {
      this.users.users = result;
      this.user_list = this.users.getFilteredUser(this.user.TID, this.user.CWT).filter(user => user.TID === (parseInt(this.user.TID) + 1) + "");
      this.users_for_search = this.user_list.map(usr => usr.USERID + ":" + usr.FIRSTNAME + " " + usr.LASTNAME);
      this.filtered_users = this.user_list.slice(0, 10 * this.user_page);
      this.filtered_areas.areas = this.datas.areas;
      this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
      this.users.users = this.user_list;
      this.createCheckedMap();
    }).catch(err => { console.log(err) });
  }

  showUserPage() {
    this.filtered_users = this.user_list.slice(10 * (this.user_page - 1), 10 * this.user_page);
  }
  showEaPage() {
    this.filter_ea_list = this.filtered_areas.areas.slice(10 * (this.ea_page - 1), 10 * this.ea_page);
  }

  private createCheckedMap() {
    this.checked_user_map['0'] = false;
    for (const user of this.user_list) {
      this.checked_user_map[user.USERID] = false;
    }
    this.checked_ea_map['0'] = false;
    for (const area of this.filtered_areas.areas) {
      this.checked_ea_map[area.REG + area.CWT + area.AMP + area.TAM + area.DISTRICT + area.EA] = false;
    }
  }

  regSelected() {
    const index = this.reg_list.findIndex(node => node.name === this.selected_reg);
    this.cwt_list = this.reg_list[index].children;
    this.filtered_areas.areas = this.datas.filterAreasByREG(this.reg_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.reg_list[index].id;
    this.assignSelect();
  }

  cwtSelected() {
    const index = this.cwt_list.findIndex(node => node.name === this.selected_cwt);
    this.amp_list = this.cwt_list[index].children;
    this.filtered_areas.areas = this.datas.filterAreasByCWT(this.cwt_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.cwt_list[index].id;
    this.assignSelect();
  }
  ampSelected() {
    const index = this.amp_list.findIndex(node => node.name === this.selected_amp);
    this.tam_list = this.amp_list[index].children;
    this.filtered_areas.areas = this.datas.filterAreasByAMP(this.amp_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.amp_list[index].id;
    this.assignSelect();
  }
  tamSelected() {
    const index = this.tam_list.findIndex(node => node.name === this.selected_tam);
    this.dis_list = this.tam_list[index].children;
    this.filtered_areas.areas = this.datas.filterAreasByTAM(this.tam_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.tam_list[index].id;
    this.assignSelect();
  }
  disSelected() {
    const index = this.dis_list.findIndex(node => node.name === this.selected_dis);
    this.ea_list = this.dis_list[index].children;
    this.filtered_areas.areas = this.datas.filterAreasByDISTRICT(this.dis_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.dis_list[index].id;
    this.assignSelect();
  }
  eaSelected() {
    const index = this.ea_list.findIndex(node => node.name === this.selected_ea);
    this.filtered_areas.areas = this.datas.filterAreasByEA(this.ea_list[index].id);
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
    this.ea_id  = this.ea_list[index].id;
    this.assignSelect();
  }
  assignSelect(){
    let eas = this.datas.getAreasByAreaID(this.ea_id);
    if(this.user.TID == '3'){
      if(this.selected_assign == 'ทั้งหมด'){
        this.filtered_areas.areas = eas;
      }else if(this.selected_assign == 'มอบหมายแล้ว'){
        this.filtered_areas.areas = eas.filter(a => a.FS != null);
      }else if(this.selected_assign == 'ยังไม่ได้มอบหมายงาน'){
        this.filtered_areas.areas = eas.filter(a => a.FS == null);
      }
    }else if(this.user.TID == '4'){
      if(this.selected_assign == 'ทั้งหมด'){
        this.filtered_areas.areas = eas;
      }else if(this.selected_assign == 'มอบหมายแล้ว'){
        this.filtered_areas.areas = eas.filter(a => a.FI != null || a.FI.length == 0);
      }else if(this.selected_assign == 'ยังไม่ได้มอบหมายงาน'){
        this.filtered_areas.areas = eas.filter(a => a.FI == null || a.FI.length != 0);
      }
    }
    this.filter_ea_list = this.filtered_areas.areas.slice(0, 10 * this.ea_page);
  }
  getUserRoleName(role) {
    const role_map = { "ผู้ดูแลระบบ": '1', "ผู้บริหาร/เจ้าของโครงการ": '2', "สถิติจังหวัด": '3', "เจ้าหน้าผู้ควบคุมงาน": '4', "เจ้าหน้าที่เก็บรวบรวมข้อมูล": '5' };
    return role_map[role];
  }
  checkAllEa() {
    Object.keys(this.checked_ea_map).forEach(
      item => {
        if (this.datas.getAreasByAreaID(item)[0] != null && this.datas.getAreasByAreaID(item)[0].FS == null) {
          this.checked_ea_map[item] = this.checked_ea_map['0'];
        }
      }
    );
  }
  checkAllUser() {
    Object.keys(this.checked_user_map).forEach(
      item => { this.checked_user_map[item] = this.checked_user_map['0']; }
    );
  }
  showUserAndEa() {
    const ea_ids = Object.keys(this.checked_ea_map).filter(k => this.checked_ea_map[k] && k !== '0');
    const eas = this.filtered_areas.areas.filter(area => ea_ids.findIndex(ea => ea === area.REG + area.CWT +
      area.AMP + area.TAM + area.DISTRICT + area.EA) !== -1).map(e => e.REG + e.CWT + e.AMP + e.TAM + e.DISTRICT + e.EA);
    const user_ids = Object.keys(this.checked_user_map).filter(k => this.checked_user_map[k] && k !== '0');
    let users = this.user_list.filter(user => user_ids.findIndex(u => u === user.USERID) !== -1);
    for (let user of users) {
      user.jobs = eas;
      this.job_data.push(user);
    }

    this.has_job = eas.length > 0 && users.length > 0;
    this.job_data = users;
  }
  assignJob() {
    const ea_ids = Object.keys(this.checked_ea_map).filter(k => this.checked_ea_map[k] && k !== '0');
    const eas = this.filtered_areas.areas.filter(area => ea_ids.findIndex(ea => ea === area.REG + area.CWT +
      area.AMP + area.TAM + area.DISTRICT + area.EA) !== -1).map(e => e.REG + e.CWT + e.AMP + e.TAM + e.DISTRICT + e.EA);
    const user_ids = Object.keys(this.checked_user_map).filter(k => this.checked_user_map[k] && k !== '0');
    let users = this.user_list.filter(user => user_ids.findIndex(u => u === user.USERID) !== -1);
    for (let ea of eas) {
      let area = this.datas.filterAreasByEA(ea);
      if (this.user.TID === '4') {
        if(area[0].FI == null || area[0].FI.length == 0){
          area[0].FI = users.map(user => user.USERID);
        }else{
          let user_ids = users.map(user => user.USERID);
          user_ids.forEach(element => {
            let index = area[0].FI.findIndex(id => id == element);
            if(index  == -1){
              area[0].FI.push(element);
            }
          });
        }
      }
      if (this.user.TID === '3') {
        area[0].FS = users.map(user => user.USERID)[0];
      }
      this.areaService.updateArea(area[0]).then(result => {
          alert("มอบหมายงานเรียบร้อย");
          this.reloadData();
      }).catch(err => { console.log(err) });
    }
  }
  unAssignJobFI(ea: Area, user_id: string) {
    let index = ea.FI.findIndex(usr => usr === user_id);
    if (!ea.FI_H) {
      ea.FI_H = [];
      ea.FI_H.push(ea.FI[index])
    }else{
      let idx = ea.FI_H.findIndex(i => i == user_id)
      if(idx == -1){
        ea.FI_H.push(ea.FI[index])
      }
    }
    this.deleted_ea.push(ea);
    ea.FI.splice(index, 1);
    if (ea.FI.length === 0) {
      ea.FI = [];
    }
  }

  unAssignJobFS(ea: Area, user_id: string) {
    if (!ea.FS_H) {
      ea.FS_H = [];
    }
    ea.FS_H.push(ea.FS);
    ea.FS = null;
    this.deleted_ea.push(ea);
  }

  deleteJob() {
    let count = this.deleted_ea.length;
    for (let ea of this.deleted_ea) {
      this.areaService.updateArea(ea).then(result => {
        count--;
        if (count == 0) {
          this.reloadData();
        }
      }).catch(err => { console.log(err) });
    }
  }

  onSearchSelected($event) {
    let user_id = $event.split(":")[0];
    this.filtered_users = this.user_list.filter(usr => usr.USERID === user_id);
  }

  reloadData() {
    this.ngOnInit();
  }
}
