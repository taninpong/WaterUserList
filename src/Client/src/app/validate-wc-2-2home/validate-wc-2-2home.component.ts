import { Component, OnInit } from '@angular/core';
import { Sn22Service } from '../services/sn22.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Area } from '../models/area';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import { Users } from '../models/users';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-validate-wc-2-2home',
  templateUrl: './validate-wc-2-2home.component.html',
  styleUrls: ['./validate-wc-2-2home.component.css']
})
export class ValidateWc22homeComponent implements OnInit {
  deleleClicked: boolean;
  hasMassege: boolean = false;
  message: string;
  ea: Area;
  user: User;
  sn22: SN2_2[] = [];
  sn22_selected: SN2_2;
  status_sn = { 0: "เริ่มสร้าง", 4: "สำรวจเสร็จสิ้น", 6: "รอการตรวจสอบ", 10: "รอแก้ไข" };
  status_appr = { 0: "ยังไม่ครบทุกหน่วย", 1: "สำรวจครบแล้ว", 2: "เจ้าหน้าที่ผู้ควบคุมงานตรวจสอบแล้ว", 3: "สถิติจังหวัดตรวจสอบแล้ว" };
  hasComment = false;
  comment: { date: Date, message: string };
  constructor(private _location: Location, private sn22Service: Sn22Service, private router: Router) { }

  ngOnInit() {
    this.ea = JSON.parse(localStorage.getItem('validate_ea'));
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.sn22Service.getSN22DataByAreaID(this.ea.REG + this.ea.CWT + this.ea.AMP + this.ea.TAM + this.ea.DISTRICT + this.ea.EA).then(sn22 => {
      this.sn22 = sn22;
    }
    ).catch(err => console.log(err));
  }
  reportButtonClicked(sn) {
    this.hasMassege = true;
    this.sn22_selected = sn;
  }
  validatedButtonClicked(sn) {
    this.sn22_selected = sn;
    this.sn22_selected.STATUS = 2;
    this.sn22Service.updateSN22(this.sn22_selected).then(res => console.log(res)).catch(err => console.log(err));
  }
  validatedCWTButtonClicked(sn) {
    this.sn22_selected = sn;
    this.sn22_selected.STATUS = 3;
    this.sn22Service.updateSN22(this.sn22_selected).then(res => console.log(res)).catch(err => console.log(err));
  }
  sendMassege() {

    this.hasMassege = false;
    let dateSend = new Date();
    console.log(this.message);
    if (this.user.TID === '3') {
      if (this.sn22_selected.messages_cwt == null) {
        this.sn22_selected.messages_cwt = [];
      }
      this.sn22_selected.messages_cwt.push({ date: dateSend, message: this.message });
    }
    if (this.user.TID === '4') {
      if (this.sn22_selected.messages == null) {
        this.sn22_selected.messages = [];
      }
      this.sn22_selected.messages.push({ date: dateSend, message: this.message });
    }
    this.sn22_selected.status = 10;
    this.sn22_selected.version = this.sn22_selected.version + 1;
    this.sn22_selected.saveVersion = this.sn22_selected.version;
    this.sn22_selected.Modify_DATE.push(new Date());
    this.sn22Service.updateSN22(this.sn22_selected).then(res => console.log(res)).catch(err => console.log(err));
    // this.sn1_data.this.sn1p2[this.sn1p3.A1].H3[this.sn1p3.H3]
  }
  backButtonClicked() {
    this._location.back();
  }
  deleteClicked(sn: SN2_2) {
    this.sn22_selected = sn;
    this.deleleClicked = true;
  }
  approveDelete() {
    this.deleleClicked = false;
    this.sn22Service.deleteSN22ID(this.sn22_selected.SN2_2_ID).then(res => {
      console.log(res);
      let index = this.sn22.map(s => s.SN2_2_ID).indexOf(this.sn22_selected.SN2_2_ID);
      this.sn22.splice(index, 1);
    }
    ).catch(err => console.log(err));
  }
  wc22Clicked(sn) {
    localStorage.setItem('sn22', JSON.stringify(sn));
    this.router.navigate(['/validate_wc22'])
  }
  viewComment(sn, role) {
    let tmp_message;
    if (role == 3) {
      tmp_message = sn.messages_cwt
    }
    if (role == 4) {
      tmp_message = sn.messages
    }
    this.comment = tmp_message[tmp_message.length - 1];
    this.comment.date = new Date(this.comment.date);
    this.hasComment = true;
  }

}
