import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Areas } from '../models/areas';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Location } from '@angular/common';
import { Area } from '../models/area';
import { Sn1Service } from '../services/sn1.service';
import { Sn22Service } from '../services/sn22.service';
import { SN1P3 } from '../models/SN1/SN1P3';
import { SN1P2 } from '../models/SN1/SN1P2';
import { SN1 } from '../models/SN1/SN1';
import { WaterValidator } from '../models/WatarValidator';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import * as XLSX from 'xlsx';
import { QUESTION } from '../models/Question'
@Component({
  selector: 'app-validate-job',
  templateUrl: './validate-job.component.html',
  styleUrls: ['./validate-job.component.css']
})

export class ValidateJobComponent implements OnInit {
  hasMassege: boolean = false;
  message: string;
  selected_ea: any;
  user: User;
  ea: Area;
  ea_ID: string;
  sn1_data: SN1[];
  sn22data: SN2_2[];
  sn1_select: SN1;
  p2_index: number;
  p3_index: number;
  sn1p3: SN1P3;
  tab3 = false;
  tab2 = false;
  hasComment = false;
  sn1p1 = [];
  page1 = 1;
  sn1p2 = [];
  page2 = 1;
  sn1p3_list = [];
  page3 = 1;
  comment: { date: Date, message: string };
  waterValidate: WaterValidator;
  isReady = false;
  constructor(private userservice: UserService, private sn22: Sn22Service, private router: Router, private _location: Location, private sn1: Sn1Service) { }

  ngOnInit() {
    this.waterValidate = new WaterValidator();
    this.ea = JSON.parse(localStorage.getItem('validate_ea'));
    this.ea_ID = (this.ea.REG + this.ea.CWT + this.ea.AMP + this.ea.TAM + this.ea.DISTRICT + this.ea.EA);
    this.user = JSON.parse(sessionStorage.getItem("user"));
    //this.sn1.getSN1Data().then(
    this.sn1.getSN1ByID(this.ea_ID).then(
      data => {
        this.sn22.getSN22DataByAreaID(this.ea_ID).then(sn22 => {
          this.sn22data = sn22;
        }).catch(err => console.log(err));
        this.sn1_data = data;
        console.log(this.sn1_data);
        this.showPage1();
      }
    ).catch(err => console.log(err));
  }

  validateSN1(sn1) {
    this.waterValidate.sn1 = sn1;
    this.waterValidate.sn2_2 = this.sn22data;
    return this.waterValidate.validateAreaWater();
  }

  validateSN1P2(p2) {
    let result = this.waterValidate.validateBuildingWater(p2); 
    return result
  }

  validateSN1P3(p2, p3) {
    return this.waterValidate.validateHHWater(p2, p3)[0];
  }

