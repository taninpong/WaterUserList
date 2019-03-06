import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import { Area } from '../models/area';
import { Areas } from '../models/areas';
import * as XLSX from 'xlsx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Sn22Service } from '../services/sn22.service';
import { Sn1Service } from '../services/sn1.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Users } from '../models/users';
import { SN1 } from '../models/SN1/SN1';
import { SN2_2 } from '../models/SN2_2/SN2_2';

interface area {
  id: string,
  name: string,
  complete: number,
  total: number
  complete_ea: number,
  total_ea: number
}
@Component({
  selector: 'app-progress-approve',
  templateUrl: './progress-approve.component.html',
  styleUrls: ['./progress-approve.component.css']
})
export class ProgressApproveComponent implements OnInit {

  @Input() selected_reg: string;
  @Input() selected_cwt: string;
  @Input() selected_amp: string;
  @Input() selected_tam: string;
  @Input() selected_dis: string;
  @Input() selected_ea: string;

  @Input() events: Observable<void>;

  reg_list = [];
  cwt_list = [];
  amp_list = [];
  tam_list = [];
  dis_list = [];
  ea_list = [];

  summary: any;
  summaryDisplay: any;
  user: User;
  users: Users = new Users();
  areas: Areas = new Areas();
  data = {};
  displayData = [];
  sn_1List: SN1[] = [];
  sn2_2List: SN2_2[] = [];
  selectedID: number[] = [];
  ea_list2=[];
  page=1;
  @Output() messageEventReg = new EventEmitter<string>();
  @Output() messageEventCwt = new EventEmitter<string>();
  @Output() messageEventAmp = new EventEmitter<string>();
  @Output() messageEventTam = new EventEmitter<string>();
  @Output() messageEventDis = new EventEmitter<string>();
  @Output() messageEventEa = new EventEmitter<string>();

