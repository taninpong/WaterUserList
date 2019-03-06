import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { SN1 } from '../models/SN1/SN1';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { Sn22Service } from '../services/sn22.service';
import { Sn1Service } from '../services/sn1.service';
import { UserService } from '../services/user.service';
import { Area } from '../models/area';
import { SN1P3 } from '../models/SN1/SN1P3';
import * as XLSX from 'xlsx';
interface Report {
  cwt: string,
  amp: string,
  tam: string,
  dis: string,
  ea: string,
  _1: number,
  _2: number,
  _3: number,
  _4: number,
  _5: number,
  _6: number,
  _7: number
}
@Component({
  selector: 'app-results-number-household-report',
  templateUrl: './results-number-household-report.component.html',
  styleUrls: ['./results-number-household-report.component.css']
})
export class ResultsNumberHouseholdReportComponent implements OnInit {
  reg_list = [];
  cwt_list = [];
  amp_list = [];
  tam_list = [];
  dis_list = [];
  ea_list = [];
  sn_1List: SN1[] = [];
  sn2_2List: SN2_2[] = [];
  summary: any;
  summaryDisplay: any;
  user: User;
  users: Users = new Users();
  areas: Areas = new Areas();
  data: Report[] = [];
  displayData = [];
  page = 1;
  ea_list2 = [];
  selectedID: number[] = [];
  @Input() selected_reg: string;
  @Input() selected_cwt: string;
  @Input() selected_amp: string;
  @Input() selected_tam: string;
  @Input() selected_dis: string;
  @Input() selected_ea: string;
  @Input() events: Observable<void>;

  constructor(private sn22Service: Sn22Service, private sn1Service: Sn1Service, private userservice: UserService) {
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

      console.log("TIME---REPORT");
      console.log(this.selected_reg);
      console.log(this.selected_cwt);
      console.log(this.selected_amp);
      console.log(this.selected_tam);
      console.log(this.selected_dis);
      console.log(this.selected_ea);
      console.log("--------");
      this.getSN1Data();
    })

  }
  showPage() {
    console.log(this.sn_1List);
    this.ea_list2 = this.displayData.slice(25 * (this.page - 1), 25 * this.page);
    if (this.page * 25 > this.ea_list.length)
      this.page = 1;
  }

  getSN1Data() {
    if (this.user.TID == '4') {
      this.sn1Service.getSN1ByFS(this.user.USERID).then(result => {
        this.sn_1List = result;
        this.getSN22Data();
      }).catch(err => { console.log(err) });
    } else if (this.user.TID == '3') {
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
        this.createData();
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID == '3') {
      this.sn22Service.getSN22ByCWT(this.user.CWT).then(result => {
        this.sn2_2List = result;
        this.createData();
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID < '3') {
      this.sn22Service.getSN22Data().then(result => {
        this.sn2_2List = result;
        this.createData();
      }).catch(err => { console.log(err) });
    }
  }

  getSN1Status(ea: Area) {
    return this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).map(sn1 => sn1.status_data);
  }

  createData() {
    this.data = [];
    let sn1list = this.groupSN1();
    console.log(sn1list);
    let areasJSON = JSON.parse(sessionStorage.getItem('areas'));
    let areas = new Areas();
    areas.areas = areasJSON;
    sn1list.forEach(sn1 => {
      let report: Report = { cwt: null, amp: null, tam: null, dis: null, ea: null, _1: 0, _2: 0, _3: 0, _4: 0, _5: 0, _6: 0, _7: 0 };
      report.cwt = sn1.SN1P1.CWT_NAME;
      report.amp = sn1.SN1P1.AMP_NAME;
      report.tam = sn1.SN1P1.TAM_NAME;
      report.dis = sn1.SN1P1.DISTRICT;
      report.ea = sn1.SN1P1.EA;
      let _1 = 0;
      let _2 = 0;
      let _3 = 0;
      let _4 = 0;
      let _5 = 0;
      let _6 = 0;
      let _7 = 0;
      sn1.SN1P2.forEach(p2 => {
        if (p2.H3 && p2.H3.length > 1) {
          p2.H3.forEach(p3 => {
            if (p3.H5_1 == 1 || p3.H5_2 == 1 || p3.H5_3 == 1)
              _1 += 1;
            else if (p3.H5_1 != 4 && p3.H5_2 != 4 && p3.H5_3 == 2)
              _2 += 1;
            else if (p3.H5_1 != 4 && p3.H5_2 != 4 && p3.H5_3 == 3)
              _3 += 1;
            else if (p3.H5_1 == 4 || p3.H5_2 == 4 || p3.H5_3 == 4)
              _4 += 1;
          })
          _7 += p2.H3.length;
        }
        else  {
          if (p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1)
            _1 += 1;
          else if (p2.H1_1 != 4 && p2.H1_2 != 4 && p2.H1_3 == 2)
            _2 += 1;
          else if (p2.H1_1 != 4 && p2.H1_2 != 4 && p2.H1_3 == 3)
            _3 += 1;
          else if (p2.H1_1 == 4 || p2.H1_2 == 4 || p2.H1_3 == 4)
            _4 += 1;
          if(p2.H3)
            _7 += p2.H3.length;
        }
      })
      _5 = _1 + _2 + _3 + _4;
      let estimate_build = areas.areas.find(x => x.CWT == sn1.SN1P1.CWT && x.AMP == sn1.SN1P1.AMP && x.TAM == sn1.SN1P1.TAM && x.DISTRICT == sn1.SN1P1.DISTRICT && x.EA == sn1.SN1P1.EA);
      _6 = estimate_build ? parseInt(estimate_build.Household + "") : 0;
      report._1 = _1;
      report._2 = _2;
      report._3 = _3;
      report._4 = _4;
      report._5 = _5;
      report._6 = _6;
      report._7 = _7;
      this.data.push(report);
    }
    );
  }
  toJSON() {
    let json = []
    for (let report of this.data) {
      json.push({
        'จังหวัด': report.cwt,
        'อำเภอ': report.amp,
        'ตำบล': report.tam,
        'เขตการปกครอง': report.dis,
        'EA': report.ea,
        'มีผู้ให้ข้อมูล ให้ความร่วมมือ': report._1,
        'มีผู้ให้ข้อมูล แต่ไม่ให้ความร่วมมือ': report._2,
        'ไม่มี/ไม่พบผู้ให้ข้อมูล': report._3,
        'บ้าน/อาคาร ว่างหรือร้าง': report._4,
        'รวม': report._5,
        'จำนวน ครัวเรือน อ้างอิง': report._6,
        'จำนวนครัวเรือนที่สำรวจได้': report._7
      });
    }
    return json;
  }
  exportToExcel() {
    let progress_list = this.toJSON();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'จำนวนครัวเรือนแยกตามผู้ให้ข้อมูล.csv');
  }

  groupSN1(){
    let id_list =  new Set(this.sn_1List.map(s => s.SN1_ID));
    let result:SN1[] = []
    id_list.forEach(id => {
      let sn1 = new SN1();
      let sn1list = this.sn_1List.filter(s => s.SN1_ID == id);
      let sn1p1 = sn1list[0].SN1P1
      let sn1p2 = sn1list.map(x => x.SN1P2).reduce((x,y) => x.concat(y));
      sn1.SN1P1 = sn1p1;
      sn1.SN1P2 = sn1p2;
      result.push(sn1);
    });
    return result;
  }
}
