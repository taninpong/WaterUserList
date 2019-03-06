import { Component, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { NumberSymbol } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface area {
  name: string,
  complete: number,
  total: number,
  complete_ea: number,
  total_ea: number,
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input('area') area: area;

  width: string = '0%';
  color: string;
  progress: number;
  width_ea: string = '0%';
  color_ea: string;
  progress_ea: number;
  //Chart 
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'เขตพื้นที่';
  showYAxisLabel = false;
  yAxisLabel = 'ความก้าวหน้า';
  data: any;
  colorScheme;
  view: any[];
  constructor() { }

  ngOnInit() {
    this.calculateProgressbar();
    this.data = [
      {
        "name": 'ครัวเรือนที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress
      },{
        "name": 'เขตแจงนับที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress_ea
      }
      
    ];
    this.colorScheme = {
      domain: [this.color,this.color_ea]
    };
    this.view = [Math.max(this.progress * 4,this.progress_ea * 4), 60];
  }

  ngOnChanges() {
    this.calculateProgressbar();
    this.data = [
      {
        "name": 'ครัวเรือนที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress
      }, {
        "name": 'เขตแจงนับที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress_ea
      }
    ];
    this.colorScheme = {
      domain: [this.color,this.color_ea]
    };
    this.view = [Math.max(this.progress * 4,this.progress_ea * 4), 60];
  }

  calculateProgressbar(): void {
    this.progress = Math.floor((this.area.complete / this.area.total) * 100);
    this.width = String(this.progress) + '%';
    if (75 < this.progress) {
      this.color = '#33cc33' //green
    } else if (25 < this.progress) {
      this.color = '#ffe500' //yellow
    } else if (0 < this.progress) {
      this.color = '#ff5e5e' //red
    }
    
    this.progress_ea = Math.floor((this.area.complete_ea / this.area.total_ea) * 100);
    this.width_ea = String(this.progress_ea) + '%';
    if (75 < this.progress_ea) {
      this.color_ea = '#33cc33' //green
    } else if (25 < this.progress_ea) {
      this.color_ea = '#ffe500' //yellow
    } else if (0 < this.progress_ea) {
      this.color_ea = '#ff5e5e' //red
    }
  }
}
