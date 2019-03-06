import { Component, OnInit } from '@angular/core';
import { Areas } from '../models/areas';
import { UserService } from '../services/user.service';
import { Progress } from '../models/progress';
import { AreasService } from '../services/areas.service';
import { User } from '../models/user';
import { Area } from '../models/area';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { SN1 } from '../models/SN1/SN1';
import { Sn1Service } from '../services/sn1.service';
import { Sn22Service } from '../services/sn22.service';
import { SN2_2 } from '../models/SN2_2/SN2_2';

@Component({
  selector: 'app-job-track',
  templateUrl: './job-track.component.html',
  styleUrls: ['./job-track.component.css']
})
export class JobTrackComponent implements OnInit {

  nodes: any = [];
  options = {};
  user: User;
  users: Users = new Users();
  areas: Areas = new Areas();
  reg_list;
  cwt_list;
  amp_list;
  tam_list;
  ea_list;
  dis_list;
  fs_list;
  fi_list;
  selected_fs: string;
  selected_fi: string;
  selected_reg;
  selected_cwt;
  selected_amp;
  selected_tam;
  selected_ea;
  selected_dis;
  page = 1;
  selected_id = '';
  sn_1List: SN1[] = [];
  sn2_2List: SN2_2[] = [];
  selected_sn1: SN1;
  hasMassege = false;
  messege: string;
  selected_sn1status = "ทั้งหมด";
  hasComment = false;
  comment: { date: Date, messege: string };
  filter_area = new Areas();
  area_list;
  sn1_statuses = ["ทั้งหมด", "ยังไม่ครบทุกหน่วย", "สำรวจครบแล้ว", "เจ้าหน้าที่ผู้ควบคุมงานตรวจสอบแล้ว", "สถิติจังหวัดตรวจสอบแล้ว"]
  status_sn = { 1: "ไม่ให้เข้าพบในครั้งที่ 1", 2: "ไม่ให้เข้าพบในครั้งที่ 2", 3: "หยุดชั่วคราว", 0: "ยังไม่เสร็จ", 4: "รอการตรวจสอบ", 10: "รอแก้ไข" };
  status_appr = { 0: "ยังไม่ครบทุกหน่วย", 1: "สำรวจครบแล้ว", 2: "เจ้าหน้าที่ผู้ควบคุมงานตรวจสอบแล้ว", 3: "สถิติจังหวัดตรวจสอบแล้ว" };
  sort_by = "ชื่อภาค";
  sort_with = "น้อยไปมาก";
  col_name = ["รหัสภาค", "ชื่อภาค", "รหัสจังหวัด", "ชื่อจังหวัด", "รหัสอำเภอ", "ชื่ออำเภอ", "รหัสตำบล", "ชื่อตำบล", "เขตการปกครอง", "เขตแจงนับ"]
  col_name_map = { "รหัสภาค": "REG", "ชื่อภาค": "REG_NAME", "รหัสจังหวัด": "CWT", "ชื่อจังหวัด": "CWT_NAME", "รหัสอำเภอ": "AMP", "ชื่ออำเภอ": "AMP_NAME", "รหัสตำบล": "TAM", "ชื่อตำบล": "TAM_NAME", "เขตการปกครอง": "DISTRICT", "เขตแจงนับ": "EA" }
  sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  constructor(private sn22Service: Sn22Service, private sn1Service: Sn1Service, private userservice: UserService, private areaService: AreasService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user.TID < '3') {
      this.userservice.getAllUserData().then(result => {
        this.users.users = result;
        this.users.users.push(this.user);
      }).catch(err => { console.log(err) });
    } else {
      this.userservice.getFilteredUser(this.user.TID, this.user.CWT).then(result => {
        this.users.users = result;
        this.users.users.push(this.user);
      }).catch(err => { console.log(err) });
    }
    this.getSN1Data();
  }
  showPage() {
    this.area_list = this.filter_area.areas.slice(10 * (this.page - 1), 10 * this.page);
  }
  sortData() {
    if (this.sort_with_map[this.sort_with] == 'A') {
      this.filter_area.areas.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]]));
    } else {
      this.filter_area.areas.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]])).reverse();
    }
    this.showPage();
  }

  hasDataSN1(ea: Area) {
    return this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).length > 0;
  }

  getSN1Status(ea: Area) {
    return this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA)[0].status_data;
  }

  hasDataSN22(ea: Area) {
    return this.sn2_2List.filter(sn22 => sn22.SN2_2_ID.slice(0, 11) === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).length > 0;
  }
  hasMessege(ea) {
    let messege_t = this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA)[0].messeges;
    return messege_t && messege_t.length > 0;
  }

  creatStaffList() {
    this.fs_list = this.users.users.filter(user => user.TID === '4' && user.CWT === this.selected_id.slice(1, 3)).map(user => user.USERID + ": " + user.FIRSTNAME + " " + user.LASTNAME);
    this.fi_list = this.users.users.filter(user => user.TID === '5' && user.CWT === this.selected_id.slice(1, 3)).map(user => user.USERID + ": " + user.FIRSTNAME + " " + user.LASTNAME);
    this.fs_list.unshift("ทั้งหมด");
    this.fi_list.unshift("ทั้งหมด");
  }

  createAreas() {
    this.areas.areas = [];
    this.filter_area.areas = [];
    if (this.user.TID == '4') {
      this.areaService.getAreaByFS(this.user.USERID).then(result => {
        this.areas.areas = result;
        this.filter_area.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.selected_reg = this.reg_list[0].name;
        this.sortData();
        this.regSelected();
        this.selected_cwt = this.user.CWT_NAME;
        this.cwtSelected();
        this.showPage();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID == '3') {
      this.areaService.getAreaByCWT(this.user.CWT).then(result => {
        this.areas.areas = result;
        this.filter_area.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.selected_reg = this.reg_list[0].name;
        this.sortData();
        this.regSelected();
        this.selected_cwt = this.user.CWT_NAME;
        this.cwtSelected();
        this.showPage();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID < '3') {
      this.areaService.getAllAreaData().then(result => {
        this.areas.areas = result;
        this.filter_area.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.sortData();
        this.showPage();
      }).catch(err => { console.log(err) });
    }
  }

  getSN1Data() {
    if (this.user.TID === '4') {
      this.sn1Service.getSN1ByFS(this.user.USERID).then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID === '3') {
      this.sn1Service.getSN1ByCWT(this.user.CWT).then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID < '3') {
      this.sn1Service.getSN1Data().then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    }
  }

  getSN22Data() {
    if (this.user.TID === '4') {
      this.sn22Service.getSN22ByFS(this.user.USERID).then(result => {
        this.sn2_2List = result;
        this.createAreas();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID === '3') {
      this.sn22Service.getSN22ByCWT(this.user.CWT).then(result => {
        this.sn2_2List = result;
        this.createAreas();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID < '3') {
      this.sn22Service.getSN22Data().then(result => {
        this.sn2_2List = result;
        this.createAreas();
      }).catch(err => { console.log(err) });
    }
  }

  regSelected() {
    const index = this.reg_list.findIndex(node => node.name === this.selected_reg);
    this.cwt_list = this.reg_list[index].children;
    this.selected_id = this.reg_list[index].id;
    this.selected_cwt = undefined;
    this.selected_amp = undefined;
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }


  cwtSelected() {
    const index = this.cwt_list.findIndex(node => node.name === this.selected_cwt);
    this.amp_list = this.cwt_list[index].children;
    this.selected_id = this.cwt_list[index].id;
    this.creatStaffList();
    this.selected_amp = undefined;
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }

  ampSelected() {
    const index = this.amp_list.findIndex(node => node.name === this.selected_amp);
    this.tam_list = this.amp_list[index].children;
    this.selected_id = this.amp_list[index].id;
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }
  tamSelected() {
    const index = this.tam_list.findIndex(node => node.name === this.selected_tam);
    this.dis_list = this.tam_list[index].children;
    this.selected_id = this.tam_list[index].id;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }
  disSelected() {
    const index = this.dis_list.findIndex(node => node.name === this.selected_dis);
    this.ea_list = this.dis_list[index].children;
    this.selected_id = this.dis_list[index].id;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }

  eaSelected() {
    const index = this.ea_list.findIndex(node => node.name === this.selected_ea);
    this.selected_id = this.ea_list[index].id;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
    this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    this.sn1statusSelected();
    this.showPage();
  }
  getUserRoleName(role) {
    let role_map = { '1': "ผู้ดูแลระบบ", '2': "ผู้บริหาร/เจ้าของโครงการ", '3': "สถิติจังหวัด", '4': "เจ้าหน้าผู้ควบคุมงาน", '5': "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
    return role_map[role];
  }

  sn1statusSelected() {
    if ((this.selected_fi == null || this.selected_fi == "ทั้งหมด") && (this.selected_fs == null && this.selected_fs == "ทั้งหมด")) {
      this.filter_area.areas = this.areas.getAreasByAreaID(this.selected_id);
    } else {
      if (this.selected_fi != null && this.selected_fi != "ทั้งหมด") {
        let fi_id = this.selected_fi.split(":")[0];
        this.selected_amp = undefined;
        this.selected_tam = undefined;
        this.selected_dis = undefined;
        this.selected_ea = undefined;
        this.selected_fs = undefined;
        this.filter_area.areas = this.areas.filterAreasByFI(fi_id);
      }
      if (this.selected_fs != null && this.selected_fs != "ทั้งหมด") {
        let fs_id = this.selected_fs.split(":")[0];
        this.selected_amp = undefined;
        this.selected_tam = undefined;
        this.selected_dis = undefined;
        this.selected_ea = undefined;
        this.selected_fi = undefined;
        this.filter_area.areas = this.areas.filterAreasByFS(fs_id);
      }
    }
    if (this.selected_sn1status != "ทั้งหมด") {
      this.filter_area.areas = this.filter_area.areas.filter(a => this.hasDataSN1(a) && this.status_appr[this.getSN1Status(a)]);
    }
    this.showPage();
  }

  validateClicked(ea) {
    console.log(ea);
    localStorage.setItem('validate_ea', JSON.stringify(ea));
    this.router.navigate(['/validate_job']);
  }

  wc22Clicked(ea) {
    localStorage.setItem('validate_ea', JSON.stringify(ea));
    this.router.navigate(['/validate_wc22home'])
  }
  validatedButtonClicked(ea) {
    this.selected_sn1 = this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA)[0];
    this.selected_sn1.status_approve = 2;
    this.selected_sn1.status_data = 3;
    this.sn1Service.updateSN1(this.selected_sn1).then(res => console.log(res)).catch(err => console.log(err));
  }
  reportFSButtonClicked(ea) {
    this.hasMassege = true;
    this.selected_sn1 = this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA)[0];
  }
  sendMassege() {
    let dateSend = new Date();
    if (this.selected_sn1.messeges == null) {
      this.selected_sn1.messeges = [];
    }

    this.selected_sn1.messeges.push({ date: dateSend, messege: this.messege });
    this.selected_sn1.status_approve = 1;
    this.selected_sn1.status_data = 2;
    this.sn1Service.updateSN1(this.selected_sn1).then(res => {
      console.log(res);
      this.hasMassege = false;
    }).catch(err => console.log(err));
  }
  viewComment(ea) {
    let tmp_message = this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA)[0].messeges;
    this.comment = tmp_message[tmp_message.length - 1];
    this.comment.date = new Date(this.comment.date);
    this.hasComment = true;
  }
}
