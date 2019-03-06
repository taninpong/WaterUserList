import { Area } from './area';
export class Areas {
  areas: Area[];
  public reg: any[] = [];
  public cwt: any[] = [];
  public amp: any[] = [];
  public tam: any[] = [];
  public dis: any[] = [];
  public ea: any[] = [];

  getHiracyAreaData() {
    let tmp_reg: any[] = [];
    let tmp_cwt: any[] = [];
    let tmp_amp: any[] = [];
    let tmp_tam: any[] = [];
    let tmp_dis: any[] = [];
    let tmp_ea: any[] = [];

    for (let data of this.areas) {

      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME }), tmp_reg)) {
        tmp_reg.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME }));
        this.reg.push({ id: data.REG, name: data.REG_NAME, children: [] })
      }
      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME }), tmp_cwt)) {
        tmp_cwt.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME }));
        this.cwt.push({ id: data.REG + data.CWT, name: data.CWT_NAME, children: [] })
      }
      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME }), tmp_amp)) {
        tmp_amp.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME }));
        this.amp.push({ id: data.REG + data.CWT + data.AMP, name: data.AMP_NAME, children: [] })
      }
      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME }), tmp_tam)) {
        tmp_tam.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME }));
        this.tam.push({ id: data.REG + data.CWT + data.AMP + data.TAM, name: data.TAM_NAME, children: [] })
      }
      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME, DISTRICT: data.DISTRICT }), tmp_dis)) {
        tmp_dis.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME, DISTRICT: data.DISTRICT }));
        this.dis.push({ id: data.REG + data.CWT + data.AMP + data.TAM + data.DISTRICT, name: data.DISTRICT, children: [] })
      }
      if (!this.isInArray(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME, DISTRICT: data.DISTRICT, EA: data.EA }), tmp_ea)) {
        tmp_ea.push(JSON.stringify({ REG: data.REG, REG_NAME: data.REG_NAME, CWT: data.CWT, CWT_NAME: data.CWT_NAME, AMP: data.AMP, AMP_NAME: data.AMP_NAME, TAM: data.TAM, TAM_NAME: data.TAM_NAME, DISTRICT: data.DISTRICT, EA: data.EA }));
        this.ea.push({ id: data.REG + data.CWT + data.AMP + data.TAM + data.DISTRICT + data.EA, name: data.EA })
      }
    }
    for (let i in this.dis) {
      this.dis[i].children = this.ea.filter(e => e.id.slice(0, -3) === this.dis[i].id);
    }
    for (let i in this.tam) {
      this.tam[i].children = this.dis.filter(d => d.id.slice(0, -1) === this.tam[i].id);
    }
    for (let i in this.amp) {
      this.amp[i].children = this.tam.filter(t => t.id.slice(0, -2) === this.amp[i].id);
    }
    for (let i in this.cwt) {
      this.cwt[i].children = this.amp.filter(a => a.id.slice(0, -2) === this.cwt[i].id);
    }
    for (let i in this.reg) {
      this.reg[i].children = this.cwt.filter(cw => cw.id.slice(0, -2) === this.reg[i].id);
    }

    return this.reg;
  }

  getCWT() {
    let cwt: any = [];
    let tmp_cwt: any = [];
    for (let data of this.areas) {
      if (!this.isInArray(JSON.stringify({ id: data.CWT, name: data.CWT_NAME }), tmp_cwt)) {
        tmp_cwt.push(JSON.stringify({ id: data.CWT, name: data.CWT_NAME }));
        cwt.push({ id: data.CWT, name: data.CWT_NAME });
      }
    }
    return cwt;
  }

  filterAreasByREG(id) {
    return this.areas.filter(area => area.REG === id);
  }
  filterAreasByCWT(id) {
    return this.areas.filter(area => area.REG + area.CWT === id);
  }
  filterAreasByAMP(id) {
    return this.areas.filter(area => area.REG + area.CWT + area.AMP === id);
  }
  filterAreasByTAM(id) {
    return this.areas.filter(area => area.REG + area.CWT + area.AMP + area.TAM === id);
  }
  filterAreasByDISTRICT(id) {
    return this.areas.filter(area => area.REG + area.CWT + area.AMP + area.TAM + area.DISTRICT === id);
  }
  filterAreasByEA(id) {
    return this.areas.filter(area => area.REG + area.CWT + area.AMP + area.TAM + area.DISTRICT + area.EA === id);
  }

  filterAreasByFS(id) {
    let areasByFs = this.areas.filter(area => area.FS === id);
    return areasByFs;
  }

  filterAreasByFSandCWT(cwt,id) {
    let areasByFs ;
    if(id){
      areasByFs = this.areas.filter(area => area.CWT === cwt && area.FS === id);
    }else{
      areasByFs = this.areas.filter(area => area.CWT === cwt && (area.FS === null || area.FS === undefined));
    }
    return areasByFs;
  }

  filterAreasByFI(id) {
    let areasByFi = this.areas.filter(area => area.FI && area.FI.findIndex(fi => fi === id) !== -1);
    return areasByFi;
  }

  getIdCwtByName(cwt_name) {
    let result = this.areas.find(area => area.CWT_NAME === cwt_name);
    return result.CWT;
  };

  getAreasByAreaID(areaID) {
    return this.areas.filter(area => String(area.REG + area.CWT + area.AMP + area.TAM + area.DISTRICT + area.EA).slice(0, areaID.length) === areaID);
  }

  private isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
}
