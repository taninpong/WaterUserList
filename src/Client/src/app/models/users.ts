import { User } from './user';
export class Users {
  users: User[] = [];


  constructor() {
  }

  createNewUserID(cwt_id, role_id) {
    let pre_id = cwt_id + role_id;
    let id_list_in_cwt_role;
    if (this.users) {
      id_list_in_cwt_role = this.users.filter(user => user.USERID.slice(0, 3) === pre_id).map(user => parseInt(user.USERID.slice(3, 7)));
    } else {
      id_list_in_cwt_role = [];
    }

    if (id_list_in_cwt_role.length == 0) {
      id_list_in_cwt_role.push(0);
    }
    let result = this.pad_with_zeroes(Math.max(...id_list_in_cwt_role) + 1, 4);
    return cwt_id + role_id + result;
  }


  private pad_with_zeroes(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
      my_string = '0' + my_string;
    }

    return my_string;
  }

  getFilteredUser(TID, CWT) {
    if (TID === "1") {
      return this.users;
    } else {
      return this.getUserWithArea(this.getLowerUser(this.users, TID), CWT);
    }
  }

  getLowerUser(users, TID) {
    return users.filter(user => user.TID > TID);
  }
  getUserWithArea(users, CWT) {
    return users.filter(user => user.CWT === CWT);
  }

  getFitValueUser(users) {
    let tid_map = { "ผู้ดูแลระบบ": '1', "ผู้บริหาร/เจ้าของโครงการ": '2', "สถิติจังหวัด": '3', "เจ้าหน้าผู้ควบคุมงาน": '4', "เจ้าหน้าที่เก็บรวบรวมข้อมูล": '5' };
    return users.filter(user => {
      if (!user.TID) {
        if (user.TYPE_NAME) {
          user.TID = tid_map[user.TYPE_NAME];
        }
      }
      return user.TID >= 1 && user.TID <= 5;
    });
  }

  getLowerRole(TID) {
    let role_map = { '1': "ผู้ดูแลระบบ", '2': "ผู้บริหาร/เจ้าของโครงการ", '3': "สถิติจังหวัด", '4': "เจ้าหน้าผู้ควบคุมงาน", '5': "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
    if (TID == 1) {
      return Object.keys(role_map).map(role_num => role_map[role_num]);
    }
    return Object.keys(role_map).filter(num => num > TID).map(role_num => role_map[role_num]);
  }

  getUserByRoleAndProvince(TID, CWT) {
    return this.users.filter(user => user.TID === TID).filter(user => user.CWT === CWT);
  }

  getUserByID(id) {
    return this.users.find(user => user.USERID === id);
  }

  searchUser(data) {
    let index = this.users.findIndex(user => user.USERID === data);
    if (index === -1) {
      index = this.users.findIndex(user => user.PHONE === data);
    }
    if (index === -1) {
      index = this.users.findIndex(user => user.EMAIL === data);
    }
    if (index === -1) {
      return false;
    } else {
      return this.users[index];
    }
  }
}