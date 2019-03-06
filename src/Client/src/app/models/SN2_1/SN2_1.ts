import { SN2_1P1 } from "./SN2_1P1";
import { SN2_1P2 } from "./SN2_1P2";
import { SN2_1P4 } from "./SN2_1P4";
import { SN2_1P3 } from "./SN2_1P3";
import { SN2_1P5 } from "./SN2_1P5";
import { SN2_1P6 } from "./SN2_1P6";

export class SN2_1 {
    A1?:SN2_1P1;
    A2?:SN2_1P2;
    A3?:SN2_1P3;
    A4?:SN2_1P4;
    A5?:SN2_1P5;
    A6?:SN2_1P6;
    status:number;
    status_approve:number;
    status_data:number;
    messeges:{
        date:Date;
        messege:string;
    }[];
}