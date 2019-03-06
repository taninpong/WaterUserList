import { Component, OnInit } from '@angular/core';
import { Areas } from '../models/areas';
import { Area } from '../models/area';
import { Router } from '@angular/router';
import { AreasService } from '../services/areas.service';
import { User } from '../models/user';

@Component({
  selector: 'app-ea-list',
  templateUrl: './ea-list.component.html',
  styleUrls: ['./ea-list.component.css']
})
export class EaListComponent implements OnInit {
  nodes: any[];
  deleted = false;
  selected_tam: any;
  selected_amp: any;
  selected_cwt: any;
  selected_reg: any;
  selected_dis: any;
  reg_list: any;
  areas: Areas = new Areas();
  filter_areas: Areas = new Areas();
  checked_map = {};
  cwt_list: any = [];
  amp_list: any = [];
  tam_list: any = [];
  ea_list: Area[];
  dis_list: any = [];
  areas_for_search;
  page = 1;
  page_max;
  sort_by = "ชื่อภาค";
  sort_with = "น้อยไปมาก";
  col_name = ["รหัสภาค", "ชื่อภาค", "รหัสจังหวัด", "ชื่อจังหวัด", "รหัสอำเภอ", "ชื่ออำเภอ", "รหัสตำบล", "ชื่อตำบล", "เขตการปกครอง", "เขตแจงนับ", "จำนวนบ้าน", "จำนวนครัวเรือน", "จำนวนครัวเรือนเกษตร", "จำนวนสถานประกอบการธุรกิจทางการค้าและธุรกิจทางการบริการ", "จำนวนสถานประกอบการอุสาหกรรมการผลิต", "จำนวนโรงแรมและเกสต์เฮาส์", "จำนวนโรงพยาบาลเอกชน"]
  col_name_map = { "รหัสภาค": "REG", "ชื่อภาค": "REG_NAME", "รหัสจังหวัด": "CWT", "ชื่อจังหวัด": "CWT_NAME", "รหัสอำเภอ": "AMP", "ชื่ออำเภอ": "AMP_NAME", "รหัสตำบล": "TAM", "ชื่อตำบล": "TAM_NAME", "เขตการปกครอง": "DISTRICT", "เขตแจงนับ": "EA", "จำนวนบ้าน": "Building", "จำนวนครัวเรือน": "Household", "จำนวนครัวเรือนเกษตร": "Agricultural_HH", "จำนวนสถานประกอบการธุรกิจทางการค้าและธุรกิจทางการบริการ": "ES_BUSI", "จำนวนสถานประกอบการอุสาหกรรมการผลิต": "ES_INDUS", "จำนวนโรงแรมและเกสต์เฮาส์": "ES_HOTEL", "จำนวนโรงพยาบาลเอกชน": "ES_PV_HOS" };
  sort_map = ["น้อยไปมาก", "มากไปน้อย"];
  sort_with_map = { "น้อยไปมาก": "A", "มากไปน้อย": "D" };
  user: User;
  constructor(private areaservice: AreasService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    let area = sessionStorage.getItem("areas");
    if(area == null){
      if (this.user.TID == '4') {
        this.areaservice.getAreaByFS(this.user.USERID).then(result => {
          this.areas.areas = result;
          let index = this.areas.areas.findIndex(i => i.CWT == this.user.CWT);
          if (index != -1) {
            let s_area = this.areas.areas[index];
            this.selected_reg = s_area.REG_NAME;
            this.selected_cwt = s_area.CWT_NAME;
          }
          this.loadPage();
          sessionStorage.setItem('areas',JSON.stringify(this.areas.areas));
        }).catch(err => { console.log(err) });
      } else if (this.user.TID <= '3') {
        this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
        if (this.user.TID == '3') {
          if (this.areas.areas.length == 0) {
            this.areaservice.getAreaByCWT(this.user.CWT).then(res => {
              this.areas.areas = res;
              sessionStorage.setItem('areas',JSON.stringify(this.areas.areas));
              let index = this.areas.areas.findIndex(i => i.CWT == this.user.CWT);
              if (index != -1) {
                let s_area = this.areas.areas[index];
                this.selected_reg = s_area.REG_NAME;
                this.selected_cwt = s_area.CWT_NAME;
              }
              this.loadPage();
            }).catch(err => console.log(err));
          }
        } else {
          if (this.areas.areas == null || this.areas.areas == undefined) {
            this.areaservice.getAllAreaData().then(res => {
              this.areas.areas = res;
              sessionStorage.setItem('areas',JSON.stringify(this.areas.areas));
              let index = this.areas.areas.findIndex(i => i.CWT == this.user.CWT);
              if (index != -1) {
                let s_area = this.areas.areas[index];
                this.selected_reg = s_area.REG_NAME;
                this.selected_cwt = s_area.CWT_NAME;
              }
              this.loadPage();
            }).catch(err => console.log(err));
          }
        }
      }
    }else{
      this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
      let index = this.areas.areas.findIndex(i => i.CWT == this.user.CWT);
      if (index != -1) {
        let s_area = this.areas.areas[index];
        this.selected_reg = s_area.REG_NAME;
        this.selected_cwt = s_area.CWT_NAME;
      }
      this.loadPage();
    }
    
  }

