import { Component, OnInit } from '@angular/core';
import { Area } from '../models/area';
import { AreasService } from '../services/areas.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-create-ea',
  templateUrl: './create-ea.component.html',
  styleUrls: ['./create-ea.component.css']
})
export class CreateEaComponent implements OnInit {

  ea: Area = new Area();
  constructor( private areaservice: AreasService, private router: Router, private _location: Location ) { }

  ngOnInit() {
   
  }
  saveData(){
    this.areaservice.insertArea(this.ea).then(result => {
      this.backClicked();
    }).catch(err => {console.log(err)});
  }
  backClicked(){
    this._location.back();
  }
}
