import { Component, OnInit } from '@angular/core';
import { Areas } from '../models/areas';
import { Users } from '../models/users';
import { User } from '../models/user';
import { Progress } from '../models/progress';
import { Subject } from '../../../node_modules/rxjs/Subject';
import { UserService } from '../services/user.service';
import { AreasService } from '../services/areas.service';
import { Router } from '../../../node_modules/@angular/router';
import { ProgressReportComponent } from './../progress-report/progress-report.component';
import * as XLSX from 'xlsx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Area } from '../models/area';

@Component({
  selector: 'app-home-progress-report',
  templateUrl: './home-progress-report.component.html',
  styleUrls: ['./home-progress-report.component.css']
})
export class HomeProgressReportComponent implements OnInit {
  datas = new Areas();
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

  progress: Progress;
  process_page = 1;
  selected_id = '';
  progresses: Progress[] = [];
  progresses_filter: Progress[] = [];
  progresses_filter_select: Progress[] = [];
  progresses_onSelect: Progress[];

  tab;

  eventsSubject1 = new Subject<void>();
  eventsSubject2 = new Subject<void>();
  eventsSubject3 = new Subject<void>();
  eventsSubject4 = new Subject<void>();

  constructor(private userservice: UserService, private areaService: AreasService, private router: Router) { }

