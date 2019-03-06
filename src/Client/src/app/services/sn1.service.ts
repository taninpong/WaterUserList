import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable()
export class Sn1Service {
  url = 'http://35.231.173.183:8080';
  selected = [];

  constructor() { }

  getSN1Data(){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn1').then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN1ByID(sn1_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn1ID',{params:{"SN1_ID":sn1_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN1ByFS(fs_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn1_fs',{params:{"FS_ID":fs_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN1ByFI(fi_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn1_fi',{params:{"FI_ID":fi_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN1ByCWT(cwt_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn1_cwt',{params:{"CWT":cwt_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  updateSN1(data){
    console.log(data);
    let result: Promise<any> = 
    axios.post( this.url+'/update_sn1',JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
    return result;
  }
}