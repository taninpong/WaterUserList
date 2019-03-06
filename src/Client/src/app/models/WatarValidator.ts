import { SN1 } from "./SN1/SN1";
import { SN2_2 } from "./SN2_2/SN2_2";
import { EX_PUMP_BADAN_LIST, EX_PUMP_GROUND_LIST } from "./SN2_1/pumpData";
import { SN1P3 } from "./SN1/SN1P3";
import { SN1P2 } from "./SN1/SN1P2";

export class TabWater {
    city_tab: number;
    country_tab: number;
    other_tab: number;
}

export class WaterActivity {
    tab: number;
    badan: number;
    river: number;
    sra: number;
    chon: number;
    fon: number;
    buy: number;
}


export class WaterValidator {
    sn1: SN1;
    sn2_2?: SN2_2[];

    // validateWaterConsume() {
    //     this.sn1.SN1P2.forEach(p2 => {
    //         p2.H3.forEach(
    //             p3 => {
    //                 if (p3.WaterData.G1) {
    //                     this.calculateWaterConsumtion()
    //                 }
    //                 if (p3.WaterData.G2) {

    //                 }
    //                 if (p3.WaterData.G3) {

    //                 }
    //                 if (p3.WaterData.G4) {

    //                 }
    //             }
    //         )
    //     });
    // }
    calculateTabWater() {
        let tab_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            tab_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let tw: TabWater = new TabWater();
                    tw.city_tab = 0;
                    tw.country_tab = 0;
                    tw.other_tab = 0;
                    if (p3.WaterData.tapWater) {
                        if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_1_1) {
                            if (!p3.SN2_1.A5.A5_1.A5_1_1_1_3_2_1) {
                                tw.city_tab = p3.SN2_1.A5.A5_1.A5_1_1_1_3_1;
                            } else {
                                if (p2.A8 == '1' || p2.A8 == '2' || p2.A8 == '3' || p2.A8 == '4' || p2.A8 == '10' || p2.A8 == '14') {
                                    tw.city_tab = (p3.SN2_1.A5.A5_1.A5_1_1_1_3_2 / 10.5);
                                }
                                else {
                                    tw.city_tab = (p3.SN2_1.A5.A5_1.A5_1_1_1_3_2 / 13);
                                }
                            }
                        }
                        if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_2_1) {
                            if (!p3.SN2_1.A5.A5_1.A5_1_1_2_3_2_1) {
                                tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_1);
                            } else {
                                if (p2.A8 == '1' || p2.A8 == '2' || p2.A8 == '3' || p2.A8 == '4' || p2.A8 == '10' || p2.A8 == '14') {
                                    tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_2 / 16.6);
                                }
                                else {
                                    tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_2 / 26);
                                }
                            }
                        }
                        if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_3_1) {
                            if (!p3.SN2_1.A5.A5_1.A5_1_1_3_3_2_1) {
                                tw.other_tab = (p3.SN2_1.A5.A5_1.A5_1_1_3_3_1);
                            } else {
                                tw.other_tab = this.calculateOtherTabWaterPrice(p3.SN2_1.A5.A5_1.A5_1_1_3_3_2);
                            }
                        }
                    }
                    tab_water[building_n].push((tw.city_tab + tw.country_tab + tw.other_tab) * 12);
                });
            }
            building_n += 1;
        });
        return tab_water;
    }
    private calculateOtherTabWaterPrice(price) {
        let miter_price = [];
        let water_price = [];
        this.sn2_2.forEach(sn => {
            if (sn.B1_4_3 && sn.B1_5_1) {
                sn.B1_5.forEach(p => {
                    water_price.push(p.B1_6);
                    miter_price.push(p.B1_7);
                });
            }
        });
        return (price - miter_price.reduce((x, y) => x + y)) / (water_price.reduce((x, y) => x + y) / water_price.length)
    }

    calculateBadanWater() {
        let badan_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            badan_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let pbw = [];
                    let pubBw = [];
                    if (p3.WaterData.groundWater) {
                        if (p3.SN2_1.A5.A5_2.A5_2_1) {
                            p3.SN2_1.A5.A5_2.A5_2_3.forEach(piv => {
                                if (!piv.A5_2_3_1_2) {
                                    pbw.push(piv.A5_2_3_1);
                                } else {
                                    if (piv.A5_2_3_2) {
                                        let consume_list = [];
                                        piv.A5_2_3_3_1.forEach(pump => {
                                            if (!pump.A5_2_3_4_1_1) {
                                                if (!pump.A5_2_3_4_3_1) {
                                                    consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                                } else {
                                                    console.log(pump);
                                                    let water = (EX_PUMP_BADAN_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                                    consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                                }
                                            }
                                        });
                                        try {
                                            let content = consume_list.reduce((x, y) => x + y) / 12;
                                            pbw.push(content);
                                        } catch (err) { }
                                    } else {
                                        pbw.push(0);
                                    }
                                }
                            });
                        }
                        if (p3.SN2_1.A5.A5_2.A5_2_4) {
                            p3.SN2_1.A5.A5_2.A5_2_6.forEach(pub => {
                                if (!pub.A5_2_3_1_2) {
                                    pubBw.push(pub.A5_2_3_1);
                                } else {
                                    if (pub.A5_2_3_2) {
                                        let consume_list = [];
                                        pub.A5_2_3_3_1.forEach(pump => {
                                            if (!pump.A5_2_3_4_1_1) {
                                                if (!pump.A5_2_3_4_3_1) {
                                                    consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                                } else {
                                                    console.log(pump);
                                                    let water = (EX_PUMP_BADAN_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                                    consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                                }
                                            }
                                        });
                                        try {
                                            let content = consume_list.reduce((x, y) => x + y) / 12;
                                            pubBw.push(content);
                                        } catch (error) { }
                                    } else {
                                        pubBw.push(0);
                                    }
                                }
                            });
                        }
                    }
                    let content_piv = pbw.length > 0 ? pbw.reduce((x, y) => x + y) : 0;
                    let content_pub = pubBw.length > 0 ? pubBw.reduce((x, y) => x + y) : 0;
                    badan_water[building_n].push((content_piv + content_pub) * 12);
                });
            }
            building_n += 1;
        });
        return badan_water;
    }

    calculateRiver() {
        let river_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            river_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let water = 0;
                    if (p3.WaterData.riverWater) {
                        if (!p3.SN2_1.A5.A5_3.A5_3_1_1) {
                            water = p3.SN2_1.A5.A5_3.A5_3_1;
                        } else {
                            if (p3.SN2_1.A5.A5_3.A5_3_2) {
                                let wp = [];
                                p3.SN2_1.A5.A5_3.A5_3_3_1.forEach(pump => {
                                    if (!pump.A5_2_3_4_1_1) {
                                        wp.push(pump.A5_2_3_4_1);
                                    } else {
                                        if (!pump.A5_2_3_4_3_1) {
                                            wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                        } else {
                                            let wc = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                            wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * wc));
                                        }
                                    }
                                });
                                try {
                                    let content = wp.reduce((x, y) => x + y) / 12;
                                    water = content;
                                } catch (error) { }
                            }
                        }
                    }
                    river_water[building_n].push(water * 12);
                });
            }
            building_n += 1;
        });
        return river_water;
    }

    calculateSraWater() {
        let sra_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            sra_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let sra = [];
                    if (p3.SN2_1.A5.A5_4.A5_4_1) {
                        p3.SN2_1.A5.A5_4.A5_4_4_1.forEach(s => {
                            if (!s.A5_4_4_1_2) {
                                sra.push(s.A5_4_4_1);
                            } else {
                                if (s.A5_4_4_2) {
                                    let consume_list = [];
                                    s.A5_4_4_4.forEach(pump => {
                                        if (!pump.A5_2_3_4_1_1) {
                                            if (!pump.A5_2_3_4_3_1) {
                                                consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                            } else {
                                                let water = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                                consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                            }
                                        }
                                    });
                                    try {
                                        let content = consume_list.reduce((x, y) => x + y) / 12;
                                        sra.push(content);
                                    } catch (error) { }
                                } else {
                                    sra.push(0);
                                }
                            }
                        });
                    }
                    let content_sra = sra.length > 0 ? sra.reduce((x, y) => x + y) : 0;
                    sra_water[building_n].push((content_sra) * 12);
                });
            }
            building_n += 1;
        });
        return sra_water;
    }

    calculateChon() {
        let chon_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            chon_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let water = 0;
                    if (p3.WaterData.chonWater) {
                        if (!p3.SN2_1.A5.A5_5.A5_5_1_1) {
                            water = p3.SN2_1.A5.A5_5.A5_5_1;
                        } else {
                            if (p3.SN2_1.A5.A5_5.A5_5_2) {
                                let wp = [];
                                p3.SN2_1.A5.A5_5.A5_5_3_1.forEach(pump => {
                                    if (!pump.A5_2_3_4_1_1) {
                                        wp.push(pump.A5_2_3_4_1);
                                    } else {
                                        if (!pump.A5_2_3_4_3_1) {
                                            wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                        } else {
                                            let wc = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                            wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * wc));
                                        }
                                    }
                                });
                                try {
                                    let content = wp.reduce((x, y) => x + y) / 12;
                                    water = content;
                                } catch (error) { }
                            }
                        }
                    }
                    chon_water[building_n].push(water * 12);
                });
            }
            building_n += 1;
        });
        return chon_water;
    }
    calculateFon() {
        let fon_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            fon_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let fon_list = [];
                    if (p3.WaterData.rainWater) {
                        p3.SN2_1.A5.A5_6.A5_6_1.forEach(p6 => {
                            fon_list.push(p6.A5_6_1_2 * p6.A5_6_1_3);
                        });
                    }
                    let content = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) / 1000 : 0;
                    fon_water[building_n].push(content);
                });
            }
            building_n += 1;
        });
        return fon_water;
    }
    calculateBuyWater() {
        let buy_water = [];
        let building_n = 0;
        this.sn1.SN1P2.forEach(p2 => {
            buy_water.push([]);
            if (p2.H3) {
                p2.H3.forEach(p3 => {
                    let content_buy = 0;
                    if (p3.WaterData.buyWater) {
                        let a7_1_1 = p3.SN2_1.A5.A5_7.A5_7_1_1_1 ? p3.SN2_1.A5.A5_7.A5_7_1_1_1 : 0;
                        let a7_1_2 = p3.SN2_1.A5.A5_7.A5_7_1_1_2 ? p3.SN2_1.A5.A5_7.A5_7_1_1_2 : 0;
                        let a7_1_3 = p3.SN2_1.A5.A5_7.A5_7_1_1_3 ? p3.SN2_1.A5.A5_7.A5_7_1_1_3 : 0;
                        let a7_1_4 = p3.SN2_1.A5.A5_7.A5_7_1_1_4 ? p3.SN2_1.A5.A5_7.A5_7_1_1_4 : 0;
                        let a7_1_5 = p3.SN2_1.A5.A5_7.A5_7_1_1_5 ? p3.SN2_1.A5.A5_7.A5_7_1_1_5 : 0;
                        let a7_2_1 = p3.SN2_1.A5.A5_7.A5_7_1_2_1 ? p3.SN2_1.A5.A5_7.A5_7_1_2_1 : 0;
                        let a7_2_2 = p3.SN2_1.A5.A5_7.A5_7_1_2_2 ? p3.SN2_1.A5.A5_7.A5_7_1_2_2 : 0;
                        let a7_2_3 = p3.SN2_1.A5.A5_7.A5_7_1_2_3 ? p3.SN2_1.A5.A5_7.A5_7_1_2_3 : 0;
                        let a7_2_4 = p3.SN2_1.A5.A5_7.A5_7_1_2_4 ? p3.SN2_1.A5.A5_7.A5_7_1_2_4 : 0;
                        let a7_2_5 = p3.SN2_1.A5.A5_7.A5_7_1_2_5 ? p3.SN2_1.A5.A5_7.A5_7_1_2_5 : 0;
                        let a7_3_1 = p3.SN2_1.A5.A5_7.A5_7_1_3_1 ? p3.SN2_1.A5.A5_7.A5_7_1_3_1 : 0;
                        let a7_3_2 = p3.SN2_1.A5.A5_7.A5_7_1_3_2 ? p3.SN2_1.A5.A5_7.A5_7_1_3_2 : 0;
                        let a7_3_3 = p3.SN2_1.A5.A5_7.A5_7_1_3_3 ? p3.SN2_1.A5.A5_7.A5_7_1_3_3 : 0;
                        let a7_3_4 = p3.SN2_1.A5.A5_7.A5_7_1_3_4 ? p3.SN2_1.A5.A5_7.A5_7_1_3_4 : 0;
                        let a7_3_5 = p3.SN2_1.A5.A5_7.A5_7_1_3_5 ? p3.SN2_1.A5.A5_7.A5_7_1_3_5 : 0;
                        let a7_4_1 = p3.SN2_1.A5.A5_7.A5_7_1_4_1 ? p3.SN2_1.A5.A5_7.A5_7_1_4_1 : 0;
                        let a7_4_2 = p3.SN2_1.A5.A5_7.A5_7_1_4_2 ? p3.SN2_1.A5.A5_7.A5_7_1_4_2 : 0;
                        let a7_4_3 = p3.SN2_1.A5.A5_7.A5_7_1_4_3 ? p3.SN2_1.A5.A5_7.A5_7_1_4_3 : 0;
                        let a7_4_4 = p3.SN2_1.A5.A5_7.A5_7_1_4_4 ? p3.SN2_1.A5.A5_7.A5_7_1_4_4 : 0;
                        let a7_4_5 = p3.SN2_1.A5.A5_7.A5_7_1_4_5 ? p3.SN2_1.A5.A5_7.A5_7_1_4_5 : 0;
                        let a7_5_1 = p3.SN2_1.A5.A5_7.A5_7_1_5_1 ? p3.SN2_1.A5.A5_7.A5_7_1_5_1 : 0;
                        let a7_5_2 = p3.SN2_1.A5.A5_7.A5_7_1_5_2 ? p3.SN2_1.A5.A5_7.A5_7_1_5_2 : 0;
                        let a7_5_3 = p3.SN2_1.A5.A5_7.A5_7_1_5_3 ? p3.SN2_1.A5.A5_7.A5_7_1_5_3 : 0;
                        let a7_5_4 = p3.SN2_1.A5.A5_7.A5_7_1_5_4 ? p3.SN2_1.A5.A5_7.A5_7_1_5_4 : 0;
                        let a7_5_5 = p3.SN2_1.A5.A5_7.A5_7_1_5_5 ? p3.SN2_1.A5.A5_7.A5_7_1_5_5 : 0;

                        content_buy = ((a7_1_1 * (a7_1_2 + a7_1_3 + a7_1_4 + a7_1_5) / 1000000) +
                            (a7_2_1 * (a7_2_2 + a7_2_3 + a7_2_4 + a7_2_5) / 1000) +
                            (a7_3_1 * (a7_3_2 + a7_3_3 + a7_3_4 + a7_3_5) / 1000) +
                            (a7_4_1 * (a7_4_2 + a7_4_3 + a7_4_4 + a7_4_5) / 1000) +
                            (a7_5_1 * (a7_5_2 + a7_5_3 + a7_5_4 + a7_5_5) / 1000)) * 12
                    }
                    buy_water[building_n].push(content_buy);
                });
            }
            building_n += 1;
        });
        return buy_water;
    }

    validateAreaWater() {
        let result = true;
        this.sn1.SN1P2.forEach(sn12 => {
            if (!this.validateBuildingWater(sn12)) {
                result = false;
            }
        });
        return result;
    }

    calculateAreaWater() {
        let results = [];
        this.sn1.SN1P2.forEach(sn12 => {
            results.push(this.calculateBuildingWater(sn12)[0])
        });
        return results;
    }

    validateBuildingWater(p2: SN1P2) {
        let result = true;
        if (p2.H3) {
            p2.H3.forEach(p3 => {
                if (!this.validateHHWater(p2, p3)[0]) {
                    result = false;
                }
            });
        }
        return result;
    }

    calculateBuildingWater(p2: SN1P2) {
        let results = [];
        let resultsData = [];
        let cal_var = []
        if (p2.H3) {
            p2.H3.forEach(p3 => {
                let resultData = [];
                let waterdata = this.calculateHHWater(p2, p3)[0];
                cal_var = cal_var.concat(this.calculateHHWater(p2, p3)[1]);
                let validWaterConsume = true;
                if (p3.WaterData.G1) {
                    let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy) / (p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
                    resultData.push(waterConsume);
                    validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
                }
                if (p3.WaterData.G2) {
                    //let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy)/(p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
                    //validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
                }
                if (p3.WaterData.G3) {
                    //let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy)/(p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
                    //validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
                }
                if (p3.WaterData.G4) {
                    if (p3.SN2_1.A4.A4_5 == 'S36') {
                        let ps0 = p3.SN2_1.A4.A4_6_1_1_1 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let ps1 = p3.SN2_1.A4.A4_6_1_1_2 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let ps2 = p3.SN2_1.A4.A4_6_1_1_3 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let ps3 = p3.SN2_1.A4.A4_6_1_1_4 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let ps4 = p3.SN2_1.A4.A4_6_1_1_5 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let ps5 = p3.SN2_1.A4.A4_6_1_1_6 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                        let persons = p3.SN2_1.A4.A4_6_1_3 + ps0 + ps1 + ps2 + ps3 + ps4 + ps5;
                        let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (persons);
                        resultData.push(waterConsume);
                        cal_var.push('A4_6_1_1_1');
                        cal_var.push('A4_6_1_1_2');
                        cal_var.push('A4_6_1_1_3');
                        cal_var.push('A4_6_1_1_4');
                        cal_var.push('A4_6_1_1_5');
                        cal_var.push('A4_6_1_1_6');
                        cal_var.push('A4_6_1_2_1');
                        cal_var.push('A4_6_1_3');
                        validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 65.70);
                    } else if (p3.SN2_1.A4.A4_5 == 'S12') {
                        let room = p3.SN2_1.A4.A4_6_2_1;
                        let person = p3.SN2_1.A4.A4_6_2_2;
                        cal_var.push('A4_6_2_1');
                        cal_var.push('A4_6_2_2');
                        let waterConsume1 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.8) / (room);
                        let waterConsume2 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.2) / (person);
                        resultData.push([waterConsume1, waterConsume2]);
                        validWaterConsume = (waterConsume1 >= 14.60 && waterConsume1 <= 262.80) && (waterConsume2 >= 3.65 && waterConsume2 <= 65.70);
                    } else if (p3.SN2_1.A4.A4_5 == 'S37') {
                        let bed = p3.SN2_1.A4.A4_6_3_1;
                        let person = p3.SN2_1.A4.A4_6_3_2;
                        cal_var.push('A4_6_3_1');
                        cal_var.push('A4_6_3_2');
                        let waterConsume1 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.909) / (bed);
                        let waterConsume2 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.091) / (person);
                        validWaterConsume = (waterConsume1 >= 43.80 && waterConsume1 <= 657) && (waterConsume2 >= 3.65 && waterConsume2 <= 65.70);
                        resultData.push([waterConsume1, waterConsume2]);
                    } else if (p3.SN2_1.A4.A4_5 == 'S38') {
                        cal_var.push('A4_6_4_2');
                        cal_var.push('A4_6_4_3');
                        let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / ((p3.SN2_1.A4.A4_6_4_2 * 4) + p3.SN2_1.A4.A4_6_4_3);
                        validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 65.70);
                        resultData.push(waterConsume);
                    } else if (p3.SN2_1.A4.A4_5 == 'S47') {
                        cal_var.push('A4_6_5_1');
                        let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (p3.SN2_1.A4.A4_6_5_1 * 12);
                        validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
                        resultData.push(waterConsume);
                    } else {
                        cal_var.push('A4_6_6_1');
                        let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (p3.SN2_1.A4.A4_6_6_1);
                        validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 262.80);
                        resultData.push(waterConsume);
                    }
                }
                resultsData.push(resultData);
                results.push(validWaterConsume);
            });
        }
        return [results,cal_var];
    }

    validateHHWater(p2: SN1P2, p3: SN1P3) {
        let waterdata = this.calculateHHWater(p2, p3)[0];
        let validWaterConsume = true;
        let cal_var = this.calculateHHWater(p2, p3)[1];
        if (p3.WaterData.G1) {
            let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy) / (p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
            validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
        }
        if (p3.WaterData.G2) {
            //let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy)/(p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
            //validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
        }
        if (p3.WaterData.G3) {
            //let waterConsume = (waterdata[0].tab + waterdata[0].badan + waterdata[0].river + waterdata[0].sra + waterdata[0].chon + waterdata[0].fon + waterdata[0].buy)/(p3.SN2_1.A1.A1_2_1 + p3.SN2_1.A1.A1_2_4 + p3.SN2_1.A1.A1_2_7);
            //validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
        }
        if (p3.WaterData.G4 && p3.SN2_1.A4) {
            if (p3.SN2_1.A4.A4_5 == 'S36') {
                let ps0 = p3.SN2_1.A4.A4_6_1_1_1 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let ps1 = p3.SN2_1.A4.A4_6_1_1_2 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let ps2 = p3.SN2_1.A4.A4_6_1_1_3 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let ps3 = p3.SN2_1.A4.A4_6_1_1_4 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let ps4 = p3.SN2_1.A4.A4_6_1_1_5 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let ps5 = p3.SN2_1.A4.A4_6_1_1_6 ? p3.SN2_1.A4.A4_6_1_2_1 : 0;
                let persons = p3.SN2_1.A4.A4_6_1_3 + ps0 + ps1 + ps2 + ps3 + ps4 + ps5;
                let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (persons);
                validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 65.70);
                cal_var.push('A4_6_1_1_1');
                cal_var.push('A4_6_1_1_2');
                cal_var.push('A4_6_1_1_3');
                cal_var.push('A4_6_1_1_4');
                cal_var.push('A4_6_1_1_5');
                cal_var.push('A4_6_1_1_6');
                cal_var.push('A4_6_1_2_1');
                cal_var.push('A4_6_1_3');
            } else if (p3.SN2_1.A4.A4_5 == 'S12') {
                let room = p3.SN2_1.A4.A4_6_2_1;
                let person = p3.SN2_1.A4.A4_6_2_2;
                let waterConsume1 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.8) / (room);
                let waterConsume2 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.2) / (person);
                validWaterConsume = (waterConsume1 >= 14.60 && waterConsume1 <= 262.80) && (waterConsume2 >= 3.65 && waterConsume2 <= 65.70);
                cal_var.push('A4_6_2_1');
                cal_var.push('A4_6_2_2');
            } else if (p3.SN2_1.A4.A4_5 == 'S37') {
                let bed = p3.SN2_1.A4.A4_6_3_1;
                let person = p3.SN2_1.A4.A4_6_3_2;
                cal_var.push('A4_6_3_1');
                cal_var.push('A4_6_3_2');
                let waterConsume1 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.909) / (bed);
                let waterConsume2 = ((waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) * 0.091) / (person);
                validWaterConsume = (waterConsume1 >= 43.80 && waterConsume1 <= 657) && (waterConsume2 >= 3.65 && waterConsume2 <= 65.70);

            } else if (p3.SN2_1.A4.A4_5 == 'S38') {
                let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / ((p3.SN2_1.A4.A4_6_4_2 * 4) + p3.SN2_1.A4.A4_6_4_3);
                validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 65.70);
                cal_var.push('A4_6_4_2');
                cal_var.push('A4_6_4_3');
            } else if (p3.SN2_1.A4.A4_5 == 'S47') {
                let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (p3.SN2_1.A4.A4_6_5_1 * 12);
                validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 164.25);
                cal_var.push('A4_6_5_1');
            } else {
                let waterConsume = (waterdata[5].tab + waterdata[5].badan + waterdata[5].river + waterdata[5].sra + waterdata[5].chon + waterdata[5].fon + waterdata[5].buy) / (p3.SN2_1.A4.A4_6_6_1);
                validWaterConsume = (waterConsume >= 3.65 && waterConsume <= 262.80);
                cal_var.push('A4_6_6_1');
            }
        }
        return [validWaterConsume,cal_var];
    }

    calculateHHWater(p2: SN1P2, p3: SN1P3) {
        let cal_var = [];
        let consumeW: WaterActivity = new WaterActivity();
        let asaiW: WaterActivity = new WaterActivity();
        let naW: WaterActivity = new WaterActivity();
        let farmW: WaterActivity = new WaterActivity();
        let productW: WaterActivity = new WaterActivity();
        let serviceW: WaterActivity = new WaterActivity();
        //Tab
        let tw: TabWater = new TabWater();
        tw.city_tab = 0;
        tw.country_tab = 0;
        tw.other_tab = 0;
        if (p3.WaterData.tapWater) {
            try {
                if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_1_1) {
                    if (!p3.SN2_1.A5.A5_1.A5_1_1_1_3_2_1) {
                        tw.city_tab = p3.SN2_1.A5.A5_1.A5_1_1_1_3_1;
                        cal_var.push('A5_1_1_1_3_1')
                    } else {
                        if (p2.A8 == '1' || p2.A8 == '2' || p2.A8 == '3' || p2.A8 == '4' || p2.A8 == '10' || p2.A8 == '14') {
                            tw.city_tab = (p3.SN2_1.A5.A5_1.A5_1_1_1_3_2 / 10.5);
                            cal_var.push('A5_1_1_1_3_2')
                        }
                        else {
                            tw.city_tab = (p3.SN2_1.A5.A5_1.A5_1_1_1_3_2 / 13);
                            cal_var.push('A5_1_1_1_3_2')
                        }
                    }
                }
                if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_2_1) {
                    if (!p3.SN2_1.A5.A5_1.A5_1_1_2_3_2_1) {
                        tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_1);
                        cal_var.push('A5_1_1_2_3_1')
                    } else {
                        if (p2.A8 == '1' || p2.A8 == '2' || p2.A8 == '3' || p2.A8 == '4' || p2.A8 == '10' || p2.A8 == '14') {
                            tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_2 / 16.6);
                            cal_var.push('A5_1_1_2_3_2')
                        }
                        else {
                            tw.country_tab = (p3.SN2_1.A5.A5_1.A5_1_1_2_3_2 / 26);
                            cal_var.push('A5_1_1_2_3_2')
                        }
                    }
                }
                if (p3.SN2_1.A5.A5_1 && p3.SN2_1.A5.A5_1.A5_1_1_3_1) {
                    if (!p3.SN2_1.A5.A5_1.A5_1_1_3_3_2_1) {
                        tw.other_tab = (p3.SN2_1.A5.A5_1.A5_1_1_3_3_1);
                        cal_var.push('A5_1_1_3_3_1')
                    } else {
                        tw.other_tab = this.calculateOtherTabWaterPrice(p3.SN2_1.A5.A5_1.A5_1_1_3_3_2);
                        cal_var.push('A5_1_1_3_3_2')
                    }
                }
                consumeW.tab = (((tw.city_tab + tw.country_tab) * (p3.SN2_1.A5.A5_1.A5_1_2_1_1 / 100)) + (tw.other_tab * (p3.SN2_1.A5.A5_1.A5_1_2_1_2 / 100))) * 12
                asaiW.tab = (((tw.city_tab + tw.country_tab) * (p3.SN2_1.A5.A5_1.A5_1_2_2_1 / 100)) + (tw.other_tab * (p3.SN2_1.A5.A5_1.A5_1_2_2_2 / 100))) * 12
                farmW.tab = (((tw.city_tab + tw.country_tab) * (p3.SN2_1.A5.A5_1.A5_1_2_3_1 / 100)) + (tw.other_tab * (p3.SN2_1.A5.A5_1.A5_1_2_3_2 / 100))) * 12
                productW.tab = (((tw.city_tab + tw.country_tab) * (p3.SN2_1.A5.A5_1.A5_1_2_4_1 / 100)) + (tw.other_tab * (p3.SN2_1.A5.A5_1.A5_1_2_4_2 / 100))) * 12
                serviceW.tab = (((tw.city_tab + tw.country_tab) * (p3.SN2_1.A5.A5_1.A5_1_2_5_1 / 100)) + (tw.other_tab * (p3.SN2_1.A5.A5_1.A5_1_2_5_2 / 100))) * 12
                cal_var.push('A5_1_2_1_1');
                cal_var.push('A5_1_2_2_1');
                cal_var.push('A5_1_2_3_1');
                cal_var.push('A5_1_2_4_1');
                cal_var.push('A5_1_2_5_1');
                cal_var.push('A5_1_2_1_2');
                cal_var.push('A5_1_2_2_2');
                cal_var.push('A5_1_2_3_2');
                cal_var.push('A5_1_2_4_2');
                cal_var.push('A5_1_2_5_2');
            } catch (err) {
                console.log(err);
                consumeW.tab = 0;
                asaiW.tab = 0;
                farmW.tab = 0;
                productW.tab = 0;
                serviceW.tab = 0;
            }
        } else {
            consumeW.tab = 0;
            asaiW.tab = 0;
            farmW.tab = 0;
            productW.tab = 0;
            serviceW.tab = 0;
        }


        //Badan
        let ConsumePbw = [];
        let ConsumePubBw = [];
        let AsaiPbw = [];
        let AsaiPubBw = [];
        let NaPbw = [];
        let NaPubBw = [];
        let FarmPbw = [];
        let FarmPubBw = [];
        let ProdPbw = [];
        let ProdPubBw = [];
        let ServePbw = [];
        let ServePubBw = [];
        if (p3.WaterData.groundWater) {
            try {
                if (p3.SN2_1.A5.A5_2.A5_2_1) {
                    p3.SN2_1.A5.A5_2.A5_2_3.forEach(piv => {
                        if (!piv.A5_2_3_1_2) {
                            ConsumePbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_1 / 100));
                            AsaiPbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_2 / 100));
                            NaPbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_3 / 100));
                            FarmPbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_4 / 100));
                            ProdPbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_5 / 100));
                            ServePbw.push(piv.A5_2_3_1 * (piv.A5_2_3_5_6 / 100))
                            cal_var.push('A5_2_3_1');
                            cal_var.push('A5_2_3_5_1');
                            cal_var.push('A5_2_3_5_2');
                            cal_var.push('A5_2_3_5_3');
                            cal_var.push('A5_2_3_5_4');
                            cal_var.push('A5_2_3_5_5');
                            cal_var.push('A5_2_3_5_6');
                        } else {
                            if (piv.A5_2_3_2) {
                                let consume_list = [];
                                piv.A5_2_3_3_1.forEach(pump => {
                                    if (!pump.A5_2_3_4_1_1) {
                                        if (!pump.A5_2_3_4_3_1) {
                                            consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                            cal_var.push('A5_2_3_4_1');
                                            cal_var.push('A5_2_3_4_2');
                                            cal_var.push('A5_2_3_4_3');
                                        } else {
                                            if (pump.A5_2_3_4_4 && pump.A5_2_3_4_5 && pump.A5_2_3_4_6 && pump.A5_2_3_4_7 && pump.A5_2_3_4_8) {
                                                console.log(pump);
                                                let water = (EX_PUMP_BADAN_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                                consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                                cal_var.push('A5_2_3_4_4');
                                                cal_var.push('A5_2_3_4_5');
                                                cal_var.push('A5_2_3_4_6');
                                                cal_var.push('A5_2_3_4_7');
                                                cal_var.push('A5_2_3_4_8');
                                            }
                                        }
                                    }
                                });
                                try {
                                    let content = consume_list.reduce((x, y) => x + y) / 12;
                                    ConsumePbw.push(content * (piv.A5_2_3_5_1 / 100));
                                    AsaiPbw.push(content * (piv.A5_2_3_5_2 / 100));
                                    NaPbw.push(content * (piv.A5_2_3_5_3 / 100));
                                    FarmPbw.push(content * (piv.A5_2_3_5_4 / 100));
                                    ProdPbw.push(content * (piv.A5_2_3_5_5 / 100));
                                    ServePbw.push(content * (piv.A5_2_3_5_6 / 100));
                                    cal_var.push('A5_2_3_5_1');
                                    cal_var.push('A5_2_3_5_2');
                                    cal_var.push('A5_2_3_5_3');
                                    cal_var.push('A5_2_3_5_4');
                                    cal_var.push('A5_2_3_5_5');
                                    cal_var.push('A5_2_3_5_6');
                                } catch (error) { }
                            } else {
                                ConsumePbw.push(0);
                                AsaiPbw.push(0);
                                NaPbw.push(0);
                                FarmPbw.push(0);
                                ProdPbw.push(0);
                                ServePbw.push(0);
                            }
                        }
                    });
                }
                if (p3.SN2_1.A5.A5_2.A5_2_4) {
                    p3.SN2_1.A5.A5_2.A5_2_6.forEach(pub => {
                        if (!pub.A5_2_3_1_2) {
                            ConsumePubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_1 / 100));
                            AsaiPubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_2 / 100));
                            NaPubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_3 / 100));
                            FarmPubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_4 / 100));
                            ProdPubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_5 / 100));
                            ServePubBw.push(pub.A5_2_3_1 * (pub.A5_2_3_5_6 / 100));
                            cal_var.push('A5_2_3_5_1');
                            cal_var.push('A5_2_3_5_2');
                            cal_var.push('A5_2_3_5_3');
                            cal_var.push('A5_2_3_5_4');
                            cal_var.push('A5_2_3_5_5');
                            cal_var.push('A5_2_3_5_6');
                            cal_var.push('A5_2_3_1');
                        } else {
                            if (pub.A5_2_3_2) {
                                let consume_list = [];
                                pub.A5_2_3_3_1.forEach(pump => {
                                    if (!pump.A5_2_3_4_1_1) {
                                        if (!pump.A5_2_3_4_3_1) {
                                            consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                            cal_var.push('A5_2_3_4_1');
                                            cal_var.push('A5_2_3_4_2');
                                            cal_var.push('A5_2_3_4_3');
                                        } else {
                                            if (pump.A5_2_3_4_4 && pump.A5_2_3_4_5 && pump.A5_2_3_4_6 && pump.A5_2_3_4_7 && pump.A5_2_3_4_8) {
                                                console.log(pump);
                                                cal_var.push('A5_2_3_4_4');
                                                cal_var.push('A5_2_3_4_5');
                                                cal_var.push('A5_2_3_4_6');
                                                cal_var.push('A5_2_3_4_7');
                                                cal_var.push('A5_2_3_4_8');
                                                let water = (EX_PUMP_BADAN_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                                consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                                cal_var.push('A5_2_3_4_1');
                                                cal_var.push('A5_2_3_4_2');
                                            }
                                        }
                                    }
                                });
                                try {
                                    cal_var.push('A5_2_3_5_1');
                                    cal_var.push('A5_2_3_5_2');
                                    cal_var.push('A5_2_3_5_3');
                                    cal_var.push('A5_2_3_5_4');
                                    cal_var.push('A5_2_3_5_5');
                                    cal_var.push('A5_2_3_5_6');
                                    let content = consume_list.reduce((x, y) => x + y) / 12;
                                    ConsumePubBw.push(content * (pub.A5_2_3_5_1 / 100));
                                    AsaiPubBw.push(content * (pub.A5_2_3_5_2 / 100));
                                    NaPubBw.push(content * (pub.A5_2_3_5_3 / 100));
                                    FarmPubBw.push(content * (pub.A5_2_3_5_4 / 100));
                                    ProdPubBw.push(content * (pub.A5_2_3_5_5 / 100));
                                    ServePubBw.push(content * (pub.A5_2_3_5_6 / 100));
                                } catch (error) { }

                            } else {
                                ConsumePubBw.push(0);
                                AsaiPubBw.push(0);
                                NaPubBw.push(0);
                                FarmPubBw.push(0);
                                ProdPubBw.push(0);
                                ServePubBw.push(0);
                            }
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        let content_piv = ConsumePbw.length > 0 ? ConsumePbw.reduce((x, y) => x + y) : 0;
        let content_pub = ConsumePubBw.length > 0 ? ConsumePubBw.reduce((x, y) => x + y) : 0;
        let contentAsai_piv = AsaiPbw.length > 0 ? AsaiPbw.reduce((x, y) => x + y) : 0;
        let contentAsai_pub = AsaiPubBw.length > 0 ? AsaiPubBw.reduce((x, y) => x + y) : 0;
        let contentNa_piv = NaPbw.length > 0 ? NaPbw.reduce((x, y) => x + y) : 0;
        let contentNa_pub = NaPubBw.length > 0 ? NaPubBw.reduce((x, y) => x + y) : 0;
        let contentFarm_piv = FarmPbw.length > 0 ? FarmPbw.reduce((x, y) => x + y) : 0;
        let contentFarm_pub = FarmPubBw.length > 0 ? FarmPubBw.reduce((x, y) => x + y) : 0;
        let contentProd_piv = ProdPbw.length > 0 ? ProdPbw.reduce((x, y) => x + y) : 0;
        let contentProd_pub = ProdPubBw.length > 0 ? ProdPubBw.reduce((x, y) => x + y) : 0;
        let contentServe_piv = ServePbw.length > 0 ? ServePbw.reduce((x, y) => x + y) : 0;
        let contentServe_pub = ServePubBw.length > 0 ? ServePubBw.reduce((x, y) => x + y) : 0;
        consumeW.badan = (content_piv + content_pub) * 12;
        asaiW.badan = (contentAsai_piv + contentAsai_pub) * 12;
        naW.badan = (contentNa_piv + contentNa_pub) * 12;
        farmW.badan = (contentFarm_piv + contentFarm_pub) * 12;
        productW.badan = (contentProd_piv + contentProd_pub) * 12;
        serviceW.badan = (contentServe_piv + contentServe_pub) * 12;
        //river
        let river;
        if (p3.WaterData.riverWater) {
            if (!p3.SN2_1.A5.A5_3.A5_3_1_1) {
                river = p3.SN2_1.A5.A5_3.A5_3_1;
                cal_var.push('A5_3_1');
                if (p3.SN2_1.A5.A5_3.A5_3_2) {
                    let wp = [];
                    p3.SN2_1.A5.A5_3.A5_3_3_1.forEach(pump => {
                        if (!pump.A5_2_3_4_1_1) {
                            if (!pump.A5_2_3_4_3_1) {
                                wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                cal_var.push('A5_2_3_4_1');
                                cal_var.push('A5_2_3_4_2');
                                cal_var.push('A5_2_3_4_3');
                            } else {
                                console.log(pump);
                                if (pump.A5_2_3_4_4 && pump.A5_2_3_4_5 && pump.A5_2_3_4_6 && pump.A5_2_3_4_7 && pump.A5_2_3_4_8) {
                                    cal_var.push('A5_2_3_4_4');
                                    cal_var.push('A5_2_3_4_5');
                                    cal_var.push('A5_2_3_4_6');
                                    cal_var.push('A5_2_3_4_7');
                                    cal_var.push('A5_2_3_4_8');
                                    let water = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                    wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                    cal_var.push('A5_2_3_4_1');
                                    cal_var.push('A5_2_3_4_2');
                                }
                            }
                        }
                    });
                    try {
                        let content = wp.reduce((x, y) => x + y) / 12;
                        river = content;
                    } catch (error) { }
                } else {
                    river = 0;
                }
            }
            consumeW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_1 / 100) * 12;
            asaiW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_2 / 100) * 12;
            naW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_3 / 100) * 12;
            farmW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_4 / 100) * 12;
            productW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_5 / 100) * 12;
            serviceW.river = river * (p3.SN2_1.A5.A5_3.A5_3_4_6 / 100) * 12;
            cal_var.push('A5_3_4_1');
            cal_var.push('A5_3_4_2');
            cal_var.push('A5_3_4_3');
            cal_var.push('A5_3_4_4');
            cal_var.push('A5_3_4_5');
            cal_var.push('A5_3_4_6');
        } else {
            consumeW.river = 0;
            asaiW.river = 0;
            naW.river = 0;
            farmW.river = 0;
            productW.river = 0;
            serviceW.river = 0;
        }

        //sra
        let sraConsume = [];
        let sraAsai = [];
        let sraNa = [];
        let sraFarm = [];
        let sraProd = [];
        let sraServe = [];
        if (p3.WaterData.poolWater) {
            if (p3.SN2_1.A5 && p3.SN2_1.A5.A5_4 && p3.SN2_1.A5.A5_4.A5_4_1) {
                p3.SN2_1.A5.A5_4.A5_4_4_1.forEach(s => {
                    if (!s.A5_4_4_1_2) {
                        sraConsume.push(s.A5_4_4_1 * (s.A5_4_4_5_1 / 100));
                        sraAsai.push(s.A5_4_4_1 * (s.A5_4_4_5_2 / 100));
                        sraNa.push(s.A5_4_4_1 * (s.A5_4_4_5_3 / 100));
                        sraFarm.push(s.A5_4_4_1 * (s.A5_4_4_5_4 / 100));
                        sraProd.push(s.A5_4_4_1 * (s.A5_4_4_5_5 / 100));
                        sraServe.push(s.A5_4_4_1 * (s.A5_4_4_5_6 / 100));
                        cal_var.push('A5_4_4_5_1');
                        cal_var.push('A5_4_4_5_2');
                        cal_var.push('A5_4_4_5_3');
                        cal_var.push('A5_4_4_5_4');
                        cal_var.push('A5_4_4_5_5');
                        cal_var.push('A5_4_4_5_6');
                        cal_var.push('A5_4_4_1');
                    } else {
                        if (s.A5_4_4_2) {
                            let consume_list = [];
                            s.A5_4_4_4.forEach(pump => {
                                if (!pump.A5_2_3_4_1_1) {
                                    if (!pump.A5_2_3_4_3_1) {
                                        consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                        cal_var.push('A5_2_3_4_1');
                                        cal_var.push('A5_2_3_4_2');
                                        cal_var.push('A5_2_3_4_3');
                                    } else {
                                        if (pump.A5_2_3_4_4 && pump.A5_2_3_4_5 && pump.A5_2_3_4_6 && pump.A5_2_3_4_7 && pump.A5_2_3_4_8) {
                                            cal_var.push('A5_2_3_4_4');
                                            cal_var.push('A5_2_3_4_5');
                                            cal_var.push('A5_2_3_4_6');
                                            cal_var.push('A5_2_3_4_7');
                                            cal_var.push('A5_2_3_4_8');
                                            let water = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                            consume_list.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                            cal_var.push('A5_2_3_4_1');
                                            cal_var.push('A5_2_3_4_2');
                                        }
                                    }
                                }
                            });
                            try {
                                let content = consume_list.reduce((x, y) => x + y) / 12;
                                sraConsume.push(content * (s.A5_4_4_5_1 / 100));
                                sraAsai.push(content * (s.A5_4_4_5_2 / 100));
                                sraNa.push(content * (s.A5_4_4_5_3 / 100));
                                sraFarm.push(content * (s.A5_4_4_5_4 / 100));
                                sraProd.push(content * (s.A5_4_4_5_5 / 100));
                                sraServe.push(content * (s.A5_4_4_5_6 / 100));
                                cal_var.push('A5_4_4_5_1');
                                cal_var.push('A5_4_4_5_2');
                                cal_var.push('A5_4_4_5_3');
                                cal_var.push('A5_4_4_5_4');
                                cal_var.push('A5_4_4_5_5');
                                cal_var.push('A5_4_4_5_6');
                            } catch (error) { }
                        } else {
                            sraConsume.push(0);
                            sraAsai.push(0);
                            sraNa.push(0);
                            sraFarm.push(0);
                            sraProd.push(0);
                            sraServe.push(0);
                        }
                    }
                });
            }
        }
        let content_sra = sraConsume.length > 0 ? sraConsume.reduce((x, y) => x + y) : 0;
        let content_asai = sraAsai.length > 0 ? sraAsai.reduce((x, y) => x + y) : 0;
        let content_na = sraNa.length > 0 ? sraNa.reduce((x, y) => x + y) : 0;
        let content_farm = sraFarm.length > 0 ? sraFarm.reduce((x, y) => x + y) : 0;
        let content_prod = sraProd.length > 0 ? sraProd.reduce((x, y) => x + y) : 0;
        let content_serve = sraServe.length > 0 ? sraServe.reduce((x, y) => x + y) : 0;
        consumeW.sra = content_sra * 12;
        asaiW.sra = content_asai * 12;
        naW.sra = content_na * 12;
        farmW.sra = content_farm * 12;
        productW.sra = content_prod * 12;
        serviceW.sra = content_serve * 12;
        //chon
        let chonConsume = 0;
        let chonAsai = 0;
        let chonNa = 0;
        let chonFarm = 0;
        let chonProd = 0;
        let chonServe = 0;
        if (p3.WaterData.chonWater) {
            if (!p3.SN2_1.A5.A5_5.A5_5_1_1) {
                chonConsume = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_1 / 100);
                chonAsai = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_2 / 100);
                chonNa = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_3 / 100);
                chonFarm = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_4 / 100);
                chonProd = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_5 / 100);
                chonServe = p3.SN2_1.A5.A5_5.A5_5_1 * (p3.SN2_1.A5.A5_5.A5_5_4_6 / 100);
                cal_var.push('A5_5_4_1');
                cal_var.push('A5_5_4_2');
                cal_var.push('A5_5_4_3');
                cal_var.push('A5_5_4_4');
                cal_var.push('A5_5_4_5');
                cal_var.push('A5_5_4_6');
                cal_var.push('A5_5_1');
            } else {
                if (p3.SN2_1.A5.A5_5.A5_5_2) {
                    let wp = [];
                    p3.SN2_1.A5.A5_5.A5_5_3_1.forEach(pump => {
                        if (!pump.A5_2_3_4_1_1) {
                            if (!pump.A5_2_3_4_3_1) {
                                wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * pump.A5_2_3_4_3));
                                cal_var.push('A5_2_3_4_1');
                                cal_var.push('A5_2_3_4_2');
                                cal_var.push('A5_2_3_4_3');
                            } else {
                                console.log(pump);
                                if (pump.A5_2_3_4_4 && pump.A5_2_3_4_5 && pump.A5_2_3_4_6 && pump.A5_2_3_4_7 && pump.A5_2_3_4_8) {
                                    let water = (EX_PUMP_GROUND_LIST.filter(b => (b.power == pump.A5_2_3_4_4 && b.type == pump.A5_2_3_4_5 && b.horsepower == pump.A5_2_3_4_6 && b.pipe_con == pump.A5_2_3_4_7 && b.pipe_send == pump.A5_2_3_4_8))[0].water * 60) / 1000;
                                    wp.push((pump.A5_2_3_4_1 * pump.A5_2_3_4_2 * water));
                                    cal_var.push('A5_2_3_4_4');
                                    cal_var.push('A5_2_3_4_5');
                                    cal_var.push('A5_2_3_4_6');
                                    cal_var.push('A5_2_3_4_7');
                                    cal_var.push('A5_2_3_4_8');
                                    cal_var.push('A5_2_3_4_1');
                                    cal_var.push('A5_2_3_4_2');
                                }
                            }
                        }
                    });
                    try {
                        let content = wp.reduce((x, y) => x + y) / 12;
                        chonConsume = content * (p3.SN2_1.A5.A5_5.A5_5_4_1 / 100);
                        chonAsai = content * (p3.SN2_1.A5.A5_5.A5_5_4_2 / 100);
                        chonNa = content * (p3.SN2_1.A5.A5_5.A5_5_4_3 / 100);
                        chonFarm = content * (p3.SN2_1.A5.A5_5.A5_5_4_4 / 100);
                        chonProd = content * (p3.SN2_1.A5.A5_5.A5_5_4_5 / 100);
                        chonServe = content * (p3.SN2_1.A5.A5_5.A5_5_4_6 / 100);
                        cal_var.push('A5_5_4_1');
                        cal_var.push('A5_5_4_2');
                        cal_var.push('A5_5_4_3');
                        cal_var.push('A5_5_4_4');
                        cal_var.push('A5_5_4_5');
                        cal_var.push('A5_5_4_6');
                    } catch (error) { }
                } else {
                    chonConsume = 0;
                    chonAsai = 0;
                    chonNa = 0;
                    chonFarm = 0;
                    chonProd = 0;
                    chonServe = 0;
                }
            }
        }
        consumeW.chon = chonConsume * 12
        asaiW.chon = chonAsai * 12
        naW.chon = chonNa * 12
        farmW.chon = chonFarm * 12
        productW.chon = chonProd * 12
        serviceW.chon = chonServe * 12
        //fon
        let fon_list = [];
        if (p3.WaterData.rainWater) {
            p3.SN2_1.A5.A5_6.A5_6_1.forEach(p6 => {
                fon_list.push(p6.A5_6_1_2 * p6.A5_6_1_3);
            });
            cal_var.push('A5_6_1_2');
            cal_var.push('A5_6_1_3');
            cal_var.push('A5_6_2_1');
            cal_var.push('A5_6_2_2');
            cal_var.push('A5_6_2_3');
            cal_var.push('A5_6_2_4');
            cal_var.push('A5_6_2_5');
        }
        consumeW.fon = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) * (p3.SN2_1.A5.A5_6.A5_6_2_1 / 100) : 0;
        asaiW.fon = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) * (p3.SN2_1.A5.A5_6.A5_6_2_2 / 100) : 0;
        farmW.fon = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) * (p3.SN2_1.A5.A5_6.A5_6_2_3 / 100) : 0;
        productW.fon = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) * (p3.SN2_1.A5.A5_6.A5_6_2_4 / 100) : 0;
        serviceW.fon = fon_list.length > 0 ? fon_list.reduce((x, y) => x + y) * (p3.SN2_1.A5.A5_6.A5_6_2_5 / 100) : 0;
        //buy
        if (p3.WaterData.buyWater) {
            let a7_1_1 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_1 ? p3.SN2_1.A5.A5_7.A5_7_1_1_1 : 0;
            let a7_1_2 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_2 ? p3.SN2_1.A5.A5_7.A5_7_1_1_2 : 0;
            let a7_1_3 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_3 ? p3.SN2_1.A5.A5_7.A5_7_1_1_3 : 0;
            let a7_1_4 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_4 ? p3.SN2_1.A5.A5_7.A5_7_1_1_4 : 0;
            let a7_1_5 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_5 ? p3.SN2_1.A5.A5_7.A5_7_1_1_5 : 0;
            let a7_2_1 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_1 ? p3.SN2_1.A5.A5_7.A5_7_1_2_1 : 0;
            let a7_2_2 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_2 ? p3.SN2_1.A5.A5_7.A5_7_1_2_2 : 0;
            let a7_2_3 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_3 ? p3.SN2_1.A5.A5_7.A5_7_1_2_3 : 0;
            let a7_2_4 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_4 ? p3.SN2_1.A5.A5_7.A5_7_1_2_4 : 0;
            let a7_2_5 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_5 ? p3.SN2_1.A5.A5_7.A5_7_1_2_5 : 0;
            let a7_3_1 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_1 ? p3.SN2_1.A5.A5_7.A5_7_1_3_1 : 0;
            let a7_3_2 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_2 ? p3.SN2_1.A5.A5_7.A5_7_1_3_2 : 0;
            let a7_3_3 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_3 ? p3.SN2_1.A5.A5_7.A5_7_1_3_3 : 0;
            let a7_3_4 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_4 ? p3.SN2_1.A5.A5_7.A5_7_1_3_4 : 0;
            let a7_3_5 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_5 ? p3.SN2_1.A5.A5_7.A5_7_1_3_5 : 0;
            let a7_4_1 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_1 ? p3.SN2_1.A5.A5_7.A5_7_1_4_1 : 0;
            let a7_4_2 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_2 ? p3.SN2_1.A5.A5_7.A5_7_1_4_2 : 0;
            let a7_4_3 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_3 ? p3.SN2_1.A5.A5_7.A5_7_1_4_3 : 0;
            let a7_4_4 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_4 ? p3.SN2_1.A5.A5_7.A5_7_1_4_4 : 0;
            let a7_4_5 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_5 ? p3.SN2_1.A5.A5_7.A5_7_1_4_5 : 0;
            let a7_5_1 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_1 ? p3.SN2_1.A5.A5_7.A5_7_1_5_1 : 0;
            let a7_5_2 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_2 ? p3.SN2_1.A5.A5_7.A5_7_1_5_2 : 0;
            let a7_5_3 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_3 ? p3.SN2_1.A5.A5_7.A5_7_1_5_3 : 0;
            let a7_5_4 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_4 ? p3.SN2_1.A5.A5_7.A5_7_1_5_4 : 0;
            let a7_5_5 = p3.SN2_1.A5 && p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_5 ? p3.SN2_1.A5.A5_7.A5_7_1_5_5 : 0;
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_1)
                cal_var.push('A5_7_1_1_1');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_2)
                cal_var.push('A5_7_1_1_2');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_3)
                cal_var.push('A5_7_1_1_3');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_4)
                cal_var.push('A5_7_1_1_4');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_1_5)
                cal_var.push('A5_7_1_1_5');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_1)
                cal_var.push('A5_7_1_2_1');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_2)
                cal_var.push('A5_7_1_2_2');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_3)
                cal_var.push('A5_7_1_2_3');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_4)
                cal_var.push('A5_7_1_2_4');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_2_5)
                cal_var.push('A5_7_1_2_5');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_1)
                cal_var.push('A5_7_1_3_1');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_2)
                cal_var.push('A5_7_1_3_2');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_3)
                cal_var.push('A5_7_1_3_3');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_4)
                cal_var.push('A5_7_1_3_4');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_3_5)
                cal_var.push('A5_7_1_3_5');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_1)
                cal_var.push('A5_7_1_4_1');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_2)
                cal_var.push('A5_7_1_4_2');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_3)
                cal_var.push('A5_7_1_4_3');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_4)
                cal_var.push('A5_7_1_4_4');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_4_5)
                cal_var.push('A5_7_1_4_5');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_1)
                cal_var.push('A5_7_1_5_1');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_2)
                cal_var.push('A5_7_1_5_2');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_3)
                cal_var.push('A5_7_1_5_3');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_4)
                cal_var.push('A5_7_1_5_4');
            if (p3.SN2_1.A5.A5_7 && p3.SN2_1.A5.A5_7.A5_7_1_5_5)
                cal_var.push('A5_7_1_5_5');
            consumeW.buy = (((a7_1_1 * a7_1_2) / 1000000) +
                ((a7_2_1 * a7_2_2) / 1000) +
                ((a7_3_1 * a7_3_2) / 1000) +
                ((a7_4_1 * a7_4_2) / 1000) +
                ((a7_5_1 * a7_5_2) / 1000)) * 12;
            farmW.buy = (((a7_1_1 * a7_1_3) / 1000000) +
                ((a7_2_1 * a7_2_3) / 1000) +
                ((a7_3_1 * a7_3_3) / 1000) +
                ((a7_4_1 * a7_4_3) / 1000) +
                ((a7_5_1 * a7_5_3) / 1000)) * 12;
            productW.buy = (((a7_1_1 * a7_1_4) / 1000000) +
                ((a7_2_1 * a7_2_4) / 1000) +
                ((a7_3_1 * a7_3_4) / 1000) +
                ((a7_4_1 * a7_4_4) / 1000) +
                ((a7_5_1 * a7_5_4) / 1000)) * 12;
            serviceW.buy = (((a7_1_1 * a7_1_5) / 1000000) +
                ((a7_2_1 * a7_2_5) / 1000) +
                ((a7_3_1 * a7_3_5) / 1000) +
                ((a7_4_1 * a7_4_5) / 1000) +
                ((a7_5_1 * a7_5_5) / 1000)) * 12;
        } else {
            consumeW.buy = 0;
            farmW.buy = 0;
            productW.buy = 0;
            serviceW.buy = 0;
        }
        return [[consumeW, asaiW, naW, farmW, productW, serviceW],cal_var];
    }
}