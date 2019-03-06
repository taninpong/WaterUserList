import { Component, OnInit } from '@angular/core';
import { SN1 } from '../models/SN1/SN1';
import { SN2_2 } from '../models/SN2_2/SN2_2';
import { User } from '../models/user';
import { Users } from '../models/users';
import { Areas } from '../models/areas';
import { Area } from '../models/area';
import { Sn22Service } from '../services/sn22.service';
import { Sn1Service } from '../services/sn1.service';
import { UserService } from '../services/user.service';
import { Subject } from '../../../node_modules/rxjs/Subject';

@Component({
  selector: 'app-home-results-report',
  templateUrl: './home-results-report.component.html',
  styleUrls: ['./home-results-report.component.css']
})
export class HomeResultsReportComponent implements OnInit {
  reg_list = [];
  cwt_list = [];
  amp_list = [];
  tam_list = [];
  dis_list = [];
  ea_list = [];
  selected_reg = null;
  selected_cwt = null;
  selected_amp = null;
  selected_tam = null;
  selected_dis = null;
  selected_ea = null;
  sn_1List: SN1[] = [];
  sn2_2List: SN2_2[] = [];
  user: User;
  users: Users = new Users();
  areas: Areas = new Areas();
  data = {};
  selectedID: number[] = [];
  tab = 1;
  eventsSubject1 = new Subject<void>();
  eventsSubject2 = new Subject<void>();
  eventsSubject3 = new Subject<void>();

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
    this.getSN1Data();
    if(this.tab == 1)
      this.emitEventToChild1();
    else if(this.tab == 2)
      this.emitEventToChild2();
    else if(this.tab == 3)
      this.emitEventToChild3();
  }

  emitEventToChild1() {
    console.log("emit to 1");
    this.eventsSubject1.next()
  }
  emitEventToChild2() {
    this.eventsSubject2.next()
  }
  emitEventToChild3() {
    this.eventsSubject3.next()
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
        this.data = this.calculateTable();
        this.createRegSearch(this.data);
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID == '3') {
      this.sn22Service.getSN22ByCWT(this.user.CWT).then(result => {
        this.sn2_2List = result;
        this.data = this.calculateTable();
        this.createRegSearch(this.data);
      }).catch(err => { console.log(err) });
    }
    else if (this.user.TID < '3') {
      this.sn22Service.getSN22Data().then(result => {
        this.sn2_2List = result;
        this.data = this.calculateTable();
        this.createRegSearch(this.data);
      }).catch(err => { console.log(err) });
    }
  }

  getSN1Status(ea: Area) {
    return this.sn_1List.filter(sn1 => sn1.SN1_ID === ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA).map(sn1 => sn1.status_data);
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
    sessionStorage.setItem("selected_reg", this.selected_reg);
    if (this.tab == 1)
      this.emitEventToChild1();
    else if (this.tab == 2)
      this.emitEventToChild2();
    else if (this.tab == 3)
      this.emitEventToChild3();
  }

  cwtSelected() {
    this.selected_amp = null;
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    while (1 < this.selectedID.length) this.selectedID.pop();
    const index = this.cwt_list.findIndex(area => area.name === this.selected_cwt);
    this.selected(this.cwt_list[index]);
    sessionStorage.setItem("selected_cwt", this.selected_cwt);
    if (this.tab == 1)
      this.emitEventToChild1();
    else if (this.tab == 2)
      this.emitEventToChild2();
    else if (this.tab == 3)
      this.emitEventToChild3();
  }

  ampSelected() {
    this.selected_tam = null;
    this.selected_dis = null;
    this.selected_ea = null;
    while (2 < this.selectedID.length) this.selectedID.pop();
    const index = this.amp_list.findIndex(area => area.name === this.selected_amp);
    this.selected(this.amp_list[index]);
    sessionStorage.setItem("selected_amp", this.selected_amp);
    if (this.tab == 1)
      this.emitEventToChild1();
    else if (this.tab == 2)
      this.emitEventToChild2();
    else if (this.tab == 3)
      this.emitEventToChild3();
  }

  tamSelected() {
    this.selected_dis = null;
    this.selected_ea = null;
    while (3 < this.selectedID.length) this.selectedID.pop();
    const index = this.tam_list.findIndex(area => area.name === this.selected_tam);
    this.selected(this.tam_list[index]);
    sessionStorage.setItem("selected_tam", this.selected_tam);
    if (this.tab == 1)
      this.emitEventToChild1();
    else if (this.tab == 2)
      this.emitEventToChild2();
    else if (this.tab == 3)
      this.emitEventToChild3();
  }

  disSelected() {
    this.selected_ea = null;
    while (4 < this.selectedID.length) this.selectedID.pop();
    const index = this.dis_list.findIndex(area => area.name === this.selected_dis);
    this.selected(this.dis_list[index]);
    sessionStorage.setItem("selected_dis", this.selected_dis);
    if (this.tab == 1)
      this.emitEventToChild1();
    else if (this.tab == 2)
      this.emitEventToChild2();
    else if (this.tab == 3)
      this.emitEventToChild3();
  }
  eaSelected() {
    while (5 < this.selectedID.length) this.selectedID.pop();
    const index = this.ea_list.findIndex(area => area.name === this.selected_ea);
    this.selected(this.ea_list[index]);
    sessionStorage.setItem("selected_ea", this.selected_ea);
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

  calculateTable() {
    let areasJSON = JSON.parse(sessionStorage.getItem('areas'));
    let areas = new Areas();
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
      let ea_temp = areas.filterAreasByDISTRICT(dis.id);
      for (let ea of ea_temp) {
        ea_map[ea.EA] = {
          id: ea.EA,
          name: ea.EA,
          children: {},
        }
      }
      dis_map[dis.id] = {
        id: dis.id,
        name: dis.name,
        children: ea_map
      }
    }
    let tams = areas.tam;
    for (let tam of tams) {
      let children = {};
      for (let dis of tam.children) {
        children[dis.id] = dis_map[dis.id];
      }
      tam_map[tam.id] = {
        id: tam.id,
        name: tam.name,
        children: children
      }
    }
    let amps = areas.amp;
    for (let amp of amps) {
      let children = {};
      for (let tam of amp.children) {
        children[tam.id] = tam_map[tam.id];
      }
      amp_map[amp.id] = {
        id: amp.id,
        name: amp.name,
        children: children
      }
    }
    let cwts = areas.cwt;
    for (let cwt of cwts) {
      let children = {};
      for (let amp of cwt.children) {
        children[amp.id] = amp_map[amp.id];
      }
      cwt_map[cwt.id] = {
        id: cwt.id,
        name: cwt.name,
        children: children
      }
    }
    let regs = areas.reg;
    for (let reg of regs) {
      let children = {};
      for (let cwt of reg.children) {
        children[cwt.id] = cwt_map[cwt.id];
      }
      reg_map[reg.id] = {
        id: reg.id,
        name: reg.name,
        children: children
      }
    }
    return reg_map;
  }

  selected(area: any) {
    if (this.selectedID.length <= 6 && area != undefined) {
      if (this.selectedID.length === 6) this.selectedID.pop();
      this.selectedID.push(area.id);
    }
    this.search_track(area.name, area.children);
  }

  search_track(area, data) {
    const selected_id_length = this.selectedID.length;
    switch (selected_id_length) {
      case 1:
        this.createCWTSearch(data);
        this.selected_reg = area;
        this.amp_list = [];
        this.tam_list = [];
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 2:
        this.createAMPSearch(data);
        this.selected_cwt = area;
        this.tam_list = [];
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 3:
        this.createTAMSearch(data);
        this.selected_amp = area;
        this.dis_list = [];
        this.ea_list = [];
        break;
      case 4:
        this.createDisSearch(data);
        this.selected_tam = area;
        this.ea_list = [];
        break;
      case 5:
        this.createEASearch(data);
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
}
