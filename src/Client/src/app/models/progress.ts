import { User } from "./user";
import { Area } from "./area";

export class Progress {
    ea:Area;
    max_Building: number;
    max_Household: number;
    max_Agricultural_HH?: number;
    value_Building: number;
    value_Household: number;
    value_Agricultural_HH?: number;
    progresses?:Progress[];
}