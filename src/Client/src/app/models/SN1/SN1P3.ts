import { SN2_1 } from './../SN2_1/SN2_1';
import { WaterConsumeData } from '../WaterConsumeData';
export class SN1P3 {
    A1: number;
    H3:number;
    H4:string;
    H4_0:boolean;
    status:number;
    status_approve:number;
    H5_1:number;
    H5_2?:number;
    H5_3?:number;
    G1?:boolean;
    G2?:boolean;
    G3?:boolean;
    G4?:boolean;
    P1?: number;
    P2?: number;
    P3?: number;
    P4?: number;
    mergeTapWater?:boolean;
    mergeGroundWater?:boolean;
    A11?:string;
    SN2_1:SN2_1;
    WaterData:WaterConsumeData;
    messages?:{
        date:Date;
        message:string;
    }[];
    submit_date:Date;
    version?:number;
    saveVersion?:number;
}