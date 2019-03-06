import { SN1P1 } from "./SN1P1";
import { SN1P2 } from "./SN1P2";


export class SN1 {
    SN1_ID:string;
    create_time:Date;
    SN1P1:SN1P1;
    SN1P2:SN1P2[];
    status_approve:number;
    status_data:number;
    messeges:{
        date:Date;
        messege:string;
    }[];
    submit_date:Date;
} 