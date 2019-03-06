import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { Area } from '../models/area';
import { Areas } from '../models/areas';
import * as XLSX from 'xlsx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

interface area {
  id: string,
  name: string,
  complete: number,
  total: number
}
@Component({
  selector: 'app-assign-report',
  templateUrl: './assign-report.component.html',
  styleUrls: ['./assign-report.component.css']
})
export class AssignReportComponent implements OnInit{

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

  data = {};
  displayData = [];

  selectedID: number[] = [];

  page=1;
  ea_list2=[];

  @Output() messageEventReg = new EventEmitter<string>();
  @Output() messageEventCwt = new EventEmitter<string>();
  @Output() messageEventAmp = new EventEmitter<string>();
  @Output() messageEventTam = new EventEmitter<string>();
  @Output() messageEventDis = new EventEmitter<string>();
  @Output() messageEventEa = new EventEmitter<string>();

  constructor() {
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
      let ea_temp = areas.filterAreasByDISTRICT(dis.id);
      for (let ea of ea_temp) {
        let ea_total = 1;
        let ea_complete =  ea.FI && ea.FI.length > 0? 1 : 0;
        complete += ea_complete;
        total += ea_total;
        ea_map[ea.EA] = {
          id: ea.EA,
          name: ea.EA,
          complete: ea_complete,
          total: ea_total,
          children: {}
        }
      }
      dis_map[dis.id] = {
        id: dis.id,
        name: dis.name,
        complete: complete,
        total: total,
        children: ea_map
      }
    }
    let tams = areas.tam;
    for (let tam of tams) {
      let complete = 0;
      let total = 0;
      let children = {};
      for (let dis of tam.children) {
        complete += dis_map[dis.id].complete;
        total += dis_map[dis.id].total;
        children[dis.id] = dis_map[dis.id];
      }
      tam_map[tam.id] = {
        id: tam.id,
        name: tam.name,
        complete: complete,
        total: total,
        children: children
      }
    }
    let amps = areas.amp;
    for (let amp of amps) {
      let complete = 0;
      let total = 0;
      let children = {};
      for (let tam of amp.children) {
        complete += tam_map[tam.id].complete;
        total += tam_map[tam.id].total;
        children[tam.id] = tam_map[tam.id];
      }
      amp_map[amp.id] = {
        id: amp.id,
        name: amp.name,
        complete: complete,
        total: total,
        children: children
      }
    }
    let cwts = areas.cwt;
    for (let cwt of cwts) {
      let complete = 0;
      let total = 0;
      let children = {};
      for (let amp of cwt.children) {
        complete += amp_map[amp.id].complete;
        total += amp_map[amp.id].total;
        children[amp.id] = amp_map[amp.id];
      }
      cwt_map[cwt.id] = {
        id: cwt.id,
        name: cwt.name,
        complete: complete,
        total: total,
        children: children
      }
    }
    let regs = areas.reg;
    for (let reg of regs) {
      let complete = 0;
      let total = 0;
      let children = {};
      for (let cwt of reg.children) {
        complete += cwt_map[cwt.id].complete;
        total += cwt_map[cwt.id].total;
        children[cwt.id] = cwt_map[cwt.id];
      }
      reg_map[reg.id] = {
        id: reg.id,
        name: reg.name,
        complete: complete,
        total: total,
        children: children
      }
    }
    return reg_map;
  }

  calculateSummary(data) {
    let complete = 0;
    let total = 0;
    for (let area of Object.values(data)) {
      complete += area['complete'];
      total += area['total'];
    }
    this.summary = {
      id: 0,
      name: "ภาพรวม",
      complete: complete,
      total: total,
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
        'งานที่มอบหมายแล้ว': area.complete,
        'งานทั้งหมด': area.total,
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
            <h3 class="text-center">รายงานการมอบหมายงาน</h3>
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
