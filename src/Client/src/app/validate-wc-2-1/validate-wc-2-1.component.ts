import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {Location} from '@angular/common';
import { SN1P3 } from '../models/SN1/SN1P3';
import { SN1P2 } from '../models/SN1/SN1P2';
@Component({
  selector: 'app-validate-wc-2-1',
  templateUrl: './validate-wc-2-1.component.html',
  styleUrls: ['./validate-wc-2-1.component.css']
})
export class ValidateWc21Component implements OnInit {
  user: User;
  data: any;
  messege;
  hasMassege = false;
  sn1p2:SN1P2;
  sn1p3:SN1P3;
  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.data = JSON.parse(localStorage.getItem("sn2_1"));
    this.sn1p2 =  JSON.parse(localStorage.getItem("sn1p2"));
    this.sn1p3 =  JSON.parse(localStorage.getItem("sn1p3"));
    this.sn1p3.WaterData.tapWater
    this.sn1p3.WaterData.groundWater
    this.sn1p3.WaterData.riverWater
    this.sn1p3.WaterData.chonWater
    this.sn1p3.WaterData.rainWater
    this.sn1p3.WaterData.buyWater
  }

  toBoolean(data){
    return Boolean(data);
  }

  backButtonClicked(){
    this._location.back();
  }

  reportFSButtonClicked() {
    this.sn1p3.status_approve
    this.hasMassege = true;
  }
  validatedButtonClicked(){

  }

  sendMassege(){
    console.log(this.messege);
    this.hasMassege = false;
  }
  range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i < max; i += step) {
      input.push(i);
    }
    return input;
  }
}
