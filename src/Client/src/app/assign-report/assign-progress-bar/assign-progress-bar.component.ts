import { Component, OnInit, Input } from '@angular/core';

interface area {
  name: string,
  complete: number,
  total: number,
}

@Component({
  selector: 'app-assign-progress-bar',
  templateUrl: './assign-progress-bar.component.html',
  styleUrls: ['./assign-progress-bar.component.css']
})
export class AssignProgressBarComponent implements OnInit {
  @Input('area') area: area;

  width: string = '0%';
  color: string;
  progress: number;
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
        "name": 'เขตแจงนับที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress
      }
    ];
    this.colorScheme = {
      domain: [this.color]
    };
    this.view = [this.progress * 4, 50];
  }

  ngOnChanges() {
    this.calculateProgressbar();
    this.data = [
      {
        "name": 'เขตแจงนับที่เสร็จสิ้น (ร้อยละ)',
        "value": this.progress
      }
    ];
    this.colorScheme = {
      domain: [this.color]
    };
    this.view = [this.progress * 4, 50];
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
  }

}
