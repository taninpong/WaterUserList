import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Areas } from '../models/areas';
import { AreasService } from '../services/areas.service';
import * as XLSX from 'ts-xlsx';
import * as EXLSX from 'xlsx';
import { routes } from '../routes';
import {Location} from '@angular/common';
@Component({
  selector: 'app-upload-ea',
  templateUrl: './upload-ea.component.html',
  styleUrls: ['./upload-ea.component.css']
})
export class UploadEaComponent implements OnInit {

  segmentDimmed = false;
  modal_title = '';
  modal_message = '';
  areas: Areas = new Areas();
  maximum_progress;
  value = 0;
  
  constructor(private areasService: AreasService, private router: Router, private _location: Location) { }

  ngOnInit() {
    // this.areas.areas = JSON.parse(sessionStorage.getItem("areas"));
  }

  public csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    var str_result = "";
    for (let i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    str_result = JSON.stringify(result); //JSON
    for (let i = 1; i < lines.length; i++) {
      str_result = str_result.replace("\\r", "")
    }

    result = JSON.parse(str_result);
    return result;
  }

  insertData(data) {
    this.areas.areas.push(data);
    this.areasService.insertArea(data).then(result => { 
      console.log(result);
      this.value++;
    }).catch(err => { console.log(err) });
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
  backClicked() {
    this._location.back();
  }
  processxlsxData(file) {
    let reader = new FileReader();
    let wb: XLSX.IWorkBook;
    var uploadComponent = this;
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
  toJSON() {
    let json = []
    
    json.push({
      'REG': 'รหัสภาค',
      'REG_NAME': 'ชื่อภาค',
      'CWT': 'รหัสจังหวัด',
      'CWT_NAME': 'ชื่อจังหวัด',
      'AMP': 'รหัสอำเภอ',
      'AMP_NAME':'ชื่ออำเภอ',
      'TAM': 'รหัสตำบล',
      'TAM_NAME': 'ชื่อตำบล',
      'DISTRICT': 'เขตการปกครอง',
      'MUN': 'รหัสเทศบาล',
      'MUN_NAME': 'ชื่อเทศบาล',
      'TAO':'รหัส อบต.',
      'TAO_NAME': 'ชื่อ อบต.',
      'EA': 'รหัส EA',
      'VIL': 'รหัสหมู่บ้าน',
      'VIL_NAME': 'ชื่อหมู่บ้าน',
      'MAP_STATUS': 'แผนที่',
      'Building':'จำนวนบ้าน',
      'Household': 'จำนวนครัวเรือน',
      'Agricultural_HH': 'ครัวเรือนเกษตร',
      'ES_BUSI': 'จำนวนสถานประกอบการธุรกิจทางการค้าและธุรกิจทางการบริการ',
      'ES_INDUS': 'จำนวนสถานประกอบการอุสาหกรรมการผลิต',
      'ES_HOTEL': 'จำนวนโรงแรมและเกสต์เฮาส์',
      'ES_PV_HOS':'จำนวนโรงพยาบาลเอกชน',
      'REMARK':'หมายเหตุ'
    });
    json.push({
      'REG': '4',
      'REG_NAME': 'ตะวันออกเฉียงเหนือ',
      'CWT': '40',
      'CWT_NAME': 'ขอนแก่น',
      'AMP': '01',
      'AMP_NAME':'เมืองขอนแก่น',
      'TAM': '01',
      'TAM_NAME': 'ในเมือง',
      'DISTRICT': '1',
      'MUN': '099',
      'MUN_NAME': 'เทศบาลนครขอนแก่น',
      'TAO':'',
      'TAO_NAME': '',
      'EA': '001',
      'VIL': '',
      'VIL_NAME': '',
      'MAP_STATUS': '1',
      'Building':'121',
      'Household': '993',
      'Agricultural_HH': '0',
      'ES_BUSI': '',
      'ES_INDUS': '',
      'ES_HOTEL': '',
      'ES_PV_HOS':'',
      'REMARK':'หอพัก 9 แห่ง 1,080 ห้อง'
    });
    json.push({
      'REG': '4',
      'REG_NAME': 'ตะวันออกเฉียงเหนือ',
      'CWT': '40',
      'CWT_NAME': 'ขอนแก่น',
      'AMP': '01',
      'AMP_NAME':'เมืองขอนแก่น',
      'TAM': '04',
      'TAM_NAME': 'ท่าพระ',
      'DISTRICT': '2',
      'MUN': '',
      'MUN_NAME': '',
      'TAO':'003',
      'TAO_NAME': 'ท่าพระ',
      'EA': '001',
      'VIL': '04',
      'VIL_NAME': 'หนองใคร่นุ่น',
      'MAP_STATUS': '1',
      'Building':'218',
      'Household': '219',
      'Agricultural_HH': '169',
      'ES_BUSI': '',
      'ES_INDUS': '',
      'ES_HOTEL': '',
      'ES_PV_HOS':'',
      'REMARK':''
    });
    return json;
  }

  exportToExcel() {
    let example_data = this.toJSON();
    const ws: EXLSX.WorkSheet = EXLSX.utils.json_to_sheet(example_data);
    const wb: EXLSX.WorkBook = EXLSX.utils.book_new();
    EXLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    EXLSX.writeFile(wb, 'ตัวอย่างข้อมูลเขตแจงนับ.csv');
  }

  uploadCSVData(csv_data) {
    this.areas.areas = this.csvJSON(csv_data).filter(ea => ea.REG);
    this.areas.areas = this.areas.areas.filter(area => !isNaN(parseInt(area.REG)));
    this.maximum_progress = this.areas.areas.length;
    for (let area in this.areas.areas) {
      this.insertData(this.areas.areas[area]);
    }
    this.segmentDimmed = false;
  }

}