  emitEventToChild1() {
    this.eventsSubject1.next()
  }
  emitEventToChild2() {
    this.eventsSubject2.next()
  }
  emitEventToChild3() {
    this.eventsSubject3.next()
  }
  emitEventToChild4() {
    this.eventsSubject4.next()
  }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user.TID < '3') {
      this.userservice.getAllUserData().then(result => {
        this.users.users = result;
        this.users.users.push(this.user);
        this.creatStaffList();
      }).catch(err => { console.log(err) });
    } else {
      this.userservice.getFilteredUser(this.user.TID, this.user.CWT).then(result => {
        this.users.users = result;
        this.users.users.push(this.user);
        this.creatStaffList();

      }).catch(err => { console.log(err) });
    }
    this.createAreas();
    this.selected_reg = sessionStorage.getItem("selected_reg");
    this.selected_cwt = sessionStorage.getItem("selected_cwt");
    this.selected_amp = sessionStorage.getItem("selected_amp");
    this.selected_dis = sessionStorage.getItem("selected_dis");
    this.selected_tam = sessionStorage.getItem("selected_tam");
    this.selected_ea = sessionStorage.getItem("selected_ea");
    setTimeout(() => { this.emitEventToChild1() }, 5000)

  }
  receiveMessageReg($event) {
    this.selected_reg = $event
  }
  receiveMessageCwt($event) {
    this.selected_cwt = $event
  }
  receiveMessageAmp($event) {
    this.selected_amp = $event
  }
  receiveMessageDis($event) {
    this.selected_dis = $event
  }
  receiveMessageEa($event) {
    this.selected_ea = $event
  }
  receiveMessageTam($event) {
    this.selected_tam = $event
  }


  creatStaffList() {
    this.fs_list = this.users.users.filter(user => user.TID === '4').map(user => user.USERID + ": " + user.FIRSTNAME + " " + user.LASTNAME);
    this.fi_list = this.users.users.filter(user => user.TID === '5').map(user => user.USERID + ": " + user.FIRSTNAME + " " + user.LASTNAME);
  }

  createAreas() {
    this.areas.areas = [];
    if (this.user.TID === '4') {
      this.areaService.getAreaByFS(this.user.USERID).then(result => {
        this.areas.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.createProgress();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID === '3') {
      this.areaService.getAreaByCWT(this.user.CWT).then(result => {
        this.areas.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.createProgress();
      }).catch(err => { console.log(err) });
    }
    if (this.user.TID < '3') {
      this.areaService.getAllAreaData().then(result => {
        this.areas.areas = result;
        this.nodes = this.areas.getHiracyAreaData();
        this.reg_list = this.nodes;
        this.createProgress();
      }).catch(err => { console.log(err) });
    }
  }

  createProgress() {
    for (let ea of this.areas.areas) {
      let progress1: Progress = new Progress();
      progress1.ea = ea;
      progress1.max_Building = parseInt(ea.Building + '');
      progress1.value_Building = Math.floor((Math.random() * ea.Building));
      progress1.max_Household = parseInt(ea.Household + '');
      progress1.value_Household = Math.floor((Math.random() * ea.Household));
      progress1.max_Agricultural_HH = parseInt(ea.Agricultural_HH + '');
      progress1.value_Agricultural_HH = Math.floor((Math.random() * ea.Agricultural_HH));
      this.progresses.push(progress1)
    }
    this.progresses_filter_select = Object.create(this.progresses);
    this.createCountryProgress();
  }

  createCountryProgress() {
    this.progress = new Progress();
    let ea = new Area();
    ea.REG = '0';
    ea.REG_NAME = "ทั้งหมด"
    this.progress.ea = ea;
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let regs = this.areas.areas.map(ea => ea.REG).filter(this.onlyUnique);
    for (let i of regs) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByREG(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG === progress_.ea.REG).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }

    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createREGProgress(id) {
    this.progress.ea = this.areas.filterAreasByREG(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let cwt = this.areas.areas.filter(ea => ea.REG === id).map(ea => ea.REG + ea.CWT).filter(this.onlyUnique);
    for (let i of cwt) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByCWT(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT === progress_.ea.REG + progress_.ea.CWT).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }

    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createCWTProgress(id) {
    this.progress.ea = this.areas.filterAreasByCWT(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let amp = this.areas.areas.filter(ea => ea.REG + ea.CWT === id).map(ea => ea.REG + ea.CWT + ea.AMP).filter(this.onlyUnique);
    for (let i of amp) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByAMP(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createAMPProgress(id) {
    this.progress.ea = this.areas.filterAreasByAMP(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let tam = this.areas.areas.filter(ea => ea.REG + ea.CWT + ea.AMP === id).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM).filter(this.onlyUnique);
    for (let i of tam) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByTAM(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP + p.ea.TAM === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP + progress_.ea.TAM).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }

    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createTAMProgress(id) {
    this.progress.ea = this.areas.filterAreasByTAM(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let dis = this.areas.areas.filter(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM === id).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT).filter(this.onlyUnique);
    for (let i of dis) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByDISTRICT(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP + p.ea.TAM + p.ea.DISTRICT === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP + progress_.ea.TAM + progress_.ea.DISTRICT).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }

    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createDISTRICTProgress(id) {
    this.progress.ea = this.areas.filterAreasByDISTRICT(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let ea = this.areas.areas.filter(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT === id).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).filter(this.onlyUnique);
    for (let i of ea) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByEA(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP + p.ea.TAM + p.ea.DISTRICT + p.ea.EA === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP + progress_.ea.TAM + progress_.ea.DISTRICT + progress_.ea.EA).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createEAProgress(id) {
    this.progress.ea = this.areas.filterAreasByEA(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let ea = this.areas.areas.filter(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA === id).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).filter(this.onlyUnique);
    for (let i of ea) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByEA(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP + p.ea.TAM + p.ea.DISTRICT + p.ea.EA === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP + progress_.ea.TAM + progress_.ea.DISTRICT + progress_.ea.EA).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createStaffCWTProgress(id) {
    this.progress.ea = this.areas.filterAreasByCWT(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let fs = this.areas.areas.filter(ea => ea.REG + ea.CWT === id).map(ea => ea.FS).filter(fs => fs !== undefined).filter(this.onlyUnique);
    for (let i of fs) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByFSandCWT(id.slice(1, ), i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.FS === progress_.ea.FS).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  createFSProgress(id) {
    this.selected_fi = undefined;
    this.progress.ea = this.areas.filterAreasByFS(id)[0];
    if (this.progress.ea) {
      this.progress.max_Building = 0;
      this.progress.max_Household = 0;
      this.progress.max_Agricultural_HH = 0;
      this.progress.value_Building = 0;
      this.progress.value_Household = 0;
      this.progress.value_Agricultural_HH = 0;
      this.progresses_filter_select.forEach(progress => {
        this.progress.max_Building += progress.max_Building;
        this.progress.max_Household += progress.max_Household;
        this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
        this.progress.value_Building += progress.value_Building;
        this.progress.value_Household += progress.value_Household;
        this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect = [];
      let ea = this.areas.areas.filter(ea => ea.FS === id).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).filter(this.onlyUnique);
      for (let i of ea) {
        let progress_ = new Progress();
        progress_.ea = this.areas.filterAreasByEA(i)[0];
        progress_.max_Building = 0;
        progress_.max_Household = 0;
        progress_.max_Agricultural_HH = 0;
        progress_.value_Building = 0;
        progress_.value_Household = 0;
        progress_.value_Agricultural_HH = 0;
        this.progresses_filter_select.filter(p => p.ea.REG + p.ea.CWT + p.ea.AMP + p.ea.TAM + p.ea.DISTRICT + p.ea.EA === progress_.ea.REG + progress_.ea.CWT + progress_.ea.AMP + progress_.ea.TAM + progress_.ea.DISTRICT + progress_.ea.EA).forEach(progress => {
          progress_.max_Building += progress.max_Building;
          progress_.max_Household += progress.max_Household;
          progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
          progress_.value_Building += progress.value_Building;
          progress_.value_Household += progress.value_Household;
          progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
        });
        this.progresses_onSelect.push(progress_);
      }
      this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
    }
  }

  createFIProgress(id) {
    this.progress.ea = this.areas.filterAreasByFI(id)[0];
    this.progress.max_Building = 0;
    this.progress.max_Household = 0;
    this.progress.max_Agricultural_HH = 0;
    this.progress.value_Building = 0;
    this.progress.value_Household = 0;
    this.progress.value_Agricultural_HH = 0;
    this.progresses_filter_select.forEach(progress => {
      this.progress.max_Building += progress.max_Building;
      this.progress.max_Household += progress.max_Household;
      this.progress.max_Agricultural_HH += progress.max_Agricultural_HH;
      this.progress.value_Building += progress.value_Building;
      this.progress.value_Household += progress.value_Household;
      this.progress.value_Agricultural_HH += progress.value_Agricultural_HH;
    });

    this.progresses_onSelect = [];
    let ea = this.areas.areas.filter(ea => ea.FI && ea.FI.findIndex(fi => fi === id) !== -1).map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).filter(this.onlyUnique);
    for (let i of ea) {
      let progress_ = new Progress();
      progress_.ea = this.areas.filterAreasByEA(i)[0];
      progress_.max_Building = 0;
      progress_.max_Household = 0;
      progress_.max_Agricultural_HH = 0;
      progress_.value_Building = 0;
      progress_.value_Household = 0;
      progress_.value_Agricultural_HH = 0;
      this.progresses_filter_select.filter(p => p.ea.FI && p.ea.FI.findIndex(fi => fi === id) !== -1).forEach(progress => {
        progress_.max_Building += progress.max_Building;
        progress_.max_Household += progress.max_Household;
        progress_.max_Agricultural_HH += progress.max_Agricultural_HH;
        progress_.value_Building += progress.value_Building;
        progress_.value_Household += progress.value_Household;
        progress_.value_Agricultural_HH += progress.value_Agricultural_HH;
      });
      this.progresses_onSelect.push(progress_);
    }
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }


  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  showPage() {
    this.progresses_filter = this.progresses_onSelect.slice(50 * (this.process_page - 1), 50 * this.process_page);
  }

  regSelected() {
    const index = this.reg_list.findIndex(node => node.name === this.selected_reg);
    this.cwt_list = this.reg_list[index].children;
    this.selected_id = this.reg_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG === this.selected_id);
    this.createREGProgress(this.selected_id);
    this.selected_cwt = undefined;
    this.selected_amp = undefined;
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
    this.selected_fs = undefined;
    this.selected_fi = undefined;
  }

  cwtSelected() {
    const index = this.cwt_list.findIndex(node => node.name === this.selected_cwt);
    this.amp_list = this.cwt_list[index].children;
    this.selected_id = this.cwt_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT === this.selected_id);
    this.createCWTProgress(this.selected_id);
    this.selected_amp = undefined;
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
  }

  ampSelected() {
    const index = this.amp_list.findIndex(node => node.name === this.selected_amp);
    this.tam_list = this.amp_list[index].children;
    this.selected_id = this.amp_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT + proc.ea.AMP === this.selected_id);
    this.createAMPProgress(this.selected_id);
    this.selected_tam = undefined;
    this.selected_dis = undefined;
    this.selected_ea = undefined;
  }
  tamSelected() {
    const index = this.tam_list.findIndex(node => node.name === this.selected_tam);
    this.dis_list = this.tam_list[index].children;
    this.selected_id = this.tam_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT + proc.ea.AMP + proc.ea.TAM === this.selected_id);
    this.createTAMProgress(this.selected_id);
    this.selected_dis = undefined;
    this.selected_ea = undefined;
  }
  disSelected() {
    const index = this.dis_list.findIndex(node => node.name === this.selected_dis);
    this.ea_list = this.dis_list[index].children;
    this.selected_id = this.dis_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT + proc.ea.AMP + proc.ea.TAM + proc.ea.DISTRICT === this.selected_id);
    this.createDISTRICTProgress(this.selected_id);
    this.selected_ea = undefined;
  }
  eaSelected() {
    const index = this.ea_list.findIndex(node => node.name === this.selected_ea);
    this.selected_id = this.ea_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT + proc.ea.AMP + proc.ea.TAM + proc.ea.DISTRICT + proc.ea.EA === this.selected_id);
    this.createEAProgress(this.selected_id);
  }

  selectStaffCWT() {
    const index = this.cwt_list.findIndex(node => node.name === this.selected_cwt);
    this.amp_list = this.cwt_list[index].children;
    this.selected_id = this.cwt_list[index].id;
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.REG + proc.ea.CWT === this.selected_id);
    this.createStaffCWTProgress(this.selected_id);
    this.selected_fs = undefined;
    this.selected_fi = undefined;
  }

  fsSelected() {
    let fs_id = this.selected_fs.split(":")[0];
    this.progresses_filter_select = this.progresses.filter(proc => proc.ea.FS === fs_id);
    this.createFSProgress(fs_id);
    this.selected_fi = undefined;
  }

  fiSelected() {
    let fi_id = this.selected_fi.split(":")[0];
    this.progresses_filter_select = this.progresses.filter(proc =>
      proc.ea.FI && proc.ea.FI.findIndex(id => id === fi_id) !== -1
    );
    this.createFIProgress(fi_id);
    this.selected_fs = undefined;;
  }

  getUserRoleName(role) {
    let role_map = { '1': "ผู้ดูแลระบบ", '2': "ผู้บริหาร/เจ้าของโครงการ", '3': "สถิติจังหวัด", '4': "เจ้าหน้าผู้ควบคุมงาน", '5': "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
    return role_map[role];
  }

  validateClicked() {
    this.router.navigate(['/validate_job'])
  }

  createJsonDataForExport() {
    let key_to_thai = { REG: "รหัส ภาค", REG_NAME: "ชื่อภาค", CWT: "รหัส จังหวัด", CWT_NAME: "ชื่อ จังหวัด", AMP: "รหัส อำเภอ", AMP_NAME: "ชื่อ อำเภอ", TAM: "รหัส ตำบล", TAM_NAME: "ชื่อ ตำบล", DISTRICT: "เขต การ ปกครอง", EA: "รหัส พื้นที่ย่อย", max_Building: "จำนวน บ้าน ทั้งหมด", max_Household: "จำนวน ครัวเรือน ทั้งหมด", max_Agricultural_HH: "จำนวน ครัวเรือน เกษตร ทั้งหมด", value_Building: "จำนวน บ้าน ที่สำรวจแล้ว", value_Household: "จำนวน ครัวเรือน ที่สำรวจแล้ว", value_Agricultural_HH: "จำนวน ครัวเรือน เกษตร ที่สำรวจแล้ว", FS: "เจ้าหน้าที่ วิชาการ", FI: "พนักงาน แจงนับ" };
    let progress_list = [];
    let merge_progress;

    merge_progress = Object.assign(this.progress, this.progress.ea);
    delete merge_progress.ea
    delete merge_progress.MUN;
    delete merge_progress.MUN_NAME;
    delete merge_progress.TAO;
    delete merge_progress.TAO_NAME;
    delete merge_progress.VIL;
    delete merge_progress.VIL_NAME;
    delete merge_progress.MAP_STATUS;
    delete merge_progress.Building;
    delete merge_progress.Household;
    delete merge_progress.Agricultural_HH;
    delete merge_progress.ES_BUSI;
    delete merge_progress.ES_INDUS;
    delete merge_progress.ES_HOTEL;
    delete merge_progress.ES_PV_HOS;
    delete merge_progress.REMARK;
    if (this.tab === 1) {
      if (this.selected_id.length < 11) {
        delete merge_progress.EA;
        delete merge_progress.FI;
        delete merge_progress.FS;
      }
      if (this.selected_id.length < 8) {
        delete merge_progress.DISTRICT;
      }
      if (this.selected_id.length < 7) {
        delete merge_progress.TAM;
        delete merge_progress.TAM_NAME;
      }
      if (this.selected_id.length < 5) {
        delete merge_progress.AMP;
        delete merge_progress.AMP_NAME;
      }
      if (this.selected_id.length < 3) {
        delete merge_progress.CWT;
        delete merge_progress.CWT_NAME;
      }
    } else {
      if (!(this.selected_fs || this.selected_fi)) {
        delete merge_progress.AMP;
        delete merge_progress.AMP_NAME;
        delete merge_progress.TAM;
        delete merge_progress.TAM_NAME;
        delete merge_progress.DISTRICT;
        delete merge_progress.EA;
        delete merge_progress.FI;
        delete merge_progress.FS;
      }
      if (this.selected_id.length < 3) {
        delete merge_progress.CWT;
        delete merge_progress.CWT_NAME;
      }
    }
    let progress_with_col_name = {};
    Object.keys(merge_progress).forEach(key => {
      if (key !== "FI") {
        progress_with_col_name[key_to_thai[key]] = merge_progress[key];
      } else {
        progress_with_col_name[key_to_thai[key]] = merge_progress[key].toString();
      }
    });

    progress_list.push(progress_with_col_name);
    let tmp_progress_onselect = JSON.parse(JSON.stringify(this.progresses_onSelect));
    tmp_progress_onselect.forEach(prog => {
      let merge_result = Object.assign(prog, prog.ea);
      delete merge_result.ea;
      delete merge_result.MUN;
      delete merge_result.MUN_NAME;
      delete merge_result.TAO;
      delete merge_result.TAO_NAME;
      delete merge_result.VIL;
      delete merge_result.VIL_NAME;
      delete merge_result.MAP_STATUS;
      delete merge_result.Building;
      delete merge_result.Household;
      delete merge_result.Agricultural_HH;
      delete merge_result.ES_BUSI;
      delete merge_result.ES_INDUS;
      delete merge_result.ES_HOTEL;
      delete merge_result.ES_PV_HOS;
      delete merge_result.REMARK;
      if (this.tab === 1) {
        if (this.selected_id.length < 8) {
          delete merge_result.EA;
          delete merge_result.FI;
          delete merge_result.FS;
        }
        if (this.selected_id.length < 7) {
          delete merge_result.DISTRICT;
        }
        if (this.selected_id.length < 5) {
          delete merge_result.TAM;
          delete merge_result.TAM_NAME;
        }
        if (this.selected_id.length < 3) {
          delete merge_result.AMP;
          delete merge_result.AMP_NAME;
        }
        if (this.selected_id.length < 1) {
          delete merge_result.CWT;
          delete merge_result.CWT_NAME;
        }
      } else {
        if (!(this.selected_fs || this.selected_fi)) {
          delete merge_result.AMP;
          delete merge_result.AMP_NAME;
          delete merge_result.TAM;
          delete merge_result.TAM_NAME;
          delete merge_result.DISTRICT;
          delete merge_result.EA;
          delete merge_result.FI;
          delete merge_result.FS;
        }
        if (this.selected_id.length < 3) {
          delete merge_result.CWT;
          delete merge_result.CWT_NAME;
        }
      }
      let prog_with_col_name = {};
      Object.keys(merge_result).forEach(key => {
        if (key !== "FI") {
          prog_with_col_name[key_to_thai[key]] = merge_result[key];
        } else {
          prog_with_col_name[key_to_thai[key]] = merge_result[key].toString();
        }
      });
      progress_list.push(prog_with_col_name);
    });
    return progress_list;
  }

  exportToExcel() {
    let progress_list = this.createJsonDataForExport();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(progress_list);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'progress.csv');
  }
  exportToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let progress_list = this.createJsonDataForExport();
    let header = Object.keys(progress_list[1]).map(key => {
      return { text: key, fontSize: 14, bold: true };
    });

    let data = progress_list.map(prg => {
      return Object.keys(progress_list[1]).map(key => {
        if (prg[key]) {
          return prg[key].toString();
        } else {
          return "";
        }
      });
    });

    let table_data = [];
    table_data.push(header);
    data.forEach(d => {
      table_data.push(d);
    });

    var docDefinition = {
      content: [
        {
          table: {
            headerRows: 4,
            widths: header.map(h => 'auto'),
            body: table_data
          }
        }
      ],
      defaultStyle: {
        font: 'THSarabunNew'
      },
      pageOrientation: 'landscape'
    };

    pdfMake.createPdf(docDefinition).download();
    this.ngOnInit();
  }

}
