import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tablet } from '../models/tablet';
@Injectable()
export class TabletService {

  constructor() { }
  url = 'http://35.231.173.183:8080';
  getTabletData() {
    let tabletdata: Promise<any> = axios.get(this.url + "/tablet").then(response => response.data).catch(error => console.log(error));
    return tabletdata;
  }
  getTabletDataByUserID(id) {
    let tabletdata: Promise<any> = axios.get(this.url + "/tablet_user", { params: { user_id: id } }).then(response => response.data).catch(error => console.log(error));
    return tabletdata;
  }
  getTabletDataByCWT(cwt: String) {
    let tabletdata: Promise<any> = axios.get(this.url + "/tablet_cwt", { params: { "CWT": cwt } }).then(response => response.data).catch(error => console.log(error));
    return tabletdata;
  }
  updateTablet(data: Tablet) {
    let result: Promise<any> =
      axios.post(this.url + '/update_tablet', JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
    return result;
  }

  insertTablet(data: Tablet) {
    if(this.validateData(data)){
      let result: Promise<any> =
        axios.put(this.url + '/insert_tablet', JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
      return result;
    }
  }

  deleteTablet(id) {
    let result: Promise<any> =
      axios.delete(this.url + '/delete_tablet', { params: { tablet_sn: id } }).then(response => response.data).catch(error => console.log(error));
    return result;
  }
  validateData(data: Tablet) {
    const keys = ['tablet_sn'];
    let result = true;
    for (const k of keys) {
      if (!data[k]) {
        result = false;
      }
    }
    return result;
  }
}