  private loadPage(){
    this.filter_areas.areas = this.areas.areas;
    this.page_max = this.areas.areas.length / 50;
    this.areas_for_search = this.areas.areas.map(ea => ea.REG + ea.CWT + ea.AMP + ea.TAM + ea.DISTRICT + ea.EA + ":" + ea.REG_NAME + " " + ea.CWT_NAME + " " + ea.AMP_NAME + " " + ea.TAM_NAME + " " + ea.EA);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
    this.nodes = this.areas.getHiracyAreaData();
    this.reg_list = this.nodes;
    if (this.user.TID == '3' || this.user.TID == '4') {
      this.regSelected();
      this.cwtSelected();
    }
    this.createCheckedMap()
    this.sortData();
  }

  private createCheckedMap() {
    this.checked_map["0"] = false;
    for (let area of this.filter_areas.areas) {
      this.checked_map[area.REG + area.CWT + area.AMP + area.TAM + area.DISTRICT + area.EA] = false;
    }
  }

  sortData() {
    if (this.sort_with_map[this.sort_with] == 'A') {
      this.filter_areas.areas.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]]));
    } else {
      this.filter_areas.areas.sort((a, b) => a[this.col_name_map[this.sort_by]].localeCompare(b[this.col_name_map[this.sort_by]])).reverse();
    }
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }

  regSelected() {
    this.filter_areas.areas = this.areas.areas;
    let index = this.reg_list.findIndex(node => node.name == this.selected_reg);
    this.cwt_list = this.reg_list[index].children
    let reg_id = this.reg_list[index].id
    this.filter_areas.areas = this.filter_areas.areas.filter(reg => reg.REG == reg_id);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }

  cwtSelected() {
    this.filter_areas.areas = this.areas.areas;
    let index = this.cwt_list.findIndex(node => node.name == this.selected_cwt);
    this.amp_list = this.cwt_list[index].children
    let cwt_id = this.cwt_list[index].id
    this.filter_areas.areas = this.filter_areas.areas.filter(cwt => cwt.REG + cwt.CWT == cwt_id);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }
  disSelected() {
    this.filter_areas.areas = this.areas.areas;
    let index = this.dis_list.findIndex(node => node.name == this.selected_dis);
    let dis_id = this.dis_list[index].id
    this.filter_areas.areas = this.filter_areas.areas.filter(dis => dis.REG + dis.CWT + dis.AMP + dis.TAM + dis.DISTRICT == dis_id);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }
  ampSelected() {
    this.filter_areas.areas = this.areas.areas;
    let index = this.amp_list.findIndex(node => node.name == this.selected_amp);
    this.tam_list = this.amp_list[index].children
    let amp_id = this.amp_list[index].id
    this.filter_areas.areas = this.filter_areas.areas.filter(amp => amp.REG + amp.CWT + amp.AMP == amp_id);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }
  tamSelected() {
    this.filter_areas.areas = this.areas.areas;
    let index = this.tam_list.findIndex(node => node.name == this.selected_tam);
    this.dis_list = this.tam_list[index].children;
    let tam_id = this.tam_list[index].id;
    this.filter_areas.areas = this.filter_areas.areas.filter(tam => tam.REG + tam.CWT + tam.AMP + tam.TAM == tam_id);
    this.ea_list = this.filter_areas.areas.slice(0, 50 * this.page);
  }
  showPage() {
    this.ea_list = this.filter_areas.areas.slice(50 * (this.page - 1), 50 * this.page);
  }
  checkAll() {
    Object.keys(this.checked_map).forEach(
      item => { this.checked_map[item] = this.checked_map['0'] }
    );
  }
  editEa(ea) {
    localStorage.setItem("edit_ea", JSON.stringify(ea));
    this.router.navigate(["/edit_ea"]);
  }
  createEa() {
    this.router.navigate(["/create_ea"]);
  }
  deleteEa() {
    let delete_ids = Object.keys(this.checked_map).filter(k => this.checked_map[k] && k != '0');
    delete_ids.forEach(element => {
      let index = this.filter_areas.areas.findIndex(area => area.REG === element.slice(0, 1) && area.CWT === element.slice(1, 3) && area.AMP === element.slice(3, 5) && area.TAM === element.slice(5, 7) && area.DISTRICT === element.slice(7, 8) && area.EA === element.slice(8, element.length));
      let deleted_area = this.filter_areas.areas.splice(index, 1);
      this.areaservice.deleteArea(deleted_area).then(result => {
        console.log(result);
        this.reloadData();
      }).catch(err => { console.log(err) });
    });
    this.deleted = false;
  }
  uploadEa() {
    this.router.navigate(["/upload_ea"]);
  }
  range(num) {
    let result = [];
    for (let i = 1; i <= this.page_max; i++) {
      result.push(i);
    }
    return result;
  }
  reloadData() {
    if (this.user.TID < '3') {
      this.areaservice.getAllAreaData().then(
        datas => {
          this.filter_areas.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
          this.ngOnInit();
        }
      ).catch(err => {
        console.log(err)
      }
      );
    } else  if (this.user.TID == '3'){
      this.areaservice.getAreaByCWT(this.user.CWT).then(
        datas => {
          this.filter_areas.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
        }
      ).catch(err => {
        console.log(err)
      }
      );
    }else  if (this.user.TID == '4'){
      this.areaservice.getAreaByFS(this.user.USERID).then(
        datas => {
          this.filter_areas.areas = datas;
          sessionStorage.setItem("areas", JSON.stringify(datas));
        }
      ).catch(err => {
        console.log(err)
      }
      );
    }
  }

  onSearchSelected($event) {
    let ea_id = $event.split(":")[0];
    this.ea_list = this.areas.getAreasByAreaID(ea_id);
  }

}
