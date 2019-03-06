import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Areas } from '../models/areas';
import { Router } from '@angular/router';
import * as XLSX from 'ts-xlsx';
import * as EXLSX from 'xlsx';
import { Location } from '@angular/common';
import { EX_EA } from '../models/EAData'
import { Tablet } from '../models/tablet';
import { TabletService } from '../services/tablet.service';
import { Tablets } from '../models/tablets';
@Component({
  selector: 'app-upload-tablet',
  templateUrl: './upload-tablet.component.html',
  styleUrls: ['./upload-tablet.component.css']
})
export class UploadTabletComponent implements OnInit {

  tablets = new Tablets();
  areas: Areas = new Areas();
  cwt_list: String[] = [];
  segmentDimmed = false;
  user: User;
  modal_title = '';
  modal_message = '';
  maximum_progress;
  value;
  role_map = { '1': "ผู้ดูแลระบบ", '2': "ผู้บริหาร/เจ้าของโครงการ", '3': "สถิติจังหวัด", '4': "เจ้าหน้าผู้ควบคุมงาน", '5': "เจ้าหน้าที่เก็บรวบรวมข้อมูล" };
  tid_map = { "ผู้ดูแลระบบ": '1', "ผู้บริหาร/เจ้าของโครงการ": '2', "สถิติจังหวัด": '3', "เจ้าหน้าผู้ควบคุมงาน": '4', "เจ้าหน้าที่เก็บรวบรวมข้อมูล": '5' };
  constructor(private tabletService: TabletService, private router: Router, private _location: Location) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  public csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");
    var str_result = "";
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    str_result = JSON.stringify(result); //JSON
    for (let char of str_result) {
      str_result = str_result.replace("\\r", "")
    }

    result = JSON.parse(str_result);