  constructor(private sn22Service: Sn22Service, private sn1Service: Sn1Service, private userservice: UserService) {
    this.data = this.calculateTable();
    this.calculateSummary(this.data);
    this.createRegSearch(this.data);
    this.displayData = Object.values(this.data);
    this.showPage();
  }
  showPage() {
    this.ea_list2 = this.displayData.slice(25 * (this.page - 1), 25 * this.page);
    if(this.page*25 > this.ea_list.length)
      this.page = 1;
  }

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
    this.events.subscribe(() => {
      if (this.selected_reg)
        this.regSelected2();
      if (this.selected_cwt)
        this.cwtSelected2();
      if (this.selected_amp)
        this.ampSelected2();
      if (this.selected_tam)
        this.tamSelected2();
      if (this.selected_dis)
        this.disSelected2();
      if (this.selected_ea)
        this.eaSelected();
    })
    this.getSN1Data();
  }
 

  getSN1Data() {
    if (this.user.TID == '4') {
      this.sn1Service.getSN1ByFS(this.user.USERID).then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    }else if (this.user.TID == '3') {
      this.sn1Service.getSN1ByCWT(this.user.CWT).then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    } else if (this.user.TID < '3') {
      this.sn1Service.getSN1Data().then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    }
  }

  getSN22Data() {
    if (this.user.TID == '4') {
      this.sn22Service.getSN22ByFS(this.user.USERID).then(result => {
        this.sn2_2List = result;
        this.data = this.calculateTable();
        this.calculateSummary(this.data);
        this.createRegSearch(this.data);
        this.displayData = Object.values(this.data);
        this.showPage();
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID == '3') {
      this.sn22Service.getSN22ByCWT(this.user.CWT).then(result => {
        this.sn2_2List = result;
        this.data = this.calculateTable();
        this.calculateSummary(this.data);
        this.createRegSearch(this.data);
        this.displayData = Object.values(this.data);
        this.showPage();
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID < '3') {
      this.sn22Service.getSN22Data().then(result => {
        this.sn2_2List = result;
        this.data = this.calculateTable();
        this.calculateSummary(this.data);
        this.createRegSearch(this.data);
        this.displayData = Object.values(this.data);
        this.showPage();
      }).catch(err => { console.log(err) });
    }
  }

  getSN1Status(ea: Area) {
    return this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).map(sn1 => sn1.status_data);
  }

  calculateTable() {
    let areasJSON = JSON.parse(sessionStorage.getItem('areas'));
    let areas = new Areas;
    areas.areas = areasJSON;
    let hiracyAreaData = areas.getHiracyAreaData();

    let ea_map = {};
    let dis_map = {};
    let tam_map = {};
    let amp_map = {};
    let cwt_map = {};
    let reg_map = {};

    let dises = areas.dis;
    for (let dis of dises) {
      ea_map = {};
      let complete = 0;
      let total = 0;
      let complete_ea = 0;
      let total_ea = 0;
      let ea_temp = areas.filterAreasByDISTRICT(dis.id);
      for (let ea of ea_temp) {
        let hassn1 = this.sn_1List.filter(sn1 => sn1.SN1_ID == dis.id + ea.EA).length > 0;
        let ea_complete = 0;
        let ea_completeByea = 0;
        if(hassn1){
          let building = this.sn_1List.filter(sn1 => sn1.SN1_ID == dis.id + ea.EA).map(sn1 => sn1.SN1P2).reduce((a, b) => a.concat(b));
          let household = building.map(p2 => p2.H3).filter(h3 => h3 != null).reduce((a, b) => a.concat(b)).filter(h3 => h3.status_approve == 2);
          ea_complete = household.length;
          ea_completeByea = this.getSN1Status(ea).filter(st => st != 2).length == 0 ? 1 : 0;
        }
        let ea_total = Number(ea.Household);
        let ea_totalByea = 1;
        complete += ea_complete;
        total += ea_total;
        complete_ea += ea_completeByea;
        total_ea += ea_totalByea;
        ea_map[ea.EA] = {
          id: ea.EA,
          name: ea.EA,
          complete: ea_complete,
          total: ea_total,
          complete_ea: ea_completeByea,
          total_ea: ea_totalByea,
          children: {}
        }
      }
      dis_map[dis.id] = {
        id: dis.id,
        name: dis.name,
        complete: complete,
        total: total,
        complete_ea: complete_ea,
        total_ea: total_ea,
        children: ea_map
      }
    }
    let tams = areas.tam;
    for (let tam of tams) {
      let complete = 0;
      let total = 0;
      let complete_ea = 0;
      let total_ea = 0;
      let children = {};
      for (let dis of tam.children) {
        complete += dis_map[dis.id].complete;
        total += dis_map[dis.id].total;
        complete_ea += dis_map[dis.id].complete_ea;
        total_ea += dis_map[dis.id].total_ea;
        children[dis.id] = dis_map[dis.id];
      }
      tam_map[tam.id] = {
        id: tam.id,
        name: tam.name,
        complete: complete,
        total: total,
        complete_ea: complete_ea,
        total_ea: total_ea,
        children: children
      }
    }
    let amps = areas.amp;
    for (let amp of amps) {
      let complete = 0;
      let total = 0;
      let complete_ea = 0;
      let total_ea = 0;
      let children = {};
      for (let tam of amp.children) {
        complete += tam_map[tam.id].complete;
        total += tam_map[tam.id].total;
        complete_ea += tam_map[tam.id].complete_ea;
        total_ea += tam_map[tam.id].total_ea;
        children[tam.id] = tam_map[tam.id];
      }
      amp_map[amp.id] = {
        id: amp.id,
        name: amp.name,
        complete: complete,
        total: total,
        complete_ea: complete_ea,
        total_ea: total_ea,
        children: children
      }
    }
    let cwts = areas.cwt;
    for (let cwt of cwts) {
      let complete = 0;
      let total = 0;
      let complete_ea = 0;
      let total_ea = 0;
      let children = {};
      for (let amp of cwt.children) {
        complete += amp_map[amp.id].complete;
        total += amp_map[amp.id].total;
        complete_ea += amp_map[amp.id].complete_ea;
        total_ea += amp_map[amp.id].total_ea;
        children[amp.id] = amp_map[amp.id];
      }
      cwt_map[cwt.id] = {
        id: cwt.id,
        name: cwt.name,
        complete: complete,
        total: total,
        complete_ea: complete_ea,
        total_ea: total_ea,
        children: children
      }
    }
    let regs = areas.reg;
    for (let reg of regs) {
      let complete = 0;
      let total = 0;
      let complete_ea = 0;
      let total_ea = 0;
      let children = {};
      for (let cwt of reg.children) {
        complete += cwt_map[cwt.id].complete;
        total += cwt_map[cwt.id].total;
        complete_ea += cwt_map[cwt.id].complete_ea;
        total_ea += cwt_map[cwt.id].total_ea;
        children[cwt.id] = cwt_map[cwt.id];
      }
      reg_map[reg.id] = {
        id: reg.id,
        name: reg.name,
        complete: complete,
        total: total,
        complete_ea: complete_ea,
        total_ea: total_ea,
        children: children
      }
    }
    return reg_map;
  }

  calculateSummary(data) {
    let complete = 0;
    let total = 0;
    let complete_ea = 0;
    let total_ea = 0;
    for (let area of Object.values(data)) {
      complete += area['complete'];
      total += area['total'];
      complete_ea += area['complete_ea'];
      total_ea += area['total_ea'];
    }
    this.summary = {
      id: 0,
      name: "ภาพรวม",
      complete: complete,
      total: total,
      complete_ea: complete_ea,
      total_ea: total_ea
    }
    this.summaryDisplay = this.summary;
  }

  createRegSearch(data) {
    this.reg_list = [];
    for (let area of Object.values(data)) {
      this.reg_list.push(area);
    }
  }

  createCWTSearch(data) {
    this.cwt_list = [];
    for (let area of Object.values(data)) {
      this.cwt_list.push(area);
    }
  }

  createAMPSearch(data) {
    this.amp_list = [];
    for (let area of Object.values(data)) {
      this.amp_list.push(area);
    }
  }

  createTAMSearch(data) {
    this.tam_list = [];
    for (let area of Object.values(data)) {
      this.tam_list.push(area);
    }
  }

  createDisSearch(data) {
    this.dis_list = [];
    for (let area of Object.values(data)) {
      this.dis_list.push(area);
    }
  }

  createEASearch(data) {
    this.ea_list = [];
    for (let area of Object.values(data)) {
      this.ea_list.push(area);
    }
  }

  regSelected() {
    this.selected_cwt = null;
    this.selected_amp = null;
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    while (0 < this.selectedID.length) this.selectedID.pop();
    const index = this.reg_list.findIndex(area => area.name === this.selected_reg);
    this.selected(this.reg_list[index]);
    sessionStorage.setItem("selected_reg",this.selected_reg);
    this.messageEventReg.emit(this.selected_reg);
  }

  cwtSelected() {
    this.selected_amp = null;
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    while (1 < this.selectedID.length) this.selectedID.pop();
    const index = this.cwt_list.findIndex(area => area.name === this.selected_cwt);
    this.selected(this.cwt_list[index]);
    sessionStorage.setItem("selected_cwt",this.selected_cwt);
    this.messageEventCwt.emit(this.selected_cwt);
  }

  ampSelected() {
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    while (2 < this.selectedID.length) this.selectedID.pop();
    const index = this.amp_list.findIndex(area => area.name === this.selected_amp);
    this.selected(this.amp_list[index]);
    sessionStorage.setItem("selected_amp",this.selected_amp);
    this.messageEventAmp.emit(this.selected_amp);
  }

  tamSelected() {
    this.selected_dis = null;
    this.selected_ea = null;
    while (3 < this.selectedID.length) this.selectedID.pop();
    const index = this.tam_list.findIndex(area => area.name === this.selected_tam);
    this.selected(this.tam_list[index]);
    sessionStorage.setItem("selected_tam",this.selected_tam);
    this.messageEventTam.emit(this.selected_tam);
  }

  disSelected() {
    this.selected_ea = null;
    while (4 < this.selectedID.length) this.selectedID.pop();
    const index = this.dis_list.findIndex(area => area.name === this.selected_dis);
    this.selected(this.dis_list[index]);
    sessionStorage.setItem("selected_dis",this.selected_dis);
    this.messageEventDis.emit(this.selected_dis);
  }

  eaSelected() {
    while (5 < this.selectedID.length) this.selectedID.pop();
    const index = this.ea_list.findIndex(area => area.name === this.selected_ea);
    this.selected(this.ea_list[index]);
    sessionStorage.setItem("selected_ea",this.selected_ea);
    this.messageEventEa.emit(this.selected_ea);
  }
  regSelected2() {
    
    while (0 < this.selectedID.length) this.selectedID.pop();
    const index = this.reg_list.findIndex(area => area.name === this.selected_reg);
    this.selected(this.reg_list[index]);
    this.messageEventReg.emit(this.selected_reg);
  }

  cwtSelected2() {
    
    while (1 < this.selectedID.length) this.selectedID.pop();
    const index = this.cwt_list.findIndex(area => area.name === this.selected_cwt);
    this.selected(this.cwt_list[index]);
    this.messageEventCwt.emit(this.selected_cwt);
  }

  ampSelected2() {
    
    while (2 < this.selectedID.length) this.selectedID.pop();
    const index = this.amp_list.findIndex(area => area.name === this.selected_amp);
    this.selected(this.amp_list[index]);
    this.messageEventAmp.emit(this.selected_amp);
  }

  tamSelected2(){
    
    while (3 < this.selectedID.length) this.selectedID.pop();
    const index = this.tam_list.findIndex(area => area.name === this.selected_tam);
    this.selected(this.tam_list[index]);
    this.messageEventTam.emit(this.selected_tam);
  }

  disSelected2() {
    
    while (4 < this.selectedID.length) this.selectedID.pop();
    const index = this.dis_list.findIndex(area => area.name === this.selected_dis);
    this.selected(this.dis_list[index]);
    this.messageEventDis.emit(this.selected_dis);
  }

  tableSelected(area: any) {
    this.selected(area);
    this.resetFiler()
  }

  selected(area: any) {
    if (this.selectedID.length <= 6 && area != undefined ) {
      if (this.selectedID.length === 6) this.selectedID.pop();
      this.selectedID.push(area.id);
      this.summaryDisplay = {
        id: area.id,
        name: area.name,
        complete: area.complete,
        total: area.total,
        complete_ea: area.complete_ea,
        total_ea: area.total_ea
      }
      this.search_track(area.name, area.children);
    }
  }

  back() {
    if (this.selectedID.length == 0) return
    this.search_track(null, {});
    this.selectedID.pop();
    let children_temp = this.data;
    let summary_temp = {};
    for (let i of this.selectedID) {
      summary_temp = {
        id: children_temp[i]['id'],
        name: children_temp[i]['name'],
        complete: children_temp[i]['complete'],
        total: children_temp[i]['total'],
        complete_ea: children_temp[i]['complete_ea'],
        total_ea: children_temp[i]['total_ea'],
      };
      children_temp = children_temp[i]['children'];
    }
    this.summaryDisplay = (this.selectedID.length == 0) ? this.summary : summary_temp;
    this.displayData = Object.values(children_temp);
    this.showPage();
  }

  search_track(area, data) {
    const selected_id_length = this.selectedID.length;
    switch (selected_id_length) {
      case 1:
        this.createCWTSearch(data);
        this.displayData = this.cwt_list;
        this.showPage();
        this.selected_reg = area;
        this.amp_list = [];
        this.tam_list = [];
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 2:
        this.createAMPSearch(data);
        this.displayData = this.amp_list;
        this.showPage();
        this.selected_cwt = area;
        this.tam_list = [];
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 3:
        this.createTAMSearch(data);
        this.displayData = this.tam_list;
        this.showPage();
        this.selected_amp = area;
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 4:
        this.createDisSearch(data);
        this.displayData = this.dis_list;
        this.showPage();
        this.selected_tam = area;
        this.ea_list = [];
        break;
      case 5:
        this.createEASearch(data);
        this.displayData = this.ea_list;
        this.showPage();
        this.selected_dis = area;
        break;
      case 6:
        this.selected_ea = area;
        break;
      default:
        console.log('error');
        break;
    }
  }

  resetFiler() {
    this.selected_reg = null;
    this.selected_cwt = null;
    this.selected_amp = null;
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
  }

  home() {
    this.selectedID = [];
    this.summaryDisplay = this.summary;
    this.displayData = Object.values(this.data);
    this.showPage();
    this.selected_reg = null;
    this.selected_cwt = null;
    this.selected_amp = null;
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    this.reg_list = [];
    this.cwt_list = [];
    this.amp_list = [];
    this.tam_list = [];
    this.dis_list = [];
    this.ea_list = [];
  }

  toJSON() {
    let json = []
    for (let area of this.displayData) {
      json.push({
        'รหัสภาค': area.id,
        'ชื่อ': area.name,
        'งานที่อนุมัติแล้ว(รายครัวเรือน)': area.complete,
        'งานทั้งหมด(รายครัวเรือน)': area.total,
        'งานที่อนุมัติแล้ว(รายเขตแจงนับ)': area.complete_ea,
        'งานทั้งหมด(รายเขตแจงนับ)': area.total_ea
      });
    }
    return json;
  }

  print() {
    var summary_content = document.getElementById('summaryContent').innerHTML;
    var table_content = document.getElementById('tableContent').innerHTML;
    summary_content = summary_content.replace(/table-hover/, 'table-bordered');
    table_content = table_content.replace(/table-hover/, 'table-bordered');
    var popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open()
    popupWin.document.write(
      `<html>
        <head>
          <style>
            h3 {
              text-decoration: underline;
              margin-bottom: 20px;
            }
            .container {
              margin-top: 20px;
            }
          </style>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body onload="window.print()">
          <div class="container">
            <h3 class="text-center">รายงานความก้าวหน้าการอนุมัติงาน</h3>
            <div class="row justify-content-center">
              <div class="col-10">
                ${summary_content}
                ${table_content}
              </div>
            </div>
          </div>
      </html>`
    );
    popupWin.document.close();
  }

  exportToPDF() {

  }

  exportToExcel() {
    let progress_list = this.toJSON();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'progress.csv');
  }

}
