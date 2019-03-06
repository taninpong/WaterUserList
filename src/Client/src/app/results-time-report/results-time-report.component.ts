import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Sn22Service } from '../services/sn22.service';
import { Sn1Service } from '../services/sn1.service';
import { UserService } from '../services/user.service';
import { SN1 } from '../models/SN1/SN1';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { Area } from '../models/area';
import * as XLSX from 'xlsx';
interface Report {
  reg: string,
  cwt: string,
  amp: string,
  tam: string,
  dis: string,
  ea: string,
  P2: number,
  N: number,
  _1: number,
  _2: number,
}
interface Report1 {
  reg: string,
  cwt: string,
  amp: string,
  tam: string,
  dis: string,
  ea: string,
  A5: string,
  N: number,
  G1: boolean,
  G2: boolean,
  G3: boolean,
  G4: boolean,
  _1: boolean,
  _2: boolean,
  _3: boolean,
  _4: boolean,
  _5: boolean,
  _6: boolean,
  _7: string
}

@Component({
  selector: 'app-results-time-report',
  templateUrl: './results-time-report.component.html',
  styleUrls: ['./results-time-report.component.css']
})
export class ResultsTimeReportComponent implements OnInit {
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
  data1: Report1[] = [];
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
    console.log("Init pap");
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
    this.events.subscribe(() => {
      console.log("event recieved");
      this.filterData();
    });
  }

  filterData() {
    console.log(this.data);
    this.displayData = this.data;
    if (this.selected_reg)
      this.displayData = this.data.filter(x => x.reg == this.selected_reg);
    if (this.selected_cwt)
      this.displayData = this.data.filter(x => x.cwt == this.selected_cwt);
    if (this.selected_amp)
      this.displayData = this.data.filter(x => x.cwt == this.selected_cwt && x.amp == this.selected_amp);
    if (this.selected_tam)
      this.displayData = this.data.filter(x => x.cwt == this.selected_cwt && x.amp == this.selected_amp && x.tam == this.selected_tam);
    if (this.selected_dis)
      this.displayData = this.data.filter(x => x.cwt == this.selected_cwt && x.amp == this.selected_amp && x.tam == this.selected_tam && x.dis == this.selected_dis);
    if (this.selected_ea)
      this.displayData = this.data.filter(x => x.cwt == this.selected_cwt && x.amp == this.selected_amp && x.tam == this.selected_tam && x.dis == this.selected_dis && x.ea == this.selected_ea);
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
    let sn1list = this.groupSN1()
    //console.log(sn1list);
    let areasJSON = JSON.parse(sessionStorage.getItem('areas'));
    let areas = new Areas();
    areas.areas = areasJSON;

    sn1list.forEach(sn1 => {
      let report: Report = { reg: null, cwt: null, amp: null, tam: null, dis: null, ea: null, P2: 0, N: 0, _1: 0, _2: 0 };
      report.reg = sn1.SN1P1.REG_NAME;
      report.cwt = sn1.SN1P1.CWT_NAME;
      report.amp = sn1.SN1P1.AMP_NAME;
      report.tam = sn1.SN1P1.TAM_NAME;
      report.dis = sn1.SN1P1.DISTRICT;
      report.ea = sn1.SN1P1.EA;
      let n = 0;
      let time_list = []
      report.P2 = sn1.SN1P2.length;
      sn1.SN1P2.forEach(p2 => {
        //H3.length
        n = p2.N ? n+parseInt(p2.N+"") : n+0;
        time_list.push((new Date(p2.Modify_DATE[p2.Modify_DATE.length - 1]).getTime() - new Date(p2.Create_DATE).getTime()) / 60000)
      })
      report.N = n;
      let sum = time_list.reduce((x,y) => x+y);
      report._1 = sum/time_list.length;
      let sum_diff = time_list.map(x => x - report._1).map(x => x*x ).reduce((x,y) => x+y)
      let variant = sum_diff/time_list.length;
      report._2 = Math.sqrt(variant);
      this.data.push(report);
    }
    );

    sn1list.forEach(sn1 => {
      sn1.SN1P2.forEach(p2 => {
        let report: Report1 = { reg: null, cwt: null, amp: null, tam: null, dis: null, ea: null, A5: null, N: 0, G1: false, G2: false, G3: false, G4: false, _1: false, _2: false, _3: false, _4: false, _5: false, _6: false, _7: '' };
        report.reg = sn1.SN1P1.REG_NAME;
        report.cwt = sn1.SN1P1.CWT_NAME;
        report.amp = sn1.SN1P1.AMP_NAME;
        report.tam = sn1.SN1P1.TAM_NAME;
        report.dis = sn1.SN1P1.DISTRICT;
        report.ea = sn1.SN1P1.EA;
        report.A5 = p2.A5;
        report.N = (new Date(p2.Modify_DATE[p2.Modify_DATE.length - 1]).getTime() - new Date(p2.Create_DATE).getTime()) / 60000
        if (p2.H3) {
          p2.H3.forEach(p3 => {
            if (p3.G1)
              report.G1 = true;
            if (p3.G2)
              report.G2 = true;
            if (p3.G3)
              report.G3 = true;
            if (p3.G4)
              report.G4 = true;
          });
        }
        if (p2.H3 && p2.H3.length > 1) {
          p2.H3.forEach(p3 => {
            report._1 = (p3.H5_1 == 1 || p3.H5_2 == 1 || p3.H5_3 == 1);
            report._2 = (p3.H5_1 != 4 && p3.H5_2 != 4 && p3.H5_3 == 2);
            report._3 = (p3.H5_1 != 4 && p3.H5_2 != 4 && p3.H5_3 == 3);
            report._4 = (p3.H5_1 == 4 || p3.H5_2 == 4 || p3.H5_3 == 4);
          })
        }
        else {
          report._1 = (p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1);
          report._2 = (p2.H1_1 != 4 && p2.H1_2 != 4 && p2.H1_3 == 2);
          report._3 = (p2.H1_1 != 4 && p2.H1_2 != 4 && p2.H1_3 == 3);
          report._4 = (p2.H1_1 == 4 || p2.H1_2 == 4 || p2.H1_3 == 4);
        }
        if(p2.status == 3 || p2.status == 5){
          report._5 = true;
        }
        else if(p2.status == 1 || p2.status == 2){
          report._6 = true;
        }
        this.data1.push(report);
      }) 
    }
    );
    this.filterData();
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
        'จำนวน อาคาร': report.P2,
        'จำนวน ครัวเรือน': report.N,
        'เวลาเฉลี่ย': report._1,
        'SD เวลา': report._2,
      });
    }
    // for (let report of this.data1) {
    //   json.push({
    //     'จังหวัด': report.cwt,
    //     'อำเภอ': report.amp,
    //     'ตำบล': report.tam,
    //     'เขตการปกครอง': report.dis,
    //     'EA': report.ea,
    //     'เลขที่ อาคาร': report.A5,
    //     'เวลาที่ใช้': report.N,
    //     'ใช้น้ำเพื่อ อุปโภคบริโภค': report.G1,
    //     'ใช้น้ำเพื่อ เกษตร': report.G2,
    //     'ใช้น้ำเพื่อ ผลิต': report.G3,
    //     'ใช้น้ำเพื่อ บริการ': report.G4,
    //     'มีผู้ให้ข้อมูล ให้ความร่วมมือ': report._1,
    //     'มีผู้ให้ข้อมูล แต่ไม่ให้ความร่วมมือ':report._2,
    //     'ไม่มี/ไม่พบผู้ให้ข้อมูล':report._3,
    //     'บ้าน/อาคาร ว่างหรือร้าง':report._4,
    //     'หยุดชั่วคราว':report._5,
    //     'ยังไม่เข้าพบ 2/3':report._6,
    //     'อื่นๆระบุ':report._7
    //   });
    // }
    return json;
  }
  exportToExcel() {
    let progress_list = this.toJSON();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'เวลาเฉลี่ยที่ใช้ในการเก็บข้อมูลต่อหน่วยอย่าง.csv');
  }

  groupSN1() {
    let id_list = new Set(this.sn_1List.map(s => s.SN1_ID));
    let result: SN1[] = []
    id_list.forEach(id => {
      let sn1 = new SN1();
      let sn1list = this.sn_1List.filter(s => s.SN1_ID == id);
      let sn1p1 = sn1list[0].SN1P1
      let sn1p2 = sn1list.map(x => x.SN1P2).reduce((x, y) => x.concat(y));
      sn1.SN1P1 = sn1p1;
      sn1.SN1P2 = sn1p2;
      result.push(sn1);
    });
    return result;
  }
}