    return result;
  }
  uploadData(files) {
    this.value = 0;
    let file = files[0];
    let file_name = file.name;
    this.segmentDimmed = true;
    if (file_name.endsWith(".csv")) {
      this.processCSVData(file);
    } else if (file_name.endsWith(".xlsx")) {
      this.processxlsxData(file);
    } else {
      alert("File not support (Only .csv or .xlsx file)");
    }
  }
  generatePassword() {
    let randomstring = Math.random().toString(36).slice(-4);
    return randomstring;
  }
  processxlsxData(file) {
    let reader = new FileReader();
    let wb: XLSX.IWorkBook;
    let uploadComponent = this;

    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      wb = XLSX.read(reader.result, { type: 'binary' });
      var first_sheet_name = wb.SheetNames[0];
      var worksheet = wb.Sheets[first_sheet_name];
      uploadComponent.uploadCSVData(XLSX.utils.sheet_to_csv(worksheet));
    }
  }

  processCSVData(file) {
    let reader = new FileReader();
    let header;
    let data;
    let uploadComponent = this;
    reader.onload = function (e) {
      uploadComponent.uploadCSVData(reader.result);
    }
    reader.readAsText(file);
  }
  range(min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i < max; i += step) {
      input.push(i);
    }
    return input;
  }
  uploadCSVData(csv_data) {
    let tabletList = this.csvJSON(csv_data).filter( x => this.tabletService.validateData(x));
    let count = 0;
    this.maximum_progress = tabletList.length;
    console.log(tabletList.length)
    if (tabletList.length > 0) {
      for (let i in this.range(0, tabletList.length, 1)) {
        let update_status = this.tabletService.insertTablet(tabletList[i]);
        if (update_status) {
          update_status.then(result => {
            count++;
            console.log(parseInt(i + "") + 1);
            if (tabletList.length == parseInt(i + "") + 1) {
              if (count == tabletList.length) {
                this.modal_title = "การอัพโหลดข้อมูล Tablet สำเร็จ"
                this.modal_message = "เพิ่มข้อมูล Tablet ทั้งหมดเรียบร้อยแล้ว"
              }
              //else if (this.users.users.length > upload_users.length) {
              //             this.modal_title = "คำเตือน!!!"
              //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + (this.users.users.length - upload_users.length) + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
              //           } else if (count != 0) {
              //             this.modal_title = "คำเตือน!!!"
              //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + count + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
              //           }
            }else{
              this.modal_title = "คำเตือน!!!"
              this.modal_message = "มี Tablet ที่ยังไม่ถูกเพิ่มจำนวน " + (tabletList.length - count) + " แถว เนื่องจากข้อมูลไม่ถูกต้อง";
            }
            console.log(result);
          }).catch(err => console.log(err))
        }
      }
      //this.users.users = this.users.getFitValueUser(this.csvJSON(csv_data));
      // let upload_users = this.users.getFilteredUser(this.user.TID, this.user.CWT);
      // let count = 0;
      // this.maximum_progress = upload_users.length;
      //     let update_status = this.userservice.insertUser(upload_users[index])
      //     if (update_status) {
      //       update_status.then(result => {
      //         // count++;
      //         if (upload_users.length == index + 1) {
      //           if (this.users.users.length == upload_users.length) {
      //             this.modal_title = "การอัพโหลดข้อมูลผู้ใช้สำเร็จ"
      //             this.modal_message = "เพิ่มข้อมูลผู้ใช้ทั้งหมดเรียบร้อยแล้ว"
      //           } else if (this.users.users.length > upload_users.length) {
      //             this.modal_title = "คำเตือน!!!"
      //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + (this.users.users.length - upload_users.length) + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
      //           } else if (count != 0) {
      //             this.modal_title = "คำเตือน!!!"
      //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + count + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
      //           }
      //         }
      //       }).catch(err => {
      //         console.log(err);
      //         if (upload_users.length == index + 1) {
      //           if ((count === 0) && (this.users.users.length == upload_users.length)) {
      //             this.modal_title = "การอัพโหลดข้อมูลผู้ใช้สำเร็จ"
      //             this.modal_message = "เพิ่มข้อมูลผู้ใช้ทั้งหมดเรียบร้อยแล้ว"
      //           } else if (this.users.users.length > upload_users.length) {
      //             this.modal_title = "คำเตือน!!!"
      //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + (this.users.users.length - upload_users.length) + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
      //           } else if (count != 0) {
      //             this.modal_title = "คำเตือน!!!"
      //             this.modal_message = "มีผู้ใช้ที่ยังไม่ถูกเพิ่มจำนวน " + count + " คน เนื่องจากข้อมูลไม่ถูกต้อง";
      //           }
      //         }
      //       });
      //     }
      //   }
    } else {
      this.modal_title = "ข้อผิดพลาด!!!"
      this.modal_message = "ไม่สามารถเพิ่มข้อมูลได้เนื่องจากไม่มีข้อมูลที่ถูกต้อง";
    }
    this.segmentDimmed = false;
  }
  toJSON() {
    let json = []
    this.tablets
    json.push({
      'tablet_sn': 'รหัส Serial เครื่อง Tablet',
      'powerbank_sn': 'รหัส Serial เครื่อง Powerbank',
      'tablet_adapter': 'รหัส adapter tablet',
      'powerbank_adapter': 'รหัส adapter powerbank',
      'sim': 'หมายเลข sim',
      'user_id': 'รหัส user',
      'tid': 'รหัสสิทธิ์',
      'cwt': 'ชื่อจังหวัด'
    });
    json.push({
      'tablet_sn': 'HGAFPPW0',
      'powerbank_sn': 'xxxxxxxxxx',
      'tablet_adapter': 'xxxxxxxxxx',
      'powerbank_adapter': 'xxxxxxxxxx',
      'sim': '0999999999',
      'user_id': '1050001',
      'tid': '5',
      'cwt': 'กรุงเทพมหานคร'
    });
    return json;
  }

  exportToExcel() {
    let example_data = this.toJSON();
    const ws: EXLSX.WorkSheet = EXLSX.utils.json_to_sheet(example_data);
    const wb: EXLSX.WorkBook = EXLSX.utils.book_new();
    EXLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    EXLSX.writeFile(wb, 'ตัวอย่างข้อมูลผู้ใช้.xlsx');
  }
  backClicked() {
    this._location.back();
  }

}
