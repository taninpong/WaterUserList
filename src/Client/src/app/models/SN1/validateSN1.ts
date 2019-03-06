import { SN1 } from "./SN1";
import { SN1P2 } from "./sn1P2";
import { SN1P3 } from "./sn1P3";
import { SN2_1P2_1 } from "../SN2_1/SN2_1P2_1";
import { SN2_1P2_2 } from "../SN2_1/SN2_1P2_2";
import { SN2_1P2_3 } from "../SN2_1/SN2_1P2_3";
import { SN2_1P2_4 } from "../SN2_1/SN2_1P2_4";
import { SN2_1P2_5 } from "../SN2_1/SN2_1P2_5";
import { SN2_1P2_6 } from "../SN2_1/SN2_1P2_6";
import { SN2_1P2_7 } from "../SN2_1/SN2_1P2_7";
import { SN2_1P2_9_1 } from "../SN2_1/SN2_1P2_9_1";
import { Pool } from "../SN2_1/pool";
import { SN2_1P2_9_3 } from "../SN2_1/SN2_1P2_9_3";
import { SN2_1P2_9_4 } from "../SN2_1/SN2_1P2_9_4";
import { SN2_1P3 } from "../SN2_1/SN2_1P3";
import { SN2_1P4 } from "../SN2_1/SN2_1P4";
import { SN2_1P5_1 } from "../SN2_1/SN2_1P5_1";
import { SN2_1P5_2 } from "../SN2_1/SN2_1P5_2";
import { SN2_1P5_2_3 } from "../SN2_1/SN2_1P5_2_3";
import { Pump } from "../SN2_1/pump";
import { SN2_1P5_3 } from "../SN2_1/SN2_1P5_3";
import { SN2_1P5_4 } from "../SN2_1/SN2_1P5_4";
import { SN2_1P5_4_3 } from "../SN2_1/SN2_1P5_4_3";
import { SN2_1P5_4_4 } from "../SN2_1/SN2_1P5_4_4";
import { SN2_1P5_5 } from "../SN2_1/SN2_1P5_5";
import { SN2_1P5_6 } from "../SN2_1/SN2_1P5_6";
import { SN2_1P5_6_1 } from "../SN2_1/SN2_1P5_6_1";
import { SN2_1P5_7 } from "../SN2_1/SN2_1P5_7";
import { SN2_1P6 } from "../SN2_1/SN2_1P6";
import { SN2_2 } from "../SN2_2/SN2_2";
import { SN2_2P1_3 } from "../SN2_2/SN2_2P1_3";
import { SN2_2P1_5 } from "../SN2_2/SN2_2P1_5";
import { SN2_2P2_12 } from "../SN2_2/SN2_2P2";
import { SN2_1P5 } from "../SN2_1/SN2_1P5";

export class ValidateSN1 {
    SN1: SN1;
    SN2_2: SN2_2[];
    constructor() {
    }

    validate() {
        let sn1p2 = this.SN1.SN1P2;
        this.validateSN1P2(sn1p2);
        for (let p2 of sn1p2) {
            this.validateSN1P3(p2);
        }
    }

    validateSN1P2(sn1p2: SN1P2[]) {
        let results = [];
        for (let p2 of sn1p2) {
            let valid = [];
            if (p2.A1 == null)
                valid.push("A1");
            if (p2.A2 == null)
                valid.push("A2");
            if (p2.A3 == null)
                valid.push("A3");
            if (p2.A4 == null)
                valid.push("A4");
            if (p2.A5 == null)
                valid.push("A5");
            if (!(parseInt(p2.A8) > 0 && parseInt(p2.A8) < 17))
                valid.push("A8");
            if (!(p2.H1_1 > 0 && p2.H1_1 < 5))
                valid.push('H1_1');
            if (!((p2.H1_1 > 1 && p2.H1_1 < 4) && p2.H1_2 > 0 && p2.H1_2 < 5))
                valid.push('H1_2');
            if (!((p2.H1_1 > 1 && p2.H1_1 < 4) && (p2.H1_2 > 1 && p2.H1_2 < 4) && p2.H1_3 > 0 && p2.H1_3 < 5))
                valid.push('H1_3');
            if (!(p2.H1_1 == 4 && (p2.A9 >= 0 && p2.A9 <= 100)))
                valid.push("A9");
            if (!(p2.H1_1 == 4 && (p2.A10 >= 0 && p2.A10 <= 100)))
                valid.push("A10");
            if (!((p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1) && (p2.N > 0 && p2.N < 10000)))
                valid.push("N");
            if (!((p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1) && (parseInt(p2.A8) == 4 || parseInt(p2.A8) == 5) && typeof (p2.H1_4) == 'boolean'))
                valid.push("H1_4");
            if (!((p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1) && (parseInt(p2.A8) == 4 || parseInt(p2.A8) == 5) && (p2.N0 >= 0 && p2.N0 <= 9999)))
                valid.push("N0");
            if (!((p2.H1_1 == 1 || p2.H1_2 == 1 || p2.H1_3 == 1) && (parseInt(p2.A8) == 4 || parseInt(p2.A8) == 5) && (p2.N1 >= 0 && p2.N1 <= 9999)))
                valid.push("N1");
            results.push(valid);
        }
        return results;
    }

