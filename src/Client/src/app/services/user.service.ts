import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { User } from '../models/user';
import axios from 'axios';
@Injectable()
export class UserService {
  users: Users = new Users();
  constructor() {
  }

  url = 'http://35.231.173.183:8080';

  getAllUserData() {
    let userdata: Promise<any> = axios.get("http://nsogroup1.azurewebsites.net" + "/user").then(response => response.data).catch(error => console.log(error));
    return userdata;
  }

  uploadImageService(image) {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    axios.post(this.url + '/upload', formData);
  }

  uploadFileService(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    axios.post(this.url + '/upload', formData);
  }

  updateUser(data: User) {
    let result: Promise<any> = 
      axios.post( this.url+'/update_user',JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
      return result;
  }

  insertUser(data: User) {
    if (this.validateData(data)) {
      let result: Promise<any> = 
      axios.put( this.url+'/insert_user',JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
      return result;
    }
  }
  insertUserList(data: User[]) {
      let result: Promise<any> = 
      axios.put( this.url+'/insert_userList',JSON.parse(JSON.stringify(data))).then(response => response.data).catch(error => console.log(error));
      return result;
  }

  getUserByID(id){
    let userdata: Promise<any> = axios.post(this.url + "/user_id",{"USERID":id}).then(response => response.data).catch(error => console.log(error));
    return userdata;
  }

  getUserByIDPassword(id,password){
    let userdata: Promise<any> = axios.post(this.url + "/user_id_pwd",{"USERID":id,"PASSWORD":password}).then(response => response.data).catch(error => console.log(error));
    return userdata;
  }
  deleteUsers(id) {
    let result: Promise<any> = 
    axios.delete( this.url+'/delete_user',{params:{USERID:id}}).then(response => response.data).catch(error => console.log(error));
    return result;
  }

  validateData(data: User) {
    const keys = ['FIRSTNAME', 'LASTNAME', 'TID', 'SSN', 'PASSWORD', 'CWT'];
    let result = true;
    for (const k of keys) {
      if (!data[k]) {
        result = false;
      }
    }
    return result;
  }

  getFilteredUser(role, area) {
    let userdata: Promise<any> = axios.get(this.url + "/userlower_role_area",{params:{"TID":role,"CWT":area}}).then(response => response.data).catch(error => console.log(error));
    return userdata;
  }

  getLowerUser(role) {
    let userdata: Promise<any> = axios.get(this.url + "/userlower_role",{params:{"TID":role}}).then(response => response.data).catch(error => console.log(error));
    return userdata;
  }
  getUserWithArea(area) {
    let userdata: Promise<any> = axios.get(this.url + "/user_by_area",{params:{"CWT":area}}).then(response => response.data).catch(error => console.log(error));
    return userdata;
  }
}