  getUserRoleName(role) {
    let role_map = { 1: "ผู้ดูแลระบบ", 2: "ผู้บริหาร/เจ้าของโครงการ", 3: "สถิติจังหวัด", 4: "เจ้าหน้าผู้ควบคุมงาน", 5: "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
    return role_map[role];
  }
  backButtonClicked() {
    this.router.navigate(['/track']);
  }
  exportToExcel() {
    let progress_list = this.createJsonDataForExport();
    console.log(progress_list);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'รายงานผลการสำรวจรายอาคาร.xlsx');
  }
  createJsonDataForExport() {
    //   let key_to_thai = { A1:"ลำดับที่บ้าน/อาคาร/สิ่งปลูกสร้าง",A2:"ชื่อถนนลำน้ำ หรือละแวกบ้าน",A3:"ชื่อตรอก/ซอย",
    //   A4:"ชื่อหมู่บ้านคอนโด/อาคารสำนักงาน/สถานประกอบการ/สถาบัน ฯลฯ",A5:"เลขที่บ้าน/อาคาร",A6:"ละติจูด",A7:"ลองติจูด",
    // A8:"ประเภทบ้าน/อาคาร/สิ่งปลูกสร้าง",A9:"จำนวนบ้านว่าง",A10:"จำนวนบ้านร้าง",H1_1:"ผลการเข้าพบ ครั้งที่ 1",H1_2:"ผลการเข้าพบ ครั้งที่ 2",H1_3:"ผลการเข้าพบ ครั้งที่ 3",N:"จำนวนครัวเรือน/สถานประกอบการรวมทั้งหมด ในบ้าน/อาคาร/สิ่งปลูกสร้าง",
    // H1_4:"การอนุญาติให้เข้าอาคาร",N0:"จำนวนห้องว่าง",N1:"จำนวนห้องที่มีผู้อาศัย/จำนวนสถานประกอบการ",A11:"บันทึกปัญหา อุปสรรคการนัดหมาย เหตุผลที่นับจดไม่ได้",
    // Create_DATE_Display:"เวลาเริ่มทำการสำรวจ",Modify_DATE_Display:"เวลาที่บันทึกล่าสุด",Duration_DATE_Display:"ระยะเวลาในการทำ (นาที)"};
    let result_list = [];
    let key_to_thai = {
      A1: "ลำดับที่บ้าน/อาคาร/สิ่งปลูกสร้าง (A1)", A5: "เลขที่บ้าน/อาคาร (A5)", H3: "ลำดับที่ยูนิตย่อย (H3)",
      H4: "เลขที่ของยูนิตย่อย (H4)", A8: "ประเภทบ้าน / อาคาร (A8)",
      G1: "G1", G2: "G2", G3: "G3", G4: "G4",
      Create_DATE_Display: "เวลาเริ่มทำการสำรวจ", Modify_DATE_Display: "เวลาที่บันทึกล่าสุด", Duration_DATE_Display: "ระยะเวลาในการทำ (นาที)"
    };

    for (let sn1p2 of this.sn1_select.SN1P2) {
      try {
        console.log("---------------sn1p2");
        // console.log(sn1p2);
        if (sn1p2.H3 != null && sn1p2.H3 != undefined && sn1p2.H3.length > 0) {
          for (let h3 of sn1p2.H3) {
            let juser = {};
            Object.keys(h3).forEach(dataH => {


              Object.keys(sn1p2).forEach(data => {
                console.log(dataH);
                if (Object.keys(key_to_thai).findIndex(k => k === data) != -1 && data!="H3") {
                  juser[key_to_thai[data]] = sn1p2[data]
                } else if (Object.keys(key_to_thai).findIndex(k => k === dataH) != -1) {
                  juser[key_to_thai[dataH]] = h3[dataH]

                }
              });

            });
            result_list.push(juser);
          }
        } else {
          let juser = {};
          Object.keys(sn1p2).forEach(data => {
            if (Object.keys(key_to_thai).findIndex(k => k === data) != -1 && data != "H3") {
              juser[key_to_thai[data]] = sn1p2[data]
            }
          });
          result_list.push(juser);
        }
      } catch (err) {
        console.log(err);
      }
    }
    return JSON.parse(JSON.stringify(result_list));
  }
  exportToExcel2() {
    let progress_list = this.createJsonDataForExport2();
    console.log(progress_list);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'รายงานผลการสำรวจรายอาคาร.xlsx');
  }
  createJsonDataForExport2() {
    //   let key_to_thai = { A1:"ลำดับที่บ้าน/อาคาร/สิ่งปลูกสร้าง",A2:"ชื่อถนนลำน้ำ หรือละแวกบ้าน",A3:"ชื่อตรอก/ซอย",
    //   A4:"ชื่อหมู่บ้านคอนโด/อาคารสำนักงาน/สถานประกอบการ/สถาบัน ฯลฯ",A5:"เลขที่บ้าน/อาคาร",A6:"ละติจูด",A7:"ลองติจูด",
    // A8:"ประเภทบ้าน/อาคาร/สิ่งปลูกสร้าง",A9:"จำนวนบ้านว่าง",A10:"จำนวนบ้านร้าง",H1_1:"ผลการเข้าพบ ครั้งที่ 1",H1_2:"ผลการเข้าพบ ครั้งที่ 2",H1_3:"ผลการเข้าพบ ครั้งที่ 3",N:"จำนวนครัวเรือน/สถานประกอบการรวมทั้งหมด ในบ้าน/อาคาร/สิ่งปลูกสร้าง",
    // H1_4:"การอนุญาติให้เข้าอาคาร",N0:"จำนวนห้องว่าง",N1:"จำนวนห้องที่มีผู้อาศัย/จำนวนสถานประกอบการ",A11:"บันทึกปัญหา อุปสรรคการนัดหมาย เหตุผลที่นับจดไม่ได้",
    // Create_DATE_Display:"เวลาเริ่มทำการสำรวจ",Modify_DATE_Display:"เวลาที่บันทึกล่าสุด",Duration_DATE_Display:"ระยะเวลาในการทำ (นาที)"};
    let result_list = [];
    let key_to_thai = {
      CWT_NAME: "จังหวัด", EA: "EA", FI_ID: "FI_ID", A1: "ลำดับที่ (A1)", A5: "บ้านเลขที่ (A5)", H3: "ลำดับที่ยูนิตย่อย (H3)",
      H4: "เลขที่ของยูนิตย่อย (H4)", A8: "ประเภทบ้าน / อาคาร (A8)",A9:"บ้านว่าง/บ้านร้าง",
      G1: "G1", G2: "G2", G3: "G3", G4: "G4",
      Create_DATE_Display: "เวลาเริ่มทำการสำรวจ", Modify_DATE_Display: "เวลาที่บันทึกล่าสุด", Duration_DATE_Display: "ระยะเวลาในการทำ (นาที)"
    };
    for (let sn1 of this.sn1_data) {
      if (sn1.SN1P2) {
        for (let sn1p2 of sn1.SN1P2) {
            let d = new Date(sn1p2.Create_DATE);
            sn1p2.Create_DATE_Display = d.toLocaleDateString() + " " + d.toLocaleTimeString();
            let d2 = new Date(sn1p2.Modify_DATE[sn1p2.Modify_DATE.length - 1]);
            sn1p2.Modify_DATE_Display = d2.toLocaleDateString() + " " + d2.toLocaleTimeString();
            let tmpTime = Math.abs(d2.getTime() - d.getTime())
            let diffMin = Math.round((((tmpTime % 86400000) % 3600000) / 60000));
            sn1p2.Duration_DATE_Display = "" + diffMin;
          
          // console.log(sn1p2);
          if (sn1p2.H3 != null && sn1p2.H3 != undefined && sn1p2.H3.length > 0) {
            for (let h3 of sn1p2.H3) {
              let juser = {};
              Object.keys(sn1.SN1P1).forEach(dataS => {
                if (Object.keys(key_to_thai).findIndex(k => k === dataS) != -1 && dataS != "H3") {
                  juser[key_to_thai[dataS]] = sn1.SN1P1[dataS]
                }
              });
              Object.keys(h3).forEach(dataH => {
                
                

                Object.keys(sn1p2).forEach(data => {
                  if (Object.keys(key_to_thai).findIndex(k => k === dataH) != -1) {
                    juser[key_to_thai[dataH]] = h3[dataH]
                    
                  }else if (Object.keys(key_to_thai).findIndex(k => k === data) != -1 && dataH!= "H3" && data!= "H3") {
                    juser[key_to_thai[data]] = sn1p2[data]
                  }
                });

              });
              
              result_list.push(juser);
            }
          } else {
            let juser = {};
            Object.keys(sn1.SN1P1).forEach(dataS => {
              if (Object.keys(key_to_thai).findIndex(k => k === dataS) != -1 && dataS!="H3") {
                juser[key_to_thai[dataS]] = sn1.SN1P1[dataS]
              }
            });
            
            Object.keys(sn1p2).forEach(data => {
              if (Object.keys(key_to_thai).findIndex(k => k === data) != -1 && data != "H3") {
                juser[key_to_thai[data]] = sn1p2[data]
              }
            });
            
            result_list.push(juser);
          }
        }
      } else {
        let juser = {};
        Object.keys(sn1.SN1P1).forEach(dataS => {
          if (Object.keys(key_to_thai).findIndex(k => k === dataS) != -1 && dataS!="H3") {
            juser[key_to_thai[dataS]] = sn1.SN1P1[dataS]
          }
        });
        result_list.push(juser);
      }
    }
    console.log(result_list);
    return JSON.parse(JSON.stringify(result_list));
  }
  showPage1() {
    this.sn1p1 = this.sn1_data.slice(25 * (this.page2 - 1), 25 * this.page1);
  }
  showPage2() {
    this.sn1p2 = this.sn1_select.SN1P2.slice(25 * (this.page2 - 1), 25 * this.page2);
  }
  showPage3() {
    this.sn1p3_list = this.sn1_select.SN1P2[this.p2_index].H3.slice(25 * (this.page3 - 1), 25 * this.page3);
  }

  sendMassege() {
    this.hasMassege = false;
    let dateSend = new Date();
    if (this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].messages == null) {
      this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].messages = [];
    }
    console.log(this.message);
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].messages.push({ date: dateSend, message: this.message });
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].status_approve = 1;
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version = this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version + 1;
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].saveVersion = this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version;
    this.sn1_select.SN1P2[this.p2_index].status = 10;
    this.sn1_select.SN1P2[this.p2_index].version = this.sn1_select.SN1P2[this.p2_index].version + 1;
    this.sn1_select.SN1P2[this.p2_index].saveVersion = this.sn1_select.SN1P2[this.p2_index].version;
    this.sn1_select.SN1P2[this.p2_index].Modify_DATE.push(new Date());
    this.sn1_select.status_approve = 1;
    this.sn1.updateSN1(this.sn1_select).then(res => { console.log(res); this.showPage1(); this.showPage2(); this.showPage3(); }).catch(err => { console.log(err); this.showPage2(); this.showPage3(); });

    // this.sn1_data.this.sn1p2[this.sn1p3.A1].H3[this.sn1p3.H3]
  }
  wc21Clicked(sn1_3, sn2_1) {
    localStorage.setItem('sn1p3', JSON.stringify(sn1_3));
    localStorage.setItem('sn2_1', JSON.stringify(sn2_1));
    this.router.navigate(['/validate_wc21'])
  }
  reportFIButtonClicked(j) {
    this.hasMassege = true;
    let water_var = this.waterValidate.validateHHWater(this.sn1_select.SN1P2[this.p2_index], this.sn1_select.SN1P2[this.p2_index].H3[j]);
    let cal_var = null;
    if(!water_var[0]){
      cal_var = water_var[1];
      this.message = "โปรดตรวจสอบคำตอบในข้อคำถามเหล่านี้ ในอาคารเลขที่ " +this.sn1_select.SN1P2[this.p2_index].A5+"  ครัวเรือนลำดับที่ "+this.sn1_select.SN1P2[this.p2_index].H3[j].H3+"\n\n"+cal_var.map(x => QUESTION[x]).reduce((x,y) => x+"\n"+y)
      console.log(this.sn1_select.SN1P2[this.p2_index].H3[j])
    }
    this.p3_index = j;
  }
  validatedButtonClicked(j) {
    this.p3_index = j;
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].status_approve = 2;
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version = this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version + 1;
    this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].saveVersion = this.sn1_select.SN1P2[this.p2_index].H3[this.p3_index].version;
    this.sn1_select.SN1P2[this.p2_index].version = this.sn1_select.SN1P2[this.p2_index].version + 1;
    this.sn1_select.SN1P2[this.p2_index].saveVersion = this.sn1_select.SN1P2[this.p2_index].version;
    this.sn1.updateSN1(this.sn1_data).then(res => { console.log(res); this.showPage1(); this.showPage2(); this.showPage3(); }).catch(err => { console.log(err); this.showPage1(); this.showPage2(); this.showPage3(); });
  }
  comfirmEAComplete() {
    this.sn1_select.status_data = 2;
    this.sn1.updateSN1(this.sn1_data).then(res => { console.log(res); this.showPage1(); this.showPage2(); }).catch(err => { console.log(err); this.showPage1(); this.showPage2(); });
  }
  seemoreSN1P2(sn1) {
    this.page2 = 1;
    this.sn1_select = sn1;
    this.tab2 = true;
    for (let sn of this.sn1_select.SN1P2) {
      let d = new Date(sn.Create_DATE);
      sn.Create_DATE_Display = d.toLocaleDateString() + " " + d.toLocaleTimeString();
      let d2 = new Date(sn.Modify_DATE[sn.Modify_DATE.length - 1]);
      sn.Modify_DATE_Display = d2.toLocaleDateString() + " " + d2.toLocaleTimeString();
      let tmpTime = Math.abs(d2.getTime() - d.getTime())
      let diffMin = Math.round((((tmpTime % 86400000) % 3600000) / 60000));
      sn.Duration_DATE_Display = "" + diffMin;
    }
    this.showPage2();

  }
  seemoreSN1P3(index, seemore_list) {
    this.page3 = 1;
    this.p2_index = index;
    this.sn1p3 = seemore_list;
    this.sn1_select.SN1P2[this.p2_index]
    localStorage.setItem('sn1p2', JSON.stringify(this.sn1_select.SN1P2[index]));
    this.showPage3();
    this.tab3 = true;
  }
  range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i < max; i += step) {
      input.push(i);
    }
    return input;
  }
  viewComment(p2_index, p3_index) {
    let tmp_message = this.sn1_select.SN1P2[p2_index].H3[p3_index].messages;
    this.comment = tmp_message[tmp_message.length - 1];
    this.comment.date = new Date(this.comment.date);
    this.hasComment = true;
  }
}