    validateSN1P3(p2: SN1P2) {
        let results = [];
        for (let p3 of p2.H3) {
            let sn21 = { H3: [], A1: [], A2: {}, A3: [], A4: [], A5: {}, A6: [] };
            let valid = [];
            if (!((p2.N > 1) && (p3.H5_1 > 0 && p3.H5_1 < 5)))
                valid.push('H5_1');
            if (!((p2.N > 1) && (p3.H5_1 > 1 && p3.H5_1 < 4) && p3.H5_2 > 0 && p3.H5_2 < 5))
                valid.push('H5_2');
            if (!((p2.N > 1) && (p3.H5_1 > 1 && p3.H5_1 < 4) && (p3.H5_2 > 1 && p3.H5_2 < 4) && p3.H5_3 > 0 && p3.H5_3 < 5))
                valid.push('H5_3');
            if (!((p2.N > 1) && typeof (p3.P1) == 'boolean'))
                valid.push('P1');
            if (!((p2.N > 1) && typeof (p3.P2) == 'boolean'))
                valid.push('P2');
            if (!((p2.N > 1) && typeof (p3.P3) == 'boolean'))
                valid.push('P3');
            if (!((p2.N > 1) && typeof (p3.P4) == 'boolean'))
                valid.push('P4');
            if (typeof (p3.G1) == 'boolean')
                valid.push('G1');
            if (typeof (p3.G2) == 'boolean')
                valid.push('G2');
            if (typeof (p3.G3) == 'boolean')
                valid.push('G3');
            if (typeof (p3.G4) == 'boolean')
                valid.push('G4');
            sn21.H3 = valid;
            sn21.A1 = p3.G1 ? this.validateSN21A1(p3) : [];
            sn21.A2 = p3.G2 ? this.validateSN21A2(p3) : {};
            sn21.A3 = p3.G3 ? this.validateSN21P3(p3.SN2_1.A3) : [];
            sn21.A4 = p3.G4 ? this.validateSN21P4(p3.SN2_1.A4) : [];
            sn21.A5 = p3.G1 ? this.validateSN21P5(p3.SN2_1.A5) : {};
            sn21.A6 = p3.G1 ? this.validateSN2_1P6(p3.SN2_1.A6) : [];
        }
        return results
    }
    //SN21P1
    validateSN21A1(p3: SN1P3) {
        let result = [];
        if (p3.G1) {
            if (!(p3.SN2_1.A1.A1_1 != null)) {
                result.push('A1_1');
            }
            if (!(p3.SN2_1.A1.A1_2_1 >= 0 && p3.SN2_1.A1.A1_2_1 <= 20 && p3.SN2_1.A1.A1_2_1 == (p3.SN2_1.A1.A1_2_2 + p3.SN2_1.A1.A1_2_3))) {
                result.push('A1_2_1');
            }
            if (!(p3.SN2_1.A1.A1_2_2 >= 0 && p3.SN2_1.A1.A1_2_2 <= 20)) {
                result.push('A1_2_2');
            }
            if (!(p3.SN2_1.A1.A1_2_3 >= 0 && p3.SN2_1.A1.A1_2_3 <= 20)) {
                result.push('A1_2_3');
            }
            if (!(p3.SN2_1.A1.A1_2_4 >= 0 && p3.SN2_1.A1.A1_2_4 <= 20 && p3.SN2_1.A1.A1_2_4 == (p3.SN2_1.A1.A1_2_5 + p3.SN2_1.A1.A1_2_6))) {
                result.push('A1_2_4');
            }
            if (!(p3.SN2_1.A1.A1_2_5 >= 0 && p3.SN2_1.A1.A1_2_5 <= 20)) {
                result.push('A1_2_5');
            }
            if (!(p3.SN2_1.A1.A1_2_6 >= 0 && p3.SN2_1.A1.A1_2_6 <= 20)) {
                result.push('A1_2_6');
            }
            if (!(p3.SN2_1.A1.A1_2_7 >= 0 && p3.SN2_1.A1.A1_2_7 <= 20 && p3.SN2_1.A1.A1_2_7 == (p3.SN2_1.A1.A1_2_8 + p3.SN2_1.A1.A1_2_9))) {
                result.push('A1_2_7');
            }
            if (!(p3.SN2_1.A1.A1_2_8 >= 0 && p3.SN2_1.A1.A1_2_8 <= 20)) {
                result.push('A1_2_8');
            }
            if (!(p3.SN2_1.A1.A1_2_9 >= 0 && p3.SN2_1.A1.A1_2_9 <= 20)) {
                result.push('A1_2_9');
            }
        }
        return result;
    }
    //SN21P2
    validateSN21A2(p3: SN1P3) {

        let result21P2 = {
            A2: [],
            A2_E1: [],
            A2_E2: [],
            A2_E3: [],
            A2_E4: [],
            A2_E5: [],
            A2_E6: [],
            A2_E7: [],
            A2_E9_1_1_1: {},
            A2_E9_1_1_2: {},
            A2_E9_1_1_3: {},
            A2_E9_1_1_4: {},
            A2_E9_1_1_5: {},
            A2_E9_1_1_6: {},
            A2_E9_1_1_7: {},
            A2_E9_1_1_8: {},
            A2_E9_1_1_9: {},
        }
        let result = [];
        if (p3.G2) {
            if (typeof (p3.SN2_1.A2.A2_E1_1) == 'boolean')
                result.push('A2_E1_1');
            if (p3.SN2_1.A2.A2_E1_1 && (p3.SN2_1.A2.A2_E1_2 >= 1 && p3.SN2_1.A2.A2_E1_2 <= 20))
                result.push('A2_E1_2');
            if (typeof (p3.SN2_1.A2.A2_E2_1) == 'boolean')
                result.push('A2_E2_1');
            if (p3.SN2_1.A2.A2_E2_1 && (p3.SN2_1.A2.A2_E2_2 >= 1 && p3.SN2_1.A2.A2_E2_2 <= 20))
                result.push('A2_E2_2');
            if (typeof (p3.SN2_1.A2.A2_E3_1) == 'boolean')
                result.push('A2_E3_1');
            if (p3.SN2_1.A2.A2_E3_1 && (p3.SN2_1.A2.A2_E3_2 >= 1 && p3.SN2_1.A2.A2_E3_2 <= 20))
                result.push('A2_E3_2');
            if (typeof (p3.SN2_1.A2.A2_E4_1) == 'boolean')
                result.push('A2_E4_1');
            if (p3.SN2_1.A2.A2_E4_1 && (p3.SN2_1.A2.A2_E4_2 >= 1 && p3.SN2_1.A2.A2_E4_2 <= 20))
                result.push('A2_E4_2');
            if (typeof (p3.SN2_1.A2.A2_E5_1) == 'boolean')
                result.push('A2_E5_1');
            if (p3.SN2_1.A2.A2_E5_1 && (p3.SN2_1.A2.A2_E5_2 >= 1 && p3.SN2_1.A2.A2_E5_2 <= 20))
                result.push('A2_E5_2');
            if (typeof (p3.SN2_1.A2.A2_E5_1) == 'boolean')
                result.push('A2_E6_1');
            if (p3.SN2_1.A2.A2_E6_1 && (p3.SN2_1.A2.A2_E6_2 >= 1 && p3.SN2_1.A2.A2_E6_2 <= 20))
                result.push('A2_E6_2');
            if (typeof (p3.SN2_1.A2.A2_E7_1) == 'boolean')
                result.push('A2_E7_1');
            if (p3.SN2_1.A2.A2_E7_1 && (p3.SN2_1.A2.A2_E7_2 >= 1 && p3.SN2_1.A2.A2_E7_2 <= 20))
                result.push('A2_E7_2');
            if (typeof (p3.SN2_1.A2.A2_E8_1) == 'boolean')
                result.push('A2_E8_1');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_1_0) == 'boolean')
                result.push('A2_E8_2_1_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_1 >= 1 && p3.SN2_1.A2.A2_E8_2_1 <= 9999))
                result.push('A2_E8_2_1');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_2_0) == 'boolean')
                result.push('A2_E8_2_2_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_2 >= 1 && p3.SN2_1.A2.A2_E8_2_2 <= 9999))
                result.push('A2_E8_2_2');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_3_0) == 'boolean')
                result.push('A2_E8_2_3_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_3 >= 1 && p3.SN2_1.A2.A2_E8_2_3 <= 9999))
                result.push('A2_E8_2_3');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_4_0) == 'boolean')
                result.push('A2_E8_2_4_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_4 >= 1 && p3.SN2_1.A2.A2_E8_2_4 <= 9999))
                result.push('A2_E8_2_4');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_5_0) == 'boolean')
                result.push('A2_E8_2_5_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_5 >= 1 && p3.SN2_1.A2.A2_E8_2_5 <= 9999))
                result.push('A2_E8_2_5');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_6_0) == 'boolean')
                result.push('A2_E8_2_6_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_6 >= 1 && p3.SN2_1.A2.A2_E8_2_6 <= 9999))
                result.push('A2_E8_2_6');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_7_0) == 'boolean')
                result.push('A2_E8_2_7_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_7 >= 1 && p3.SN2_1.A2.A2_E8_2_7 <= 9999))
                result.push('A2_E8_2_7');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_8_0) == 'boolean')
                result.push('A2_E8_2_8_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_8 >= 1 && p3.SN2_1.A2.A2_E8_2_8 <= 9999))
                result.push('A2_E8_2_8');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_9_0) == 'boolean')
                result.push('A2_E8_2_9_0');
            if (p3.SN2_1.A2.A2_E8_1 && (p3.SN2_1.A2.A2_E8_2_9 >= 1 && p3.SN2_1.A2.A2_E8_2_9 <= 9999))
                result.push('A2_E8_2_9');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_2_10_0) == 'boolean')
                result.push('A2_E8_2_10_0');
            if (p3.SN2_1.A2.A2_E8_1 && p3.SN2_1.A2.A2_E8_2_10_1 != null)
                result.push('A2_E8_2_10_1');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_1) == 'boolean')
                result.push('A2_E8_3_1');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_2) == 'boolean')
                result.push('A2_E8_3_2');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_3) == 'boolean')
                result.push('A2_E8_3_3');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_4) == 'boolean')
                result.push('A2_E8_3_4');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_5) == 'boolean')
                result.push('A2_E8_3_5');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_6) == 'boolean')
                result.push('A2_E8_3_6');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_7) == 'boolean')
                result.push('A2_E8_3_7');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_8) == 'boolean')
                result.push('A2_E8_3_8');
            if (p3.SN2_1.A2.A2_E8_1 && typeof (p3.SN2_1.A2.A2_E8_3_9) == 'boolean')
                result.push('A2_E8_3_9');
            if (p3.SN2_1.A2.A2_E8_1 && p3.SN2_1.A2.A2_E8_3_9 && p3.SN2_1.A2.A2_E8_3_9_1 != null)
                result.push('A2_E8_3_9_1');
            if (!(typeof (p3.SN2_1.A2.A2_E9_1) == 'boolean'))
                result.push('A2_E9_1');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_1) == 'boolean')
                result.push('A2_E9_1_1');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_2) == 'boolean')
                result.push('A2_E9_1_2');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_3) == 'boolean')
                result.push('A2_E9_1_3');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_4) == 'boolean')
                result.push('A2_E9_1_4');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_5) == 'boolean')
                result.push('A2_E9_1_5');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_6) == 'boolean')
                result.push('A2_E9_1_6');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_7) == 'boolean')
                result.push('A2_E9_1_7');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_8) == 'boolean')
                result.push('A2_E9_1_8');
            if (p3.SN2_1.A2.A2_E9_1 && typeof (p3.SN2_1.A2.A2_E9_1_9) == 'boolean')
                result.push('A2_E9_1_9');

            result21P2.A2 = result;
            result21P2.A2_E1 = p3.SN2_1.A2.A2_E1_1 ? this.validateRice(p3.SN2_1.A2.A2_E1) : [];
            result21P2.A2_E2 = p3.SN2_1.A2.A2_E2_1 ? this.validateRai(p3.SN2_1.A2.A2_E2) : [];
            result21P2.A2_E3 = p3.SN2_1.A2.A2_E3_1 ? this.validateYang(p3.SN2_1.A2.A2_E3) : [];
            result21P2.A2_E4 = p3.SN2_1.A2.A2_E4_1 ? this.validateTon(p3.SN2_1.A2.A2_E4) : [];
            result21P2.A2_E5 = p3.SN2_1.A2.A2_E5_1 ? this.validateVet(p3.SN2_1.A2.A2_E5) : [];
            result21P2.A2_E6 = p3.SN2_1.A2.A2_E6_1 ? this.validatePad(p3.SN2_1.A2.A2_E6) : [];
            result21P2.A2_E7 = p3.SN2_1.A2.A2_E7_1 ? this.validateMush(p3.SN2_1.A2.A2_E7) : [];
            result21P2.A2_E9_1_1_1 = p3.SN2_1.A2.A2_E9_1_1 ? this.validateFish(p3.SN2_1.A2.A2_E9_1_1_1) : [];
            result21P2.A2_E9_1_1_2 = p3.SN2_1.A2.A2_E9_1_2 ? this.validateFish(p3.SN2_1.A2.A2_E9_1_1_2) : [];
            result21P2.A2_E9_1_1_3 = p3.SN2_1.A2.A2_E9_1_3 ? this.validateKob(p3.SN2_1.A2.A2_E9_1_1_3) : [];
            result21P2.A2_E9_1_1_4 = p3.SN2_1.A2.A2_E9_1_4 ? this.validateCroc(p3.SN2_1.A2.A2_E9_1_1_4) : [];
            result21P2.A2_E9_1_1_5 = p3.SN2_1.A2.A2_E9_1_5 ? this.validateCroc(p3.SN2_1.A2.A2_E9_1_1_5) : [];
            result21P2.A2_E9_1_1_6 = p3.SN2_1.A2.A2_E9_1_6 ? this.validateFish(p3.SN2_1.A2.A2_E9_1_1_6) : [];
            result21P2.A2_E9_1_1_7 = p3.SN2_1.A2.A2_E9_1_7 ? this.validateFish(p3.SN2_1.A2.A2_E9_1_1_7) : [];
            result21P2.A2_E9_1_1_8 = p3.SN2_1.A2.A2_E9_1_8 ? this.validateCroc(p3.SN2_1.A2.A2_E9_1_1_8) : [];
            result21P2.A2_E9_1_1_9 = p3.SN2_1.A2.A2_E9_1_9 ? this.validateFish(p3.SN2_1.A2.A2_E9_1_1_9) : [];
        }
        return result21P2;
    }

    //rice
    validateRice(rices: SN2_1P2_1[]) {
        let result = [];
        for (let rice of rices) {
            let valid = [];
            if (!(rice.A2_E1_2_1_CWT != null))
                valid.push('A2_E1_2_1_CWT');
            if (!(rice.A2_E1_2_1_AMP != null))
                valid.push('A2_E1_2_1_AMP');
            if (!(rice.A2_E1_2_1_TMB != null))
                valid.push('A2_E1_2_1_TMB');
            if (!(rice.A2_E1_2_2_1 >= 0 && rice.A2_E1_2_2_1 <= 100))
                valid.push('A2_E1_2_2_1');
            if (!(rice.A2_E1_2_2_2 >= 0 && rice.A2_E1_2_2_2 <= 3))
                valid.push('A2_E1_2_2_2');
            if (!(rice.A2_E1_2_2_3 >= 0 && rice.A2_E1_2_2_3 <= 99))
                valid.push('A2_E1_2_2_3');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_3 <= 4))
                valid.push('A2_E1_2_3');
            if (!(rice.A2_E1_2_4 >= 1 && rice.A2_E1_2_4 <= 3))
                valid.push('A2_E1_2_4');
            if (!(rice.A2_E1_2_4 == 2 && rice.A2_E1_2_4_2_1 >= 0 && rice.A2_E1_2_4_2_1 <= rice.A2_E1_2_2_1))
                valid.push('A2_E1_2_4_2_1');
            if (!(rice.A2_E1_2_4 == 2 && rice.A2_E1_2_4_2_2 >= 0 && ((rice.A2_E1_2_4_2_1 <= rice.A2_E1_2_2_1 && (rice.A2_E1_2_4_2_2 <= 3)) || (rice.A2_E1_2_4_2_1 == 0 && rice.A2_E1_2_4_2_2 <= rice.A2_E1_2_2_2))))
                valid.push('A2_E1_2_4_2_2');
            if (!(rice.A2_E1_2_4 == 2 && rice.A2_E1_2_4_2_3 >= 0 && ((rice.A2_E1_2_4_2_1 <= rice.A2_E1_2_2_1 || rice.A2_E1_2_4_2_2 <= rice.A2_E1_2_2_2 && rice.A2_E1_2_4_2_3 <= 99) || (rice.A2_E1_2_4_2_1 == 0 && rice.A2_E1_2_4_2_2 == 0 && rice.A2_E1_2_4_2_3 <= rice.A2_E1_2_2_3))))
                valid.push('A2_E1_2_4_2_3');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_1_1 >= 0 && rice.A2_E1_2_4_3_1_1 <= rice.A2_E1_2_2_1))
                valid.push('A2_E1_2_4_3_1_1');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_1_2 >= 0 && ((rice.A2_E1_2_4_3_1_1 <= rice.A2_E1_2_2_1 && rice.A2_E1_2_4_3_1_2 <= 3) || (rice.A2_E1_2_4_3_1_1 == 0 && rice.A2_E1_2_4_3_1_2 <= rice.A2_E1_2_2_2))))
                valid.push('A2_E1_2_4_3_1_2');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_1_3 >= 0 && ((rice.A2_E1_2_4_3_1_1 <= rice.A2_E1_2_2_1 || rice.A2_E1_2_4_3_1_2 <= rice.A2_E1_2_2_2 && rice.A2_E1_2_4_3_1_3 <= 99) || (rice.A2_E1_2_4_3_1_1 == 0 && rice.A2_E1_2_4_3_1_2 == 0 && rice.A2_E1_2_4_3_1_3 <= rice.A2_E1_2_2_3))))
                valid.push('A2_E1_2_4_3_1_3');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_2_1 >= 0 && rice.A2_E1_2_4_3_2_1 <= rice.A2_E1_2_2_1))
                valid.push('A2_E1_2_4_3_2_1');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_2_2 >= 0 && ((rice.A2_E1_2_4_3_2_1 <= rice.A2_E1_2_2_1 && rice.A2_E1_2_4_3_2_2 <= 3) || (rice.A2_E1_2_4_3_2_1 == 0 && rice.A2_E1_2_4_3_2_2 <= rice.A2_E1_2_2_2))))
                valid.push('A2_E1_2_4_3_2_2');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_2_3 >= 0 && ((rice.A2_E1_2_4_3_2_1 <= rice.A2_E1_2_2_1 || rice.A2_E1_2_4_3_2_2 <= rice.A2_E1_2_2_2 && rice.A2_E1_2_4_3_2_3 <= 99) || (rice.A2_E1_2_4_3_2_1 == 0 && rice.A2_E1_2_4_3_2_2 == 0 && rice.A2_E1_2_4_3_2_3 <= rice.A2_E1_2_2_3))))
                valid.push('A2_E1_2_4_3_2_3');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_3_1 >= 0 && rice.A2_E1_2_4_3_3_1 <= rice.A2_E1_2_2_1))
                valid.push('A2_E1_2_4_3_3_1');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_3_2 >= 0 && ((rice.A2_E1_2_4_3_3_1 <= rice.A2_E1_2_2_1 && rice.A2_E1_2_4_3_3_2 <= 3) || (rice.A2_E1_2_4_3_3_1 == 0 && rice.A2_E1_2_4_3_3_2 <= rice.A2_E1_2_2_2))))
                valid.push('A2_E1_2_4_3_3_2');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_3_3 >= 0 && ((rice.A2_E1_2_4_3_3_1 <= rice.A2_E1_2_2_1 || rice.A2_E1_2_4_3_3_2 <= rice.A2_E1_2_2_2 && rice.A2_E1_2_4_3_3_3 <= 99) || (rice.A2_E1_2_4_3_3_1 == 0 && rice.A2_E1_2_4_3_3_2 == 0 && rice.A2_E1_2_4_3_3_3 <= rice.A2_E1_2_2_3))))
                valid.push('A2_E1_2_4_3_3_3');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_4_1 >= 0 && rice.A2_E1_2_4_3_4_1 <= rice.A2_E1_2_2_1))
                valid.push('A2_E1_2_4_3_4_1');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_4_2 >= 0 && ((rice.A2_E1_2_4_3_4_1 <= rice.A2_E1_2_2_1 && rice.A2_E1_2_4_3_4_2 <= 3) || (rice.A2_E1_2_4_3_4_1 == 0 && rice.A2_E1_2_4_3_4_2 <= rice.A2_E1_2_2_2))))
                valid.push('A2_E1_2_4_3_4_2');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_4 == 4 && rice.A2_E1_2_4_3_4_3 >= 0 && ((rice.A2_E1_2_4_3_4_1 <= rice.A2_E1_2_2_1 || rice.A2_E1_2_4_3_4_2 <= rice.A2_E1_2_2_2 && rice.A2_E1_2_4_3_4_3 <= 99) || (rice.A2_E1_2_4_3_4_1 == 0 && rice.A2_E1_2_4_3_4_2 == 0 && rice.A2_E1_2_4_3_4_3 <= rice.A2_E1_2_2_3))))
                valid.push('A2_E1_2_4_3_4_3');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_5_1_1 >= 1 && rice.A2_E1_2_5_1_1 <= 12))
                valid.push('A2_E1_2_5_1_1');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_5_1_2 >= 1 && rice.A2_E1_2_5_1_2 <= 12))
                valid.push('A2_E1_2_5_1_2');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_6_1 >= 1 && rice.A2_E1_2_6_1 <= 100))
                valid.push('A2_E1_2_6_1');
            if (!(rice.A2_E1_2_3 >= 1 && rice.A2_E1_2_7_1 >= 1 && rice.A2_E1_2_7_1 <= 60))
                valid.push('A2_E1_2_7_1');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_5_2_1 >= 1 && rice.A2_E1_2_5_2_1 <= 12))
                valid.push('A2_E1_2_5_2_1');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_5_2_2 >= 1 && rice.A2_E1_2_5_2_2 <= 12))
                valid.push('A2_E1_2_5_2_2');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_6_2 >= 1 && rice.A2_E1_2_6_2 <= 100))
                valid.push('A2_E1_2_6_2');
            if (!(rice.A2_E1_2_3 >= 2 && rice.A2_E1_2_7_2 >= 1 && rice.A2_E1_2_7_2 <= 60))
                valid.push('A2_E1_2_7_2');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_5_3_1 >= 1 && rice.A2_E1_2_5_3_1 <= 12))
                valid.push('A2_E1_2_5_3_1');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_5_3_2 >= 1 && rice.A2_E1_2_5_3_2 <= 12))
                valid.push('A2_E1_2_5_3_2');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_6_3 >= 1 && rice.A2_E1_2_6_3 <= 100))
                valid.push('A2_E1_2_6_3');
            if (!(rice.A2_E1_2_3 >= 3 && rice.A2_E1_2_7_3 >= 1 && rice.A2_E1_2_7_3 <= 60))
                valid.push('A2_E1_2_7_3');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_5_4_1 >= 1 && rice.A2_E1_2_5_4_1 <= 12))
                valid.push('A2_E1_2_5_4_1');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_5_4_2 >= 1 && rice.A2_E1_2_5_4_2 <= 12))
                valid.push('A2_E1_2_5_4_2');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_6_4 >= 1 && rice.A2_E1_2_6_4 <= 100))
                valid.push('A2_E1_2_6_4');
            if (!(rice.A2_E1_2_3 >= 4 && rice.A2_E1_2_7_4 >= 1 && rice.A2_E1_2_7_4 <= 60))
                valid.push('A2_E1_2_7_4');
            if (!(typeof (rice.A2_E1_2_8) == 'boolean'))
                valid.push('A2_E1_2_8');
            if (!(typeof (rice.A2_E1_2_9_1) == 'boolean'))
                valid.push('A2_E1_2_9_1');
            if (!(typeof (rice.A2_E1_2_9_2) == 'boolean'))
                valid.push('A2_E1_2_9_2');
            if (!(typeof (rice.A2_E1_2_9_3) == 'boolean'))
                valid.push('A2_E1_2_9_3');
            if (!(typeof (rice.A2_E1_2_9_4) == 'boolean'))
                valid.push('A2_E1_2_9_4');
            if (!(typeof (rice.A2_E1_2_9_5) == 'boolean'))
                valid.push('A2_E1_2_9_5');
            if (!(typeof (rice.A2_E1_2_9_6) == 'boolean'))
                valid.push('A2_E1_2_9_6');
            if (!(typeof (rice.A2_E1_2_9_7) == 'boolean'))
                valid.push('A2_E1_2_9_7');
            if (!(typeof (rice.A2_E1_2_9_8) == 'boolean'))
                valid.push('A2_E1_2_9_8');
            if (!(rice.A2_E1_2_9_8 && rice.A2_E1_2_9_8_1 != null))
                valid.push('A2_E1_2_9_8_1');
            result.push(valid);
        }
        return result;
    }

    //rai
    validateRai(rais: SN2_1P2_2[]) {
        let result = [];
        for (let rai of rais) {
            let valid = [];
            if (!(rai.A2_E2_2_1_CWT != null))
                valid.push('A2_E2_2_1_CWT');
            if (!(rai.A2_E2_2_1_AMP != null))
                valid.push('A2_E2_2_1_AMP');
            if (!(rai.A2_E2_2_1_TMB != null))
                valid.push('A2_E2_2_1_TMB');
            if (!(rai.A2_E2_2_2_1 >= 0 && rai.A2_E2_2_2_1 <= 100))
                valid.push('A2_E2_2_2_1');
            if (!(rai.A2_E2_2_2_2 >= 0 && rai.A2_E2_2_2_2 <= 3))
                valid.push('A2_E2_2_2_2');
            if (!(rai.A2_E2_2_2_3 >= 0 && rai.A2_E2_2_2_3 <= 99))
                valid.push('A2_E2_2_2_3');
            if (!(typeof (rai.A2_E2_2_3) == 'boolean'))
                valid.push('A2_E2_2_3');
            if (!(rai.A2_E2_2_4.length > 0 && rai.A2_E2_2_4.length < 6))
                valid.push('A2_E2_2_4');
            if (!(typeof (rai.A2_E2_2_5_1) == 'boolean'))
                valid.push('A2_E2_2_5_1');
            if (!(typeof (rai.A2_E2_2_5_2) == 'boolean'))
                valid.push('A2_E2_2_5_2');
            if (!(typeof (rai.A2_E2_2_5_3) == 'boolean'))
                valid.push('A2_E1_2_9_3');
            if (!(typeof (rai.A2_E2_2_5_4) == 'boolean'))
                valid.push('A2_E1_2_9_4');
            if (!(typeof (rai.A2_E2_2_5_5) == 'boolean'))
                valid.push('A2_E2_2_5_5');
            if (!(typeof (rai.A2_E2_2_5_6) == 'boolean'))
                valid.push('A2_E2_2_5_6');
            if (!(typeof (rai.A2_E2_2_5_7) == 'boolean'))
                valid.push('A2_E2_2_5_7');
            if (!(typeof (rai.A2_E2_2_5_8) == 'boolean'))
                valid.push('A2_E2_2_5_8');
            if (!(typeof (rai.A2_E2_2_5_9) == 'boolean'))
                valid.push('A2_E2_2_5_9');
            if (!(rai.A2_E2_2_5_9 && rai.A2_E2_2_5_9_1 != null))
                valid.push('A2_E2_2_5_9_1');
            result.push(valid);
        }
        return result;
    }

    //yang
    validateYang(yangs: SN2_1P2_3[]) {
        let result = [];
        for (let yang of yangs) {
            let valid = [];
            if (!(yang.A2_E3_2_1_CWT != null))
                valid.push('A2_E3_2_1_CWT');
            if (!(yang.A2_E3_2_1_AMP != null))
                valid.push('A2_E3_2_1_AMP');
            if (!(yang.A2_E3_2_1_TMB != null))
                valid.push('A2_E3_2_1_TMB');
            if (!(yang.A2_E3_2_2_1 >= 0 && yang.A2_E3_2_2_1 <= 100))
                valid.push('A2_E3_2_2_1');
            if (!(yang.A2_E3_2_2_2 >= 0 && yang.A2_E3_2_2_2 <= 3))
                valid.push('A2_E3_2_2_2');
            if (!(yang.A2_E3_2_2_3 >= 0 && yang.A2_E3_2_2_3 <= 99))
                valid.push('A2_E3_2_2_3');
            if (!(typeof (yang.A2_E3_2_3) == 'boolean'))
                valid.push('A2_E3_2_3');
            if (!(typeof (yang.A2_E3_2_4_1) == 'boolean'))
                valid.push('A2_E3_2_4_1');
            if (!(typeof (yang.A2_E3_2_4_2) == 'boolean'))
                valid.push('A2_E3_2_4_2');
            if (!(typeof (yang.A2_E3_2_4_3) == 'boolean'))
                valid.push('A2_E3_2_4_3');
            if (!(typeof (yang.A2_E3_2_4_4) == 'boolean'))
                valid.push('A2_E3_2_4_4');
            if (!(typeof (yang.A2_E3_2_4_5) == 'boolean'))
                valid.push('A2_E3_2_4_5');
            if (!(typeof (yang.A2_E3_2_4_6) == 'boolean'))
                valid.push('A2_E3_2_4_6');
            if (!(typeof (yang.A2_E3_2_4_7) == 'boolean'))
                valid.push('A2_E3_2_4_7');
            if (!(typeof (yang.A2_E3_2_4_8) == 'boolean'))
                valid.push('A2_E3_2_4_8');
            if (!(typeof (yang.A2_E3_2_4_9) == 'boolean'))
                valid.push('A2_E3_2_4_9');
            if (!(yang.A2_E3_2_4_9 && yang.A2_E3_2_4_9_1 != null))
                valid.push('A2_E3_2_4_9_1');
            result.push(valid);
        }
        return result;
    }

    //Ton
    validateTon(tons: SN2_1P2_4[]) {
        let result = [];
        for (let ton of tons) {
            let valid = [];
            if (!(ton.A2_E4_2_1_CWT != null))
                valid.push('A2_E4_2_1_CWT');
            if (!(ton.A2_E4_2_1_AMP != null))
                valid.push('A2_E4_2_1_AMP');
            if (!(ton.A2_E4_2_1_TMB != null))
                valid.push('A2_E4_2_1_TMB');
            if (!(ton.A2_E4_2_2_1 >= 0 && ton.A2_E4_2_2_1 <= 100))
                valid.push('A2_E4_2_2_1');
            if (!(ton.A2_E4_2_2_2 >= 0 && ton.A2_E4_2_2_2 <= 3))
                valid.push('A2_E4_2_2_2');
            if (!(ton.A2_E4_2_2_3 >= 0 && ton.A2_E4_2_2_3 <= 99))
                valid.push('A2_E4_2_2_3');
            if (!(typeof (ton.A2_E4_2_3) == 'boolean'))
                valid.push('A2_E4_2_3');
            if (!(ton.A2_E4_2_4.length > 0 && ton.A2_E4_2_4.length < 6))
                valid.push('A2_E4_2_4');
            if (!(typeof (ton.A2_E4_2_5_1) == 'boolean'))
                valid.push('A2_E4_2_5_1');
            if (!(typeof (ton.A2_E4_2_5_2) == 'boolean'))
                valid.push('A2_E4_2_5_2');
            if (!(typeof (ton.A2_E4_2_5_3) == 'boolean'))
                valid.push('A2_E4_2_9_3');
            if (!(typeof (ton.A2_E4_2_5_4) == 'boolean'))
                valid.push('A2_E4_2_9_4');
            if (!(typeof (ton.A2_E4_2_5_5) == 'boolean'))
                valid.push('A2_E4_2_5_5');
            if (!(typeof (ton.A2_E4_2_5_6) == 'boolean'))
                valid.push('A2_E4_2_5_6');
            if (!(typeof (ton.A2_E4_2_5_7) == 'boolean'))
                valid.push('A2_E4_2_5_7');
            if (!(typeof (ton.A2_E4_2_5_8) == 'boolean'))
                valid.push('A2_E4_2_5_8');
            if (!(typeof (ton.A2_E4_2_5_9) == 'boolean'))
                valid.push('A2_E4_2_5_9');
            if (!(ton.A2_E4_2_5_9 && ton.A2_E4_2_5_9_1 != null))
                valid.push('A2_E4_2_5_9_1');
            result.push(valid);
        }
        return result;
    }

    //Vet
    validateVet(vets: SN2_1P2_5[]) {
        let result = [];
        for (let vet of vets) {
            let valid = [];
            if (!(vet.A2_E5_2_1_CWT != null))
                valid.push('A2_E5_2_1_CWT');
            if (!(vet.A2_E5_2_1_AMP != null))
                valid.push('A2_E5_2_1_AMP');
            if (!(vet.A2_E5_2_1_TMB != null))
                valid.push('A2_E5_2_1_TMB');
            if (!(vet.A2_E5_2_2_1 >= 0 && vet.A2_E5_2_2_1 <= 100))
                valid.push('A2_E5_2_2_1');
            if (!(vet.A2_E5_2_2_2 >= 0 && vet.A2_E5_2_2_2 <= 3))
                valid.push('A2_E5_2_2_2');
            if (!(vet.A2_E5_2_2_3 >= 0 && vet.A2_E5_2_2_3 <= 99))
                valid.push('A2_E5_2_2_3');
            if (!(typeof (vet.A2_E5_2_3) == 'boolean'))
                valid.push('A2_E5_2_3');
            if (!(vet.A2_E5_2_4.length > 0 && vet.A2_E5_2_4.length < 6))
                valid.push('A2_E5_2_4');
            if (!(vet.A2_E5_2_5 >= 1 && vet.A2_E5_2_5 <= 2))
                valid.push('A2_E5_2_5');
            if (!(vet.A2_E5_2_5 == 2 && vet.A2_E5_2_5_2 != null))
                valid.push('A2_E5_2_5_2');
            if (!(typeof (vet.A2_E5_2_6_1) == 'boolean'))
                valid.push('A2_E5_2_6_1');
            if (!(typeof (vet.A2_E5_2_6_2) == 'boolean'))
                valid.push('A2_E5_2_6_2');
            if (!(typeof (vet.A2_E5_2_6_3) == 'boolean'))
                valid.push('A2_E5_2_6_3');
            if (!(typeof (vet.A2_E5_2_6_4) == 'boolean'))
                valid.push('A2_E5_2_6_4');
            if (!(typeof (vet.A2_E5_2_6_5) == 'boolean'))
                valid.push('A2_E5_2_6_5');
            if (!(typeof (vet.A2_E5_2_6_6) == 'boolean'))
                valid.push('A2_E5_2_6_6');
            if (!(typeof (vet.A2_E5_2_6_7) == 'boolean'))
                valid.push('A2_E5_2_6_7');
            if (!(typeof (vet.A2_E5_2_6_8) == 'boolean'))
                valid.push('A2_E5_2_6_8');
            if (!(typeof (vet.A2_E5_2_6_9) == 'boolean'))
                valid.push('A2_E5_2_6_9');
            if (!(vet.A2_E5_2_6_9 && vet.A2_E5_2_6_9_1 != null))
                valid.push('A2_E5_2_6_9_1');
            result.push(valid);
        }
        return result;
    }

    //Pad
    validatePad(pads: SN2_1P2_6[]) {
        let result = [];
        for (let pad of pads) {
            let valid = [];
            if (!(pad.A2_E6_2_1_CWT != null))
                valid.push('A2_E6_2_1_CWT');
            if (!(pad.A2_E6_2_1_AMP != null))
                valid.push('A2_E6_2_1_AMP');
            if (!(pad.A2_E6_2_1_TMB != null))
                valid.push('A2_E6_2_1_TMB');
            if (!(pad.A2_E6_2_2_1 >= 0 && pad.A2_E6_2_2_1 <= 100))
                valid.push('A2_E6_2_2_1');
            if (!(pad.A2_E6_2_2_2 >= 0 && pad.A2_E6_2_2_2 <= 3))
                valid.push('A2_E6_2_2_2');
            if (!(pad.A2_E6_2_2_3 >= 0 && pad.A2_E6_2_2_3 <= 99))
                valid.push('A2_E6_2_2_3');
            if (!(typeof (pad.A2_E6_2_3) == 'boolean'))
                valid.push('A2_E6_2_3');
            if (!(pad.A2_E6_2_4.length > 0 && pad.A2_E6_2_4.length < 6))
                valid.push('A2_E6_2_4');
            if (!(pad.A2_E6_2_5 >= 1 && pad.A2_E6_2_5 <= 2))
                valid.push('A2_E6_2_5');
            if (!(pad.A2_E6_2_5 == 2 && pad.A2_E6_2_5_2 != null))
                valid.push('A2_E6_2_5_2');
            if (!(typeof (pad.A2_E6_2_6_1) == 'boolean'))
                valid.push('A2_E6_2_6_1');
            if (!(typeof (pad.A2_E6_2_6_2) == 'boolean'))
                valid.push('A2_E6_2_6_2');
            if (!(typeof (pad.A2_E6_2_6_3) == 'boolean'))
                valid.push('A2_E6_2_6_3');
            if (!(typeof (pad.A2_E6_2_6_4) == 'boolean'))
                valid.push('A2_E6_2_6_4');
            if (!(typeof (pad.A2_E6_2_6_5) == 'boolean'))
                valid.push('A2_E6_2_6_5');
            if (!(typeof (pad.A2_E6_2_6_6) == 'boolean'))
                valid.push('A2_E6_2_6_6');
            if (!(typeof (pad.A2_E6_2_6_7) == 'boolean'))
                valid.push('A2_E6_2_6_7');
            if (!(typeof (pad.A2_E6_2_6_8) == 'boolean'))
                valid.push('A2_E6_2_6_8');
            if (!(typeof (pad.A2_E6_2_6_9) == 'boolean'))
                valid.push('A2_E6_2_6_9');
            if (!(pad.A2_E6_2_6_9 && pad.A2_E6_2_6_9_1 != null))
                valid.push('A2_E6_2_6_9_1');
            result.push(valid);
        }
        return result;
    }

    //mushroom
    validateMush(mushs: SN2_1P2_7[]) {
        let result = [];
        for (let mush of mushs) {
            let valid = [];
            if (!(mush.A2_E7_2_1_CWT != null))
                valid.push('A2_E7_2_1_CWT');
            if (!(mush.A2_E7_2_1_AMP != null))
                valid.push('A2_E7_2_1_AMP');
            if (!(mush.A2_E7_2_1_TMB != null))
                valid.push('A2_E7_2_1_TMB');
            if (!(mush.A2_E7_2_2 >= 0 && mush.A2_E7_2_2 <= 9999))
                valid.push('A2_E7_2_2');
            if (!(typeof (mush.A2_E7_2_3) == 'boolean'))
                valid.push('A2_E7_2_3');
            if (!(typeof (mush.A2_E7_2_4_1) == 'boolean'))
                valid.push('A2_E7_2_4_1');
            if (!(typeof (mush.A2_E7_2_4_2) == 'boolean'))
                valid.push('A2_E7_2_4_2');
            if (!(typeof (mush.A2_E7_2_4_3) == 'boolean'))
                valid.push('A2_E7_2_4_3');
            if (!(typeof (mush.A2_E7_2_4_4) == 'boolean'))
                valid.push('A2_E7_2_4_4');
            if (!(typeof (mush.A2_E7_2_4_5) == 'boolean'))
                valid.push('A2_E7_2_4_5');
            if (!(typeof (mush.A2_E7_2_4_6) == 'boolean'))
                valid.push('A2_E7_2_4_6');
            if (!(typeof (mush.A2_E7_2_4_7) == 'boolean'))
                valid.push('A2_E7_2_4_7');
            if (!(typeof (mush.A2_E7_2_4_8) == 'boolean'))
                valid.push('A2_E7_2_4_8');
            if (!(typeof (mush.A2_E7_2_4_9) == 'boolean'))
                valid.push('A2_E7_2_4_9');
            if (!(mush.A2_E7_2_4_9 && mush.A2_E7_2_4_9_1 != null))
                valid.push('A2_E7_2_4_9_1');
            result.push(valid);
        }
        return result;
    }
    //fish
    validateFish(data: SN2_1P2_9_1) {
        let mapresult = {
            data: [],
            pools: []
        };
        let results = [];
        if (!(typeof (data.A2_E9_1_1_1_1) == 'boolean'))
            results.push('A2_E9_1_1_1_1');
        if (!(typeof (data.A2_E9_1_1_1_2) == 'boolean'))
            results.push('A2_E9_1_1_1_2');
        if (!(typeof (data.A2_E9_1_1_1_3) == 'boolean'))
            results.push('A2_E9_1_1_1_3');
        if (!(typeof (data.A2_E9_1_1_1_4) == 'boolean'))
            results.push('A2_E9_1_1_1_4');
        if (!(typeof (data.A2_E9_1_1_1_5) == 'boolean'))
            results.push('A2_E9_1_1_1_5');
        if (!(data.A2_E9_1_1_1_5 && data.A2_E9_1_1_1_5_1 != null))
            results.push('A2_E9_1_1_1_5_1');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && data.A2_E9_1_1_2 >= 1 && data.A2_E9_1_1_2 <= 99))
            results.push('A2_E9_1_1_2');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_2_1) == 'boolean'))
            results.push('A2_E9_1_1_2_1');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && data.A2_E9_1_1_3 >= 1 && data.A2_E9_1_1_3 <= 9999999))
            results.push('A2_E9_1_1_3');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_1) == 'boolean'))
            results.push('A2_E9_1_1_4_1');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_2) == 'boolean'))
            results.push('A2_E9_1_1_4_2');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_3) == 'boolean'))
            results.push('A2_E9_1_1_4_3');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_4) == 'boolean'))
            results.push('A2_E9_1_1_4_4');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_5) == 'boolean'))
            results.push('A2_E9_1_1_4_5');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_6) == 'boolean'))
            results.push('A2_E9_1_1_4_6');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_7) == 'boolean'))
            results.push('A2_E9_1_1_4_7');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_8) == 'boolean'))
            results.push('A2_E9_1_1_4_8');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && typeof (data.A2_E9_1_1_4_9) == 'boolean'))
            results.push('A2_E9_1_1_4_9');
        if (!((data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) && data.A2_E9_1_1_4_9 && data.A2_E9_1_1_4_9_1 != null))
            results.push('A2_E9_1_1_4_9_1');
        let poolresult = (data.A2_E9_1_1_1_1 || data.A2_E9_1_1_1_2) ? this.validatePool(data.A2_E9_1_1_2_2) : [];
        mapresult.data = results;
        mapresult.pools = poolresult;
        return mapresult
    }
    //kob
    validateKob(data: SN2_1P2_9_3) {
        let mapresult = {
            data: [],
        };
        let results = [];
        if (!(typeof (data.A2_E9_1_3_1_1) == 'boolean'))
            results.push('A2_E9_1_1_1_1');
        if (!(typeof (data.A2_E9_1_3_1_2) == 'boolean'))
            results.push('A2_E9_1_1_1_2');
        if (!(typeof (data.A2_E9_1_3_1_3) == 'boolean'))
            results.push('A2_E9_1_1_1_3');
        if (!(data.A2_E9_1_3_1_3 && data.A2_E9_1_3_1_3_1 != null))
            results.push('A2_E9_1_1_1_5_1');
        if (!(data.A2_E9_1_3_1_1 && data.A2_E9_1_3_3 >= 1 && data.A2_E9_1_3_3 <= 9999999))
            results.push('A2_E9_1_3_3');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_1) == 'boolean'))
            results.push('A2_E9_1_3_4_1');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_2) == 'boolean'))
            results.push('A2_E9_1_3_4_2');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_3) == 'boolean'))
            results.push('A2_E9_1_3_4_3');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_4) == 'boolean'))
            results.push('A2_E9_1_3_4_4');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_5) == 'boolean'))
            results.push('A2_E9_1_3_4_5');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_6) == 'boolean'))
            results.push('A2_E9_1_3_4_6');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_7) == 'boolean'))
            results.push('A2_E9_1_3_4_7');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_8) == 'boolean'))
            results.push('A2_E9_1_3_4_8');
        if (!(data.A2_E9_1_3_1_1 && typeof (data.A2_E9_1_3_4_9) == 'boolean'))
            results.push('A2_E9_1_3_4_9');
        if (!(data.A2_E9_1_3_1_1 && data.A2_E9_1_3_4_9 && data.A2_E9_1_3_4_9_1 != null))
            results.push('A2_E9_1_3_4_9_1');
        mapresult.data = results;
        return mapresult
    }
    //crocodile
    validateCroc(data: SN2_1P2_9_4) {
        let mapresult = {
            data: [],
            pools: []
        };
        let results = [];
        if (!(typeof (data.A2_E9_1_4_1_1) == 'boolean'))
            results.push('A2_E9_1_4_1_1');
        if (!(typeof (data.A2_E9_1_4_1_2) == 'boolean'))
            results.push('A2_E9_1_4_1_2');
        if (!(data.A2_E9_1_4_1_2 && data.A2_E9_1_4_1_2_1 != null))
            results.push('A2_E9_1_4_1_2_1');
        if (!(data.A2_E9_1_4_1_1 && data.A2_E9_1_4_2 >= 1 && data.A2_E9_1_4_2 <= 99))
            results.push('A2_E9_1_4_2');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_2_1) == 'boolean'))
            results.push('A2_E9_1_4_2_1');
        if (!(data.A2_E9_1_4_1_1 && data.A2_E9_1_4_3 >= 1 && data.A2_E9_1_4_3 <= 9999999))
            results.push('A2_E9_1_4_3');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_1) == 'boolean'))
            results.push('A2_E9_1_1_4_1');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_2) == 'boolean'))
            results.push('A2_E9_1_1_4_2');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_3) == 'boolean'))
            results.push('A2_E9_1_1_4_3');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_4) == 'boolean'))
            results.push('A2_E9_1_1_4_4');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_5) == 'boolean'))
            results.push('A2_E9_1_1_4_5');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_6) == 'boolean'))
            results.push('A2_E9_1_1_4_6');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_7) == 'boolean'))
            results.push('A2_E9_1_1_4_7');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_8) == 'boolean'))
            results.push('A2_E9_1_1_4_8');
        if (!(data.A2_E9_1_4_1_1 && typeof (data.A2_E9_1_4_4_9) == 'boolean'))
            results.push('A2_E9_1_1_4_9');
        if (!(data.A2_E9_1_4_1_1 && data.A2_E9_1_4_4_9 && data.A2_E9_1_4_4_9_1 != null))
            results.push('A2_E9_1_4_4_9_1');
        let poolresult = data.A2_E9_1_4_1_1 ? this.validatePool(data.A2_E9_1_4_2_2) : [];
        mapresult.data = results;
        mapresult.pools = poolresult;
        return mapresult
    }

    validatePool(pools: Pool[]) {
        let results = [];
        for (let pool of pools) {
            let valid = [];
            if (!(pool.A2_E9_1_1_2_2_0 >= 1 && pool.A2_E9_1_1_2_2_0 <= 4))
                valid.push('A2_E9_1_1_2_2_0');
            if (!(pool.A2_E9_1_1_2_2_0 == 1 && pool.A2_E9_1_1_2_2_1_1 >= 1 && pool.A2_E9_1_1_2_2_1_1 <= 99999))
                valid.push('A2_E9_1_1_2_2_1_1');
            if (!(pool.A2_E9_1_1_2_2_0 == 2 && pool.A2_E9_1_1_2_2_2_1 >= 0 && pool.A2_E9_1_1_2_2_2_1 <= 999))
                valid.push('A2_E9_1_1_2_2_2_1');
            if (!(pool.A2_E9_1_1_2_2_0 == 2 && pool.A2_E9_1_1_2_2_2_2 >= 0 && pool.A2_E9_1_1_2_2_2_2 <= 3))
                valid.push('A2_E9_1_1_2_2_2_2');
            if (!(pool.A2_E9_1_1_2_2_0 == 2 && pool.A2_E9_1_1_2_2_2_3 >= 0 && pool.A2_E9_1_1_2_2_2_3 <= 99))
                valid.push('A2_E9_1_1_2_2_2_3');
            if (!(pool.A2_E9_1_1_2_2_0 == 2 && pool.A2_E9_1_1_2_2_2_4 >= 0 && pool.A2_E9_1_1_2_2_2_4 <= 99))
                valid.push('A2_E9_1_1_2_2_2_4');
            if (!(pool.A2_E9_1_1_2_2_0 == 3 && pool.A2_E9_1_1_2_2_3_1_1 >= 0 && pool.A2_E9_1_1_2_2_3_1_1 <= 999))
                valid.push('A2_E9_1_1_2_2_3_1_1');
            if (!(pool.A2_E9_1_1_2_2_0 == 3 && pool.A2_E9_1_1_2_2_3_1_2 >= 0 && pool.A2_E9_1_1_2_2_3_1_2 <= 999))
                valid.push('A2_E9_1_1_2_2_3_1_2');
            if (!(pool.A2_E9_1_1_2_2_0 == 3 && pool.A2_E9_1_1_2_2_3_1_3 >= 0 && pool.A2_E9_1_1_2_2_3_1_3 <= 99))
                valid.push('A2_E9_1_1_2_2_3_1_3');
            if (!(pool.A2_E9_1_1_2_2_0 == 4 && pool.A2_E9_1_1_2_2_3_2_1 >= 0 && pool.A2_E9_1_1_2_2_3_2_1 <= 99))
                valid.push('A2_E9_1_1_2_2_3_2_1');
            if (!(pool.A2_E9_1_1_2_2_0 == 4 && pool.A2_E9_1_1_2_2_3_2_2 >= 0 && pool.A2_E9_1_1_2_2_3_2_2 <= 99))
                valid.push('A2_E9_1_1_2_2_3_2_2');
            results.push(valid);
        }
        return results;
    }

    //SN2_1P3
    validateSN21P3(a3: SN2_1P3) {
        let results = [];
        if (!(a3.A3_1 != null))
            results.push('A3_1');
        if (!(a3.A3_3_1 != null))
            results.push('A3_3_1');
        if (!(a3.A3_3_2 != null))
            results.push('A3_3_2');
        if (!(a3.A3_4 != null))
            results.push('A3_4');
        if (!(a3.A3_5 != null))
            results.push('A3_5');
        if (!(a3.A3_6 >= 1 && a3.A3_6 <= 99999))
            results.push('A3_6');
        if (!(typeof (a3.A3_7) == 'boolean'))
            results.push('A3_7');
        if (!(typeof (a3.A3_8_1) == 'boolean'))
            results.push('A3_8_1');
        if (!(typeof (a3.A3_8_2) == 'boolean'))
            results.push('A3_8_2');
        if (!(typeof (a3.A3_8_3) == 'boolean'))
            results.push('A3_8_3');
        if (!(typeof (a3.A3_8_4) == 'boolean'))
            results.push('A3_8_4');
        if (!(typeof (a3.A3_8_5) == 'boolean'))
            results.push('A3_8_5');
        if (!(typeof (a3.A3_8_6) == 'boolean'))
            results.push('A3_8_6');
        if (!(typeof (a3.A3_8_7) == 'boolean'))
            results.push('A3_8_7');
        if (!(typeof (a3.A3_8_8) == 'boolean'))
            results.push('A3_8_8');
        if (!(a3.A3_8_8 && a3.A3_8_8_1 != null))
            results.push('A3_8_8_1');
        if (!(typeof (a3.A3_9) == 'boolean'))
            results.push('A3_9');
        if (!(typeof (a3.A3_10) == 'boolean'))
            results.push('A3_10');
        if (!(typeof (a3.A3_11) == 'boolean'))
            results.push('A3_11');
        return results;
    }

    //SN2_1P4
    validateSN21P4(a3: SN2_1P4) {
        let results = [];
        if (!(a3.A4_1 != null))
            results.push('A3_1');
        if (!(a3.A4_3_1 != null))
            results.push('A3_3_1');
        if (!(a3.A4_3_2 != null))
            results.push('A3_3_2');
        if (!(a3.A4_4 != null))
            results.push('A3_4');
        if (!(a3.A4_5 != null))
            results.push('A3_5');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_1) == 'boolean'))
            results.push('A4_6_1_1_1');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_2) == 'boolean'))
            results.push('A4_6_1_1_2');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_3) == 'boolean'))
            results.push('A4_6_1_1_3');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_4) == 'boolean'))
            results.push('A4_6_1_1_4');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_5) == 'boolean'))
            results.push('A4_6_1_1_5');
        if (!(a3.A4_5 == 'S36' && typeof (a3.A4_6_1_1_6) == 'boolean'))
            results.push('A4_6_1_1_6');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_1 && a3.A4_6_1_2_1 >= 1 && a3.A4_6_1_2_1 <= 9999))
            results.push('A4_6_1_2_1');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_2 && a3.A4_6_1_2_2 >= 1 && a3.A4_6_1_2_2 <= 9999))
            results.push('A4_6_1_2_2');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_3 && a3.A4_6_1_2_3 >= 1 && a3.A4_6_1_2_3 <= 9999))
            results.push('A4_6_1_2_3');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_4 && a3.A4_6_1_2_4 >= 1 && a3.A4_6_1_2_4 <= 9999))
            results.push('A4_6_1_2_4');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_5 && a3.A4_6_1_2_5 >= 1 && a3.A4_6_1_2_5 <= 9999))
            results.push('A4_6_1_2_5');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_6 && a3.A4_6_1_2_6 >= 1 && a3.A4_6_1_2_6 <= 99999))
            results.push('A4_6_1_2_6');
        if (!(a3.A4_5 == 'S36' && a3.A4_6_1_1_6 && a3.A4_6_1_3 >= 1 && a3.A4_6_1_3 <= 99999))
            results.push('A4_6_1_3');
        if (!(a3.A4_5 == 'S12' && a3.A4_6_2_1 >= 1 && a3.A4_6_2_1 <= 9999))
            results.push('A4_6_2_1');
        if (!(a3.A4_5 == 'S12' && a3.A4_6_2_2 >= 1 && a3.A4_6_2_2 <= 9999))
            results.push('A4_6_2_2');
        if (!(a3.A4_5 == 'S37' && a3.A4_6_3_1 >= 1 && a3.A4_6_3_1 <= 9999))
            results.push('A4_6_3_1');
        if (!(a3.A4_5 == 'S37' && a3.A4_6_3_2 >= 1 && a3.A4_6_3_2 <= 99999))
            results.push('A4_6_3_2');
        if (!(a3.A4_5 == 'S38' && a3.A4_6_4_1 >= 1 && a3.A4_6_4_1 <= 9999))
            results.push('A4_6_4_1');
        if (!(a3.A4_5 == 'S38' && a3.A4_6_4_2 >= 1 && a3.A4_6_4_2 <= 9999))
            results.push('A4_6_4_2');
        if (!(a3.A4_5 == 'S38' && a3.A4_6_4_3 >= 1 && a3.A4_6_4_3 <= 999))
            results.push('A4_6_4_3');
        if (!(a3.A4_5 == 'S47' && a3.A4_6_5_1 >= 1 && a3.A4_6_5_1 <= 99999))
            results.push('A4_6_5_1');
        if (!((a3.A4_5 != 'S38' && a3.A4_5 != 'S12' && a3.A4_5 != 'S37' && a3.A4_5 != 'S36' && a3.A4_5 != 'S47') && a3.A4_6_6_1 >= 1 && a3.A4_6_6_1 <= 99999))
            results.push('A4_6_6_1');
        if (!(typeof (a3.A4_7_1) == 'boolean'))
            results.push('A4_7_1');
        if (!(typeof (a3.A4_7_2) == 'boolean'))
            results.push('A4_7_2');
        if (!(typeof (a3.A4_7_3) == 'boolean'))
            results.push('A4_7_3');
        if (!(typeof (a3.A4_7_4) == 'boolean'))
            results.push('A4_7_4');
        if (!(typeof (a3.A4_7_5) == 'boolean'))
            results.push('A4_7_5');
        if (!(typeof (a3.A4_7_6) == 'boolean'))
            results.push('A4_7_6');
        if (!(typeof (a3.A4_7_7) == 'boolean'))
            results.push('A4_7_7');
        if (!(typeof (a3.A4_7_8) == 'boolean'))
            results.push('A4_7_8');
        if (!(a3.A4_7_1 && a3.A4_7_8_1 != null))
            results.push('A4_7_8_1');
        return results;
    }

    //Water
    validateSN21P5(a5: SN2_1P5) {
        let result = {
            A5_1: [],
            A5_2: {},
            A5_3: {},
            A5_4: {},
            A5_5: {},
            A5_6: {},
            A5_7: []
        }
        result.A5_1 = this.validateSN2_1P5_1(a5.A5_1);
        result.A5_2 = this.validateSN2_1P5_2(a5.A5_2);
        result.A5_3 = this.validateSN2_1P5_3(a5.A5_3);
        result.A5_4 = this.validateSN2_1P5_4(a5.A5_4);
        result.A5_5 = this.validateSN2_1P5_5(a5.A5_5);
        result.A5_6 = this.validateSN2_1P5_6(a5.A5_6);
        result.A5_7 = this.validateSN2_1P5_7(a5.A5_7);
        return result;
    }
    //Tabwater
    validateSN2_1P5_1(tabs: SN2_1P5_1) {
        let results = [];
        if (!(typeof (tabs.A5_1_1_1_1) == 'boolean'))
            results.push('A5_1_1_1_1');
        if (!(tabs.A5_1_1_1_1 && typeof (tabs.A5_1_1_1_2_1) == 'boolean'))
            results.push('A5_1_1_1_2_1');
        if (!(tabs.A5_1_1_1_1 && tabs.A5_1_1_1_2_1 && (tabs.A5_1_1_1_2_2_1 || tabs.A5_1_1_1_2_2_2 || tabs.A5_1_1_1_2_2_3 || tabs.A5_1_1_1_2_2_4 || tabs.A5_1_1_1_2_2_5 || tabs.A5_1_1_1_2_2_6)))
            results.push('A5_1_1_1_2_2');
        if (!(tabs.A5_1_1_1_1 && !tabs.A5_1_1_1_3_2_1 && (tabs.A5_1_1_1_3_1 >= 1 && tabs.A5_1_1_1_3_1 <= 999)))
            results.push('A5_1_1_1_3_1');
        if (!(tabs.A5_1_1_1_1 && tabs.A5_1_1_1_3_2_1 && (tabs.A5_1_1_1_3_2 >= 1 && tabs.A5_1_1_1_3_2 <= 999999)))
            results.push('A5_1_1_1_3_2');
        if (!(typeof (tabs.A5_1_1_2_1) == 'boolean'))
            results.push('A5_1_1_2_1');
        if (!(tabs.A5_1_1_2_1 && typeof (tabs.A5_1_1_2_2_1) == 'boolean'))
            results.push('A5_1_1_2_2_1');
        if (!(tabs.A5_1_1_2_1 && tabs.A5_1_1_2_2_1 && (tabs.A5_1_1_2_2_2_1 || tabs.A5_1_1_2_2_2_2 || tabs.A5_1_1_2_2_2_3 || tabs.A5_1_1_2_2_2_4 || tabs.A5_1_1_2_2_2_5 || tabs.A5_1_1_2_2_2_6)))
            results.push('A5_1_1_2_2_2');
        if (!(tabs.A5_1_1_2_1 && !tabs.A5_1_1_2_3_2_1 && (tabs.A5_1_1_2_3_1 >= 1 && tabs.A5_1_1_2_3_1 <= 999)))
            results.push('A5_1_1_2_3_1');
        if (!(tabs.A5_1_1_2_1 && tabs.A5_1_1_2_3_2_1 && (tabs.A5_1_1_2_3_2 >= 1 && tabs.A5_1_1_2_3_2 <= 9999999)))
            results.push('A5_1_1_2_3_2');
        if (!(typeof (tabs.A5_1_1_3_1) == 'boolean'))
            results.push('A5_1_1_3_1');
        if (!(tabs.A5_1_1_3_1 && typeof (tabs.A5_1_1_3_2_1) == 'boolean'))
            results.push('A5_1_1_3_2_1');
        if (!(tabs.A5_1_1_3_1 && tabs.A5_1_1_3_2_1 && (tabs.A5_1_1_3_2_2_1 || tabs.A5_1_1_3_2_2_2 || tabs.A5_1_1_3_2_2_3 || tabs.A5_1_1_3_2_2_4 || tabs.A5_1_1_3_2_2_5 || tabs.A5_1_1_3_2_2_6)))
            results.push('A5_1_1_3_2_2');
        if (!(tabs.A5_1_1_3_1 && !tabs.A5_1_1_3_3_2_1 && (tabs.A5_1_1_3_3_1 >= 1 && tabs.A5_1_1_3_3_1 <= 999)))
            results.push('A5_1_1_3_3_1');
        if (!(tabs.A5_1_1_3_1 && tabs.A5_1_1_3_3_2_1 && (tabs.A5_1_1_3_3_2 >= 1 && tabs.A5_1_1_3_3_2 <= 9999999)))
            results.push('A5_1_1_3_3_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && (tabs.A5_1_2_1_1 >= 0 && tabs.A5_1_2_1_1 <= 100)))
            results.push('A5_1_2_1_1');
        if (!(tabs.A5_1_1_3_1 && (tabs.A5_1_2_1_2 >= 0 && tabs.A5_1_2_1_2 <= 100)))
            results.push('A5_1_2_1_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && (tabs.A5_1_2_2_1 >= 0 && tabs.A5_1_2_2_1 <= 100)))
            results.push('A5_1_2_2_1');
        if (!(tabs.A5_1_1_3_1 && (tabs.A5_1_2_2_2 >= 0 && tabs.A5_1_2_2_2 <= 100)))
            results.push('A5_1_2_2_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && (tabs.A5_1_2_3_1 >= 0 && tabs.A5_1_2_3_1 <= 100)))
            results.push('A5_1_2_3_1');
        if (!(tabs.A5_1_1_3_1 && (tabs.A5_1_2_3_2 >= 0 && tabs.A5_1_2_3_2 <= 100)))
            results.push('A5_1_2_3_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && (tabs.A5_1_2_4_1 >= 0 && tabs.A5_1_2_4_1 <= 100)))
            results.push('A5_1_2_4_1');
        if (!(tabs.A5_1_1_3_1 && (tabs.A5_1_2_4_2 >= 0 && tabs.A5_1_2_4_2 <= 100)))
            results.push('A5_1_2_4_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && (tabs.A5_1_2_5_1 >= 0 && tabs.A5_1_2_5_1 <= 100)))
            results.push('A5_1_2_5_1');
        if (!(tabs.A5_1_1_3_1 && (tabs.A5_1_2_5_2 >= 0 && tabs.A5_1_2_5_2 <= 100)))
            results.push('A5_1_2_5_2');
        if (!((tabs.A5_1_1_1_1 || tabs.A5_1_1_2_1) && tabs.A5_1_2_6_1 == 100))
            results.push('A5_1_2_6_1');
        if (!(tabs.A5_1_1_3_1 && tabs.A5_1_2_6_2 == 100))
            results.push('A5_1_2_6_2');
        if (!(typeof (tabs.A5_1_3) == 'boolean'))
            results.push('A5_1_3');
        if (!(tabs.A5_1_3 && (tabs.A5_1_4 >= 1 && tabs.A5_1_4 <= 12)))
            results.push('A5_1_4');
        return results;
    }

    //Badan
    validateSN2_1P5_2(badan: SN2_1P5_2) {
        let results = {
            A5_2: [],
            A5_2_3: [],
            A5_2_6: []
        }
        let result = [];
        if (!(typeof (badan.A5_2_1) == 'boolean'))
            result.push('A5_2_1');
        if (!(badan.A5_2_1 && (badan.A5_2_2 >= 1 && badan.A5_2_2 <= 99)))
            result.push("A5_2_2");
        if (!(badan.A5_2_1 && (badan.A5_2_2_1 >= 0 && badan.A5_2_2_1 <= badan.A5_2_2)))
            result.push("A5_2_2_1");
        if (!(typeof (badan.A5_2_4) == 'boolean'))
            result.push('A5_2_4');
        if (!(badan.A5_2_4 && (badan.A5_2_5 >= 1 && badan.A5_2_5 <= 99)))
            result.push("A5_2_5");
        if (!(badan.A5_2_4 && (badan.A5_2_5_1 >= 0 && badan.A5_2_5_1 <= badan.A5_2_5)))
            result.push("A5_2_5_1");
        results.A5_2 = result;
        results.A5_2_3 = badan.A5_2_1 && badan.A5_2_2_1 > 0 ? this.validateBadan(badan.A5_2_3) : [];
        results.A5_2_6 = badan.A5_2_4 && badan.A5_2_5_1 > 0 ? this.validateBadan(badan.A5_2_6) : [];
        return results;
    }
    validateBadan(badans: SN2_1P5_2_3[]) {
        let results = [];
        for (let badan of badans) {
            let result = {
                A5_2: [],
                Pump: []
            }
            let valid = [];
            if (!(!badan.A5_2_3_1_2 && badan.A5_2_3_1 >= 1 && badan.A5_2_3_1 <= 9999999))
                valid.push('A5_2_3_1');
            if (!(badan.A5_2_3_1_2 && typeof (badan.A5_2_3_2) == 'boolean'))
                valid.push('A5_2_3_2');
            if (!(badan.A5_2_3_1_2 && badan.A5_2_3_2 && (badan.A5_2_3_3 >= 1 && badan.A5_2_3_3 <= 9)))
                valid.push('A5_2_3_3');
            if (!(badan.A5_2_3_5_1 >= 0 && badan.A5_2_3_5_1 <= 100))
                valid.push('A5_2_3_5_1');
            if (!(badan.A5_2_3_5_2 >= 0 && badan.A5_2_3_5_2 <= 100))
                valid.push('A5_2_3_5_2');
            if (!(badan.A5_2_3_5_3 >= 0 && badan.A5_2_3_5_3 <= 100))
                valid.push('A5_2_3_5_3');
            if (!(badan.A5_2_3_5_4 >= 0 && badan.A5_2_3_5_4 <= 100))
                valid.push('A5_2_3_5_4');
            if (!(badan.A5_2_3_5_5 >= 0 && badan.A5_2_3_5_5 <= 100))
                valid.push('A5_2_3_5_5');
            if (!(badan.A5_2_3_5_6 >= 0 && badan.A5_2_3_5_6 <= 100))
                valid.push('A5_2_3_5_6');
            if (!(badan.A5_2_3_5_7 == 100))
                valid.push('A5_2_3_5_7');
            if (!(typeof (badan.A5_2_3_6_1) == 'boolean'))
                valid.push('A5_2_3_6_1');
            if (!(badan.A5_2_3_6_1 && (badan.A5_2_3_6_2_1 || badan.A5_2_3_6_2_2 || badan.A5_2_3_6_2_3 || badan.A5_2_3_6_2_4 || badan.A5_2_3_6_2_5 || badan.A5_2_3_6_2_6)))
                valid.push('A5_2_3_6_2');
            result.A5_2 = valid;
            result.Pump = badan.A5_2_3_1_2 && badan.A5_2_3_2 ? this.validatePump(badan.A5_2_3_3_1) : [];
            results.push(result);
        }
        return results;
    }
    //river
    validateSN2_1P5_3(river: SN2_1P5_3) {
        let results = {
            A5_3: [],
            Pump: []
        }
        let valid = [];
        if (!(!river.A5_3_1_1 && river.A5_3_1 >= 1 && river.A5_3_1 <= 9999999))
            valid.push('A5_3_1');
        if (!(river.A5_3_1_1 && typeof (river.A5_3_2) == 'boolean'))
            valid.push('A5_3_2');
        if (!(river.A5_3_1_1 && river.A5_3_3 && (river.A5_3_3 >= 1 && river.A5_3_3 <= 9)))
            valid.push('A5_3_3');
        if (!(river.A5_3_4_1 >= 0 && river.A5_3_4_1 <= 100))
            valid.push('A5_3_4_1');
        if (!(river.A5_3_4_2 >= 0 && river.A5_3_4_2 <= 100))
            valid.push('A5_3_4_2');
        if (!(river.A5_3_4_3 >= 0 && river.A5_3_4_3 <= 100))
            valid.push('A5_3_4_3');
        if (!(river.A5_3_4_4 >= 0 && river.A5_3_4_4 <= 100))
            valid.push('A5_3_4_4');
        if (!(river.A5_3_4_5 >= 0 && river.A5_3_4_5 <= 100))
            valid.push('A5_3_4_5');
        if (!(river.A5_3_4_6 >= 0 && river.A5_3_4_6 <= 100))
            valid.push('A5_3_4_6');
        if (!(river.A5_3_4_6 == 100))
            valid.push('A5_3_4_7');
        if (!(typeof (river.A5_3_5_1) == 'boolean'))
            valid.push('A5_3_5_1');
        if (!(river.A5_3_5_1 && (river.A5_3_5_2_1 || river.A5_3_5_2_2 || river.A5_3_5_2_3 || river.A5_3_5_2_4)))
            valid.push('A5_3_5_2');
        results.A5_3 = valid;
        results.Pump = river.A5_3_1_1 && river.A5_3_2 ? this.validatePump(river.A5_3_3_1) : [];

        return results;
    }
    //Sra
    validateSN2_1P5_4(sra: SN2_1P5_4) {
        let results = {
            A5_4: [],
            A5_4_3_1: [],
            A5_4_4_1: []
        }
        let result = [];
        if (!(typeof (sra.A5_4_1) == 'boolean'))
            result.push('A5_4_1');
        if (!(sra.A5_4_1 && (sra.A5_4_2 >= 1 && sra.A5_4_2 <= 20)))
            result.push("A5_2_2");
        if (!(sra.A5_4_1 && typeof (sra.A5_4_3) == 'boolean'))
            result.push("A5_4_3");
        if (!(sra.A5_4_1 && (sra.A5_4_4 >= 1 && sra.A5_4_4 <= sra.A5_4_2)))
            result.push('A5_4_4');
        results.A5_4 = result;
        results.A5_4_3_1 = sra.A5_4_1 && sra.A5_4_2 > 0 ? this.validateSN2_1P5_4_3(sra.A5_4_3_1) : [];
        results.A5_4_4_1 = sra.A5_4_1 && sra.A5_4_4 > 0 ? this.validateSN2_1P5_4_4(sra.A5_4_4_1) : [];
        return results;
    }

    validateSN2_1P5_4_3(pools: SN2_1P5_4_3[]) {
        let results = [];
        for (let pool of pools) {
            let valid = [];
            if (!(pool.A5_4_3_0 >= 1 && pool.A5_4_3_0 <= 4))
                valid.push('A5_4_3_0');
            if (!(pool.A5_4_3_0 == 1 && pool.A5_4_3_1 >= 1 && pool.A5_4_3_1 <= 99999))
                valid.push('A5_4_3_1');
            if (!(pool.A5_4_3_0 == 2 && pool.A5_4_3_2_1 >= 0 && pool.A5_4_3_2_1 <= 999))
                valid.push('A5_4_3_2_1');
            if (!(pool.A5_4_3_0 == 2 && pool.A5_4_3_2_2 >= 0 && pool.A5_4_3_2_2 <= 3))
                valid.push('A5_4_3_2_2');
            if (!(pool.A5_4_3_0 == 2 && pool.A5_4_3_2_3 >= 0 && pool.A5_4_3_2_3 <= 99))
                valid.push('A5_4_3_2_3');
            if (!(pool.A5_4_3_0 == 2 && pool.A5_4_3_2_4 >= 1 && pool.A5_4_3_2_4 <= 99))
                valid.push('A5_4_3_2_4');
            if (!(pool.A5_4_3_0 == 3 && pool.A5_4_3_3_1_1 >= 1 && pool.A5_4_3_3_1_1 <= 999))
                valid.push('A5_4_3_3_1_1');
            if (!(pool.A5_4_3_0 == 3 && pool.A5_4_3_3_1_2 >= 1 && pool.A5_4_3_3_1_2 <= 999))
                valid.push('A5_4_3_3_1_2');
            if (!(pool.A5_4_3_0 == 3 && pool.A5_4_3_3_1_3 >= 1 && pool.A5_4_3_3_1_3 <= 99))
                valid.push('A5_4_3_3_1_3');
            if (!(pool.A5_4_3_0 == 4 && pool.A5_4_3_3_2_1 >= 1 && pool.A5_4_3_3_2_1 <= 99))
                valid.push('A5_4_3_3_2_1');
            if (!(pool.A5_4_3_0 == 4 && pool.A5_4_3_3_2_2 >= 1 && pool.A5_4_3_3_2_2 <= 99))
                valid.push('A5_4_3_3_2_2');
            results.push(valid);
        }
        return results;
    }

    validateSN2_1P5_4_4(pools: SN2_1P5_4_4[]) {
        let results = [];
        for (let pool of pools) {
            let result = {
                A5_4: [],
                Pump: []
            }
            let valid = [];
            if (!(!pool.A5_4_4_1_2 && pool.A5_4_4_1 >= 1 && pool.A5_4_4_1 <= 9999999))
                valid.push('A5_4_4_1');
            if (!(pool.A5_4_4_1_2 && typeof (pool.A5_4_4_2) == 'boolean'))
                valid.push('A5_4_4_2');
            if (!(pool.A5_4_4_1_2 && pool.A5_4_4_2 && (pool.A5_4_4_3 >= 1 && pool.A5_4_4_3 <= 9)))
                valid.push('A5_4_4_3');
            if (!(pool.A5_4_4_5_1 >= 0 && pool.A5_4_4_5_1 <= 100))
                valid.push('A5_4_4_5_1');
            if (!(pool.A5_4_4_5_2 >= 0 && pool.A5_4_4_5_2 <= 100))
                valid.push('A5_4_4_5_2');
            if (!(pool.A5_4_4_5_3 >= 0 && pool.A5_4_4_5_3 <= 100))
                valid.push('A5_4_4_5_3');
            if (!(pool.A5_4_4_5_4 >= 0 && pool.A5_4_4_5_4 <= 100))
                valid.push('A5_4_4_5_4');
            if (!(pool.A5_4_4_5_5 >= 0 && pool.A5_4_4_5_5 <= 100))
                valid.push('A5_4_4_5_5');
            if (!(pool.A5_4_4_5_6 >= 0 && pool.A5_4_4_5_6 <= 100))
                valid.push('A5_4_4_5_6');
            if (!(pool.A5_4_4_5_7 == 100))
                valid.push('A5_4_4_5_7');
            if (!(typeof (pool.A5_4_4_6_1) == 'boolean'))
                valid.push('A5_4_4_6_1');
            if (!(pool.A5_4_4_6_1 && (pool.A5_4_4_6_2_1 || pool.A5_4_4_6_2_2 || pool.A5_4_4_6_2_3 || pool.A5_4_4_6_2_4)))
                valid.push('A5_4_4_6_2_1');
            result.A5_4 = valid;
            result.Pump = pool.A5_4_4_1_2 && pool.A5_4_4_2 ? this.validatePump(pool.A5_4_4_4) : [];
            results.push(result);
        }
        return results;
    }
    //chon
    validateSN2_1P5_5(chon: SN2_1P5_5) {
        let results = {
            A5_5: [],
            Pump: []
        }
        let valid = [];
        if (!(!chon.A5_5_1_1 && chon.A5_5_1 >= 1 && chon.A5_5_1 <= 9999999))
            valid.push('A5_5_1');
        if (!(chon.A5_5_1_1 && typeof (chon.A5_5_2) == 'boolean'))
            valid.push('A5_5_2');
        if (!(chon.A5_5_1_1 && chon.A5_5_2 && (chon.A5_5_3 >= 1 && chon.A5_5_3 <= 9)))
            valid.push('A5_5_3');
        if (!(chon.A5_5_4_1 >= 0 && chon.A5_5_4_1 <= 100))
            valid.push('A5_5_4_1');
        if (!(chon.A5_5_4_2 >= 0 && chon.A5_5_4_2 <= 100))
            valid.push('A5_5_4_2');
        if (!(chon.A5_5_4_3 >= 0 && chon.A5_5_4_3 <= 100))
            valid.push('A5_5_4_3');
        if (!(chon.A5_5_4_4 >= 0 && chon.A5_5_4_4 <= 100))
            valid.push('A5_5_4_4');
        if (!(chon.A5_5_4_5 >= 0 && chon.A5_5_4_5 <= 100))
            valid.push('A5_5_4_5');
        if (!(chon.A5_5_4_6 >= 0 && chon.A5_5_4_6 <= 100))
            valid.push('A5_5_4_6');
        if (!(chon.A5_5_4_7 == 100))
            valid.push('A5_5_4_7');
        if (!(typeof (chon.A5_5_5_1) == 'boolean'))
            valid.push('A5_5_5_1');
        if (!(chon.A5_5_5_1 && (chon.A5_5_5_2_1 || chon.A5_5_5_2_2 || chon.A5_5_5_2_3 || chon.A5_5_5_2_4)))
            valid.push('A5_5_5_2');
        results.A5_5 = valid;
        results.Pump = chon.A5_5_1_1 && chon.A5_5_2 ? this.validatePump(chon.A5_5_3_1) : [];
        return results;
    }
    //Pump
    validatePump(pumps: Pump[]) {
        let results = [];
        for (let pump of pumps) {
            let valid = [];
            if (!(!pump.A5_2_3_4_1_1 && (pump.A5_2_3_4_1 >= 1 && pump.A5_2_3_4_1 <= 99)))
                valid.push('A5_2_3_4_1');
            if (!(!pump.A5_2_3_4_1_1 && (pump.A5_2_3_4_2 >= 1 && pump.A5_2_3_4_2 <= 999)))
                valid.push('A5_2_3_4_2');
            if (!(!pump.A5_2_3_4_1_1 && !pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_3 >= 1 && pump.A5_2_3_4_3 <= 999)))
                valid.push('A5_2_3_4_3');
            if (!(!pump.A5_2_3_4_1_1 && pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_4 >= 1 && pump.A5_2_3_4_4 <= 5)))
                valid.push('A5_2_3_4_4');
            if (!(!pump.A5_2_3_4_1_1 && pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_5 != null)))
                valid.push('A5_2_3_4_5');
            if (!(!pump.A5_2_3_4_1_1 && pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_6 != null)))
                valid.push('A5_2_3_4_6');
            if (!(!pump.A5_2_3_4_1_1 && pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_7 != null)))
                valid.push('A5_2_3_4_7');
            if (!(!pump.A5_2_3_4_1_1 && pump.A5_2_3_4_3_1 && (pump.A5_2_3_4_8 != null)))
                valid.push('A5_2_3_4_8');
            results.push(valid);
        }
        return results;
    }
    //Fon
    validateSN2_1P5_6(fon: SN2_1P5_6) {
        let results = {
            A5_6: [],
            A5_6_1: []
        }
        let valid = [];
        if (!(fon.A5_6_2_1 >= 0 && fon.A5_6_2_1 <= 100))
            valid.push('A5_6_2_1');
        if (!(fon.A5_6_2_2 >= 0 && fon.A5_6_2_2 <= 100))
            valid.push('A5_6_2_2');
        if (!(fon.A5_6_2_3 >= 0 && fon.A5_6_2_3 <= 100))
            valid.push('A5_6_2_3');
        if (!(fon.A5_6_2_4 >= 0 && fon.A5_6_2_4 <= 100))
            valid.push('A5_6_2_4');
        if (!(fon.A5_6_2_5 >= 0 && fon.A5_6_2_5 <= 100))
            valid.push('A5_6_2_5');
        if (!(fon.A5_6_2_6 == 100))
            valid.push('A5_6_2_6');
        results.A5_6 = valid;
        results.A5_6_1 = this.validateSN2_1P5_6_1(fon.A5_6_1);
        return results;
    }
    validateSN2_1P5_6_1(fons: SN2_1P5_6_1[]) {
        let results = [];
        for (let fon of fons) {
            let valid = [];
            if (!(fon.A5_6_1_1 != null))
                valid.push('A5_6_1_1');
            if (!(fon.A5_6_1_2 != null))
                valid.push('A5_6_1_2');
            if (!(fon.A5_6_1_3 != null))
                valid.push('A5_6_1_3');
            results.push(valid);
        }
        return results;
    }
    //Buy
    validateSN2_1P5_7(buy: SN2_1P5_7) {
        let results = []
        if (!(buy.A5_7_1_1_1 >= 0 && buy.A5_7_1_1_1 <= 10000))
            results.push('A5_7_1_1_1');
        if (!(buy.A5_7_1_1_2 >= 0 && buy.A5_7_1_1_2 <= 1000))
            results.push('A5_7_1_1_2');
        if (!(buy.A5_7_1_1_3 >= 0 && buy.A5_7_1_1_3 <= 1000))
            results.push('A5_7_1_1_3');
        if (!(buy.A5_7_1_1_4 >= 0 && buy.A5_7_1_1_4 <= 1000))
            results.push('A5_7_1_1_4');
        if (!(buy.A5_7_1_1_5 >= 0 && buy.A5_7_1_1_5 <= 1000))
            results.push('A5_7_1_1_5');
        if (!(buy.A5_7_1_2_1 >= 0 && buy.A5_7_1_2_1 <= 10000))
            results.push('A5_7_1_2_1');
        if (!(buy.A5_7_1_2_2 >= 0 && buy.A5_7_1_2_2 <= 1000))
            results.push('A5_7_1_2_2');
        if (!(buy.A5_7_1_2_3 >= 0 && buy.A5_7_1_2_3 <= 1000))
            results.push('A5_7_1_2_3');
        if (!(buy.A5_7_1_2_4 >= 0 && buy.A5_7_1_2_4 <= 1000))
            results.push('A5_7_1_2_4');
        if (!(buy.A5_7_1_2_5 >= 0 && buy.A5_7_1_2_5 <= 1000))
            results.push('A5_7_1_2_5');
        if (!(buy.A5_7_1_3_1 >= 0 && buy.A5_7_1_3_1 <= 10000))
            results.push('A5_7_1_3_1');
        if (!(buy.A5_7_1_3_2 >= 0 && buy.A5_7_1_3_2 <= 1000))
            results.push('A5_7_1_3_2');
        if (!(buy.A5_7_1_3_3 >= 0 && buy.A5_7_1_3_3 <= 1000))
            results.push('A5_7_1_3_3');
        if (!(buy.A5_7_1_3_4 >= 0 && buy.A5_7_1_3_4 <= 1000))
            results.push('A5_7_1_3_4');
        if (!(buy.A5_7_1_3_5 >= 0 && buy.A5_7_1_3_5 <= 1000))
            results.push('A5_7_1_3_5');
        if (!(buy.A5_7_1_4_1 >= 0 && buy.A5_7_1_4_1 <= 10000))
            results.push('A5_7_1_4_1');
        if (!(buy.A5_7_1_4_2 >= 0 && buy.A5_7_1_4_2 <= 1000))
            results.push('A5_7_1_4_2');
        if (!(buy.A5_7_1_4_3 >= 0 && buy.A5_7_1_4_3 <= 1000))
            results.push('A5_7_1_4_3');
        if (!(buy.A5_7_1_4_4 >= 0 && buy.A5_7_1_4_4 <= 1000))
            results.push('A5_7_1_4_4');
        if (!(buy.A5_7_1_4_5 >= 0 && buy.A5_7_1_4_5 <= 1000))
            results.push('A5_7_1_4_5');
        if (!(buy.A5_7_1_5 != null))
            results.push('A5_7_1_5');
        if (!(buy.A5_7_1_5_1 >= 0 && buy.A5_7_1_5_1 <= 10000))
            results.push('A5_7_1_5_1');
        if (!(buy.A5_7_1_5_2 >= 0 && buy.A5_7_1_5_2 <= 1000))
            results.push('A5_7_1_5_2');
        if (!(buy.A5_7_1_5_3 >= 0 && buy.A5_7_1_5_3 <= 1000))
            results.push('A5_7_1_5_3');
        if (!(buy.A5_7_1_5_4 >= 0 && buy.A5_7_1_5_4 <= 1000))
            results.push('A5_7_1_5_4');
        if (!(buy.A5_7_1_5_5 >= 0 && buy.A5_7_1_5_5 <= 1000))
            results.push('A5_7_1_5_5');
        return results;
    }

    validateSN2_1P6(flood: SN2_1P6) {
        let result = [];
        if (!(typeof (flood.A6_1) == 'boolean'))
            result.push("A6_1");
        if (!(flood.A6_1 && flood.A6_2_1_1 >= 0 && flood.A6_2_1_1 <= 99))
            result.push("A6_2_1_1");
        if (!(flood.A6_1 && flood.A6_2_1_2 >= 0 && flood.A6_2_1_2 <= 365))
            result.push("A6_2_1_2");
        if (!(flood.A6_1 && flood.A6_2_1_3 >= 0 && flood.A6_2_1_3 <= 24))
            result.push("A6_2_1_3");
        if (!(flood.A6_1 && flood.A6_2_1_4 >= 0 && flood.A6_2_1_4 <= 999))
            result.push("A6_2_1_4");
        if (!(flood.A6_1 && flood.A6_2_2_1 >= 0 && flood.A6_2_2_1 <= 99))
            result.push("A6_2_2_1");
        if (!(flood.A6_1 && flood.A6_2_2_2 >= 0 && flood.A6_2_2_2 <= 365))
            result.push("A6_2_2_2");
        if (!(flood.A6_1 && flood.A6_2_2_3 >= 0 && flood.A6_2_2_3 <= 24))
            result.push("A6_2_2_3");
        if (!(flood.A6_1 && flood.A6_2_2_4 >= 0 && flood.A6_2_2_4 <= 999))
            result.push("A6_2_2_4");
        if (!(flood.A6_1 && flood.A6_2_3_1 >= 0 && flood.A6_2_3_1 <= 99))
            result.push("A6_2_3_1");
        if (!(flood.A6_1 && flood.A6_2_3_2 >= 0 && flood.A6_2_3_2 <= 365))
            result.push("A6_2_3_2");
        if (!(flood.A6_1 && flood.A6_2_3_3 >= 0 && flood.A6_2_3_3 <= 24))
            result.push("A6_2_3_3");
        if (!(flood.A6_1 && flood.A6_2_3_4 >= 0 && flood.A6_2_3_4 <= 999))
            result.push("A6_2_3_4");
        if (!(flood.A6_1 && flood.A6_2_4_1 >= 0 && flood.A6_2_4_1 <= 99))
            result.push("A6_2_4_1");
        if (!(flood.A6_1 && flood.A6_2_4_2 >= 0 && flood.A6_2_4_2 <= 365))
            result.push("A6_2_4_2");
        if (!(flood.A6_1 && flood.A6_2_4_3 >= 0 && flood.A6_2_4_3 <= 24))
            result.push("A6_2_4_3");
        if (!(flood.A6_1 && flood.A6_2_4_4 >= 0 && flood.A6_2_4_4 <= 999))
            result.push("A6_2_4_4");
        if (!(flood.A6_1 && flood.A6_2_5_1 >= 0 && flood.A6_2_5_1 <= 99))
            result.push("A6_2_5_1");
        if (!(flood.A6_1 && flood.A6_2_5_2 >= 0 && flood.A6_2_5_2 <= 365))
            result.push("A6_2_5_2");
        if (!(flood.A6_1 && flood.A6_2_5_3 >= 0 && flood.A6_2_5_3 <= 24))
            result.push("A6_2_5_3");
        if (!(flood.A6_1 && flood.A6_2_5_4 >= 0 && flood.A6_2_5_4 <= 999))
            result.push("A6_2_5_4");
        return result;
    }

    //Validate SN2-2
    validateSN2_2() {
        let results = [];
        for (let sn2_2 of this.SN2_2) {
            let result = {
                SN2_2: [],
                B1_3: [],
                B1_5: [],
                B2_12_1_1: []
            };
            let validates = [];
            if (!(typeof (sn2_2.B1_1) == 'boolean'))
                validates.push("B1_1");
            if (!(sn2_2.B1_1 && sn2_2.B1_2 >= 0 && sn2_2.B1_2 <= 20))
                validates.push("B1_2");
            if (!(typeof (sn2_2.B1_4_1) == 'boolean'))
                validates.push("B1_4_1");
            if (!(typeof (sn2_2.B1_4_2) == 'boolean'))
                validates.push("B1_4_2");
            if (!(typeof (sn2_2.B1_4_3) == 'boolean'))
                validates.push("B1_4_3");
            if (!(typeof (sn2_2.B1_5_1) == 'boolean'))
                validates.push("B1_5_1");
            if (!(sn2_2.B1_5_1 && sn2_2.B1_5_2 >= 0 && sn2_2.B1_5_2 <= 5))
                validates.push("B1_5_2");
            if (!(typeof (sn2_2.B1_9) == 'boolean'))
                validates.push("B1_9");
            if (!(typeof (sn2_2.B1_10) == 'boolean'))
                validates.push("B1_10");
            if (!(sn2_2.B1_10 && (sn2_2.B1_10_1 || sn2_2.B1_10_2 || sn2_2.B1_10_3 || sn2_2.B1_10_4 || sn2_2.B1_10_5 || sn2_2.B1_10_6 || sn2_2.B1_10_7 || sn2_2.B1_10_8 || sn2_2.B1_10_9 || sn2_2.B1_10_10)))
                validates.push("B1_10_1");
            if (!(typeof (sn2_2.B1_11) == 'boolean'))
                validates.push("B1_11");
            if (!(sn2_2.B1_11 && (sn2_2.B1_11_1 || sn2_2.B1_11_2 || sn2_2.B1_11_3 || sn2_2.B1_11_4)))
                validates.push("B1_11_1");
            if (!(sn2_2.B1_11_4 && sn2_2.B1_11_4_1 != null))
                validates.push("B1_11_4_1");
            if (!(typeof (sn2_2.B2_12) == 'boolean'))
                validates.push('B2_12');
            if (!(sn2_2.B2_12 && sn2_2.B2_12_1 >= 0 && sn2_2.B2_12_1 <= 5))
                validates.push('B2_12_1');
            result.SN2_2 = validates;
            result.B1_3 = sn2_2.B1_1 ? this.validateSN22B1_3(sn2_2.B1_3) : [];
            result.B1_5 = sn2_2.B1_5_1 ? this.validateSN22B1_5(sn2_2.B1_5) : [];
            result.B2_12_1_1 = sn2_2.B2_12 ? this.validateSN22B2_12_1_1(sn2_2.B2_12_1_1) : [];
            results.push(result);
        }
        return results;
    }

    validateSN22B1_3(b1_3: SN2_2P1_3[]) {
        let result = [];
        for (let prj of b1_3) {
            let valid = [];
            if (!(prj.B1_3_1 != null))
                valid.push("B1_3_1");
            if (!(prj.B1_3_2_1 || prj.B1_3_2_2 || prj.B1_3_2_3 || prj.B1_3_2_4 || prj.B1_3_2_5))
                valid.push("B1_3_2");
            if (!(prj.B1_3_2_5 && prj.B1_3_2_5_1 != null))
                valid.push("B1_3_2_5_1");
            if (!(parseInt(prj.B1_3_3) >= 1 && parseInt(prj.B1_3_3) <= 3.2))
                valid.push("B1_3_3");
            if (!(prj.B1_3_3 == '1' && prj.B1_3_3_1 >= 1 && prj.B1_3_3_1 <= 99999))
                valid.push('B1_3_3_1');
            if (!(prj.B1_3_3 == '2' && prj.B1_3_3_2_1 >= 0 && prj.B1_3_3_2_1 <= 999))
                valid.push('B1_3_3_2_1');
            if (!(prj.B1_3_3 == '2' && prj.B1_3_3_2_2 >= 0 && prj.B1_3_3_2_2 <= 3))
                valid.push('B1_3_3_2_2');
            if (!(prj.B1_3_3 == '2' && prj.B1_3_3_2_3 >= 0 && prj.B1_3_3_2_3 <= 99))
                valid.push('B1_3_3_2_3');
            if (!(prj.B1_3_3 == '2' && prj.B1_3_3_2_4 >= 1 && prj.B1_3_3_2_4 <= 99))
                valid.push('B1_3_3_2_4');
            if (!(prj.B1_3_3 == '3.1' && prj.B1_3_3_3_1_1 >= 1 && prj.B1_3_3_3_1_1 <= 999))
                valid.push('B1_3_3_3_1_1');
            if (!(prj.B1_3_3 == '3.1' && prj.B1_3_3_3_1_2 >= 1 && prj.B1_3_3_3_1_2 <= 999))
                valid.push('B1_3_3_3_1_2');
            if (!(prj.B1_3_3 == '3.1' && prj.B1_3_3_3_1_3 >= 1 && prj.B1_3_3_3_1_3 <= 99))
                valid.push('B1_3_3_3_1_3');
            if (!(prj.B1_3_3 == '3.2' && prj.B1_3_3_3_2_1 >= 1 && prj.B1_3_3_3_2_1 <= 99))
                valid.push('B1_3_3_3_2_1');
            if (!(prj.B1_3_3 == '3.2' && prj.B1_3_3_3_2_2 >= 1 && prj.B1_3_3_3_2_2 <= 99))
                valid.push('B1_3_3_3_2_2');
            result.push(valid);
        }
        return result;
    }

    validateSN22B1_5(b1_5: SN2_2P1_5[]) {
        let result = [];
        for (let vil of b1_5) {
            let valid = [];
            if (!(vil.B1_5_2_1 != null))
                valid.push('B1_5_2_1');
            if (!(typeof (vil.B1_5_2_1_1) == 'boolean'))
                valid.push('B1_5_2_1_1');
            if (!(vil.B1_5_2_1_1 && vil.B1_5_2_1_2 >= 1 && vil.B1_5_2_1_2 <= 999999))
                valid.push('B1_5_2_1_2');
            if (!(typeof (vil.B1_5_2_1_3) == 'boolean'))
                valid.push("B1_5_2_1_3");
            if (!(vil.B1_5_2_1_3 && vil.B1_5_2_1_4 >= 1 && vil.B1_5_2_1_4 <= 20))
                valid.push('B1_5_2_1_4');
            if (!(vil.B1_5_2_1_3 && vil.B1_5_2_1_5 >= 1 && vil.B1_5_2_1_5 <= 999999))
                valid.push('B1_5_2_1_5');
            if (!(vil.B1_6 >= 1 && vil.B1_6 <= 99))
                valid.push('B1_6');
            if (!(vil.B1_7 >= 0 && vil.B1_7 <= 9999))
                valid.push('B1_7');
            if (!(vil.B1_8 >= 1 && vil.B1_8 <= 3))
                valid.push('B1_8');
            if (!(vil.B1_8 == 2 && vil.B1_8_2 != null))
                valid.push('B1_8_2')
            result.push(valid);
        }
        return result;
    }

    validateSN22B2_12_1_1(b2_12: SN2_2P2_12[]) {
        let result = [];
        for (let prj of b2_12) {
            let valid = [];
            if (!(prj.B2_12_1_1 != null))
                valid.push('B2_12_1_1');
            if (!(prj.B2_13_1 >= 0 && prj.B2_13_1 <= 999999))
                valid.push('B2_13_1');
            if (!(prj.B2_13_2 >= 0 && prj.B2_13_2 <= 3))
                valid.push('B2_13_2');
            if (!(prj.B2_13_3 >= 0 && prj.B2_13_3 <= 99))
                valid.push('B2_13_3');
            if (!(prj.B2_14 >= 0 && prj.B2_14 <= 9999))
                valid.push('B2_14');
            if (!(prj.B2_15 >= 0 && prj.B2_15 <= 99999999))
                valid.push('B2_15')
            if (!(prj.B2_16 >= 0 && prj.B2_16 <= 99))
                valid.push('B2_16')
            if (!(prj.B2_17 >= 0 && prj.B2_17 <= 99999999))
                valid.push('B2_16')
            result.push(valid);
        }
        return result;
    }
}