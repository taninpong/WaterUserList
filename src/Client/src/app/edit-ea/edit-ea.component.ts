import { Component, OnInit } from '@angular/core';
import { Area } from '../models/area';
import { AreasService } from '../services/areas.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-ea',
  templateUrl: './edit-ea.component.html',
  styleUrls: ['./edit-ea.component.css']
})
export class EditEaComponent implements OnInit {
  ea: Area;
  constructor( private areaservice: AreasService, private router: Router,private _location: Location) { }

  ngOnInit() {
    this.ea = JSON.parse(localStorage.getItem("edit_ea"));
  }
  saveData(){
    this.areaservice.updateArea(this.ea).then(result => {
      console.log(result);
      this.backClicked();
    }).catch(err => {console.log(err)});
  }
  backClicked(){
    this._location.back();
  }
}
