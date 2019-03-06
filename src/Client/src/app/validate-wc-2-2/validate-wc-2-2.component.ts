import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import { Sn22Service } from '../services/sn22.service';
import { ActivatedRoute } from '@angular/router';
import { Area } from '../models/area';

@Component({
  selector: 'app-validate-wc-2-2',
  templateUrl: './validate-wc-2-2.component.html',
  styleUrls: ['./validate-wc-2-2.component.css']
})
export class ValidateWc22Component implements OnInit {
  ea: Area;
  sn22: SN2_2;
  word_has = {false:"ไม่มี",true:"มี"};
  word_yes_no = {false:"ไม่ใช่",true:"ใช่"};
  word_use = {false:"ไม่ใช้",true:"ใช้"};
  word_was = {false:"ไม่เคย",true:"เคย"};
  status_sn = { 0: "เริ่มสร้าง", 4: "สำรวจเสร็จสิ้น",6: "รอการตรวจสอบ", 10: "รอแก้ไข" };
  status_appr = { 0: "ยังไม่ครบทุกหน่วย", 1: "สำรวจครบแล้ว", 2: "เจ้าหน้าที่ผู้ควบคุมงานตรวจสอบแล้ว", 3: "สถิติจังหวัดตรวจสอบแล้ว" };
  constructor(private _location: Location, private router: ActivatedRoute) { }

  ngOnInit() {
    this.sn22 = JSON.parse(localStorage.getItem('sn22'));
    console.log(this.sn22);
  }

  backButtonClicked() {
    this._location.back();
  }

}
