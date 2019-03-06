import { Injectable } from '@angular/core';
import axios from 'axios';
import { Area } from '../models/area';

@Injectable()
export class AreasService {



  constructor() { }
  url = 'http://35.231.173.183:8080';

  getAllAreaData() {
    let areadata: Promise<any> = axios.get(this.url + '/ea').then(response => response.data).catch(error => console.log(error));
    return areadata;
  }

  getAreaByCWT(cwt) {
    let areadata: Promise<any> = axios.get(this.url + '/ea_cwt', { params: { "CWT": cwt } }).then(response => response.data).catch(error => console.log(error));
    return areadata;
  }

  getAreaByFS(fs_id) {
    let areadata: Promise<any> = axios.get(this.url + '/ea_fs', { params: { "FS": fs_id } }).then(response => response.data).catch(error => console.log(error));
    return areadata;
  }

  getAreaByFI(fi_id) {
    let areadata: Promise<any> = axios.get(this.url + '/ea_fi', { params: { "FI": fi_id } }).then(response => response.data).catch(error => console.log(error));
    return areadata;
  }

  insertArea(data) {
    if (this.validateData(data)) {
      console.log("Insert Area");
      let result: Promise<any> = axios.put(this.url + '/insert_ea', JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
      return result;
    }
  }

  updateArea(data) {
    let result: Promise<any> =
      axios.post(this.url + '/update_ea', JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
    return result;
  }

  deleteArea(ea) {
    let result: Promise<any> =
      axios.delete(this.url + '/delete_ea', { params: JSON.parse(JSON.stringify(ea)) }).then(response => response.data).catch(error => console.log(error));
    return result;
  }

  validateData(data: Area) {
    const keys = ['REG', 'REG_NAME', 'CWT', 'CWT_NAME', 'AMP', 'AMP_NAME', 'TAM', 'TAM_NAME', 'DISTRICT', 'EA'];
    let result = true;
    for (const k of keys) {
      if (!data[k]) {
        result = false;
      }
    }
    return result;
  }
}
