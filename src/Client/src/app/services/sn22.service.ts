import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable()
export class Sn22Service {
  url = 'http://35.231.173.183:8080';
  constructor() { }

  getSN22Data(){
    let sn22Data: Promise<any> = axios.get(this.url+'/sn22').then(response => response.data).catch(error => console.log(error));
    return sn22Data;
  }
  getSN22DataByAreaID(id){
    let sn22Data: Promise<any> = axios.get(this.url+'/sn22AreaID',{params:{"SN2_2_ID":id}}).then(response => response.data).catch(error => console.log(error));
    return sn22Data;
  }
  getSN22DataById(id){
    let sn22Data: Promise<any> = axios.get(this.url+'/sn22ID',{params:{"SN2_2_ID":id}}).then(response => response.data).catch(error => console.log(error));
    return sn22Data;
  }
  getSN22ByFS(fs_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn22_fs',{params:{"FS_ID":fs_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN22ByFI(fi_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn22_fi',{params:{"FI_ID":fi_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  getSN22ByCWT(cwt_id){
    let sn1Data: Promise<any> = axios.get(this.url+'/sn22_cwt',{params:{"CWT":cwt_id}}).then(response => response.data).catch(error => console.log(error));
    return sn1Data;
  }
  deleteSN22ID(id){
    let sn22Data: Promise<any> = axios.delete(this.url+'/delete_sn22',{params:{"SN2_2_ID":id}}).then(response => response.data).catch(error => console.log(error));
    return sn22Data;
  }
  updateSN22(data){
    let result: Promise<any> = 
    axios.post( this.url+'/update_sn22',JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
    return result;
  }
}
