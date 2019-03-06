import { SN1P3 } from "./SN1P3";

export class SN1P2 {
    status:number;
    A1: number;
    A2: string;
    A3: string;
    A4: string;
    A5: string;
    A6?: number;
    A7?: number;
    A8: string;
    A8_1?: string;
    A9: number;
    A10: number;
    H1_1: number;
    H1_2?: number;
    H1_3?: number;
    N: number;
    Ncount?:number;
    H1_4: number;
    N0?: number;
    N1?: number;
    A11?: string;
    H3?:SN1P3[];
    Create_DATE:Date;
    Create_DATE_Display:string;
    Modify_DATE:Array<Date>;
    Modify_DATE_Display:string;
    Duration_DATE_Display:string;
    current_page:string;
    version?:number;
    saveVersion?:number;
    /* 
    current_page:
        1 : sn1p1
        2 : sn1p2
        3 : sn1p3
        11: sn2_1P1 ครัวเรือนที่1
        21: sn2_1P1 ครัวเรือนที่2
        122:sn2_1P2ตอนที่2 ครัวเรือนที่1
    */
}