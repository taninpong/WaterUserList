export class WaterConsumeData {
    tapWater: boolean;
    tapWaterCount: number;
    groundWater: boolean;
    groundWaterCount: number;
    riverWater: boolean;
    riverWaterCount: number;
    poolWater: boolean;
    poolWaterCount: number; 
    chonWater: boolean;
    chonWaterCount: number;
    rainWater: boolean;
    rainWaterCount: number;
    buyWater: boolean;
    buyWaterCount: number;
    G1:boolean;
    G2:boolean;
    G3:boolean;
    G4:boolean;
    G_na:boolean;
    G_asai:boolean;

    addTapWater() {
        this.tapWaterCount = this.tapWaterCount + 1;
        if (this.tapWaterCount > 0) {
            this.tapWater = true;
        }
    }
    rmTapWater() {
        this.tapWaterCount = this.tapWaterCount - 1;
        if (this.tapWaterCount > 0) {
            this.tapWater = true;
        }
        else {
            this.tapWater = false;
        }
    }

    addGroundWater() {
        this.groundWaterCount = this.groundWaterCount + 1;
        if (this.groundWaterCount > 0) {
            this.groundWater = true;
        }
    }
    rmGroundWater() {
        this.groundWaterCount = this.groundWaterCount - 1;
        if (this.groundWaterCount > 0) {
            this.groundWater = true;
        }
        else {
            this.groundWater = false;
        }
    }

    addRiverWater() {
        this.riverWaterCount = this.riverWaterCount + 1;
        if (this.riverWaterCount > 0) {
            this.riverWater = true;
        }
    }
    rmRiverWater() {
        this.riverWaterCount = this.riverWaterCount - 1;
        if (this.riverWaterCount > 0) {
            this.riverWater = true;
        }
        else {
            this.riverWater = false;
        }
    }
    
    addPoolWater(){
        this.poolWaterCount = this.poolWaterCount + 1
        if(this.poolWaterCount > 0){
            this.poolWater = true;
        }
    }
    rmPoolWater(){
        this.poolWaterCount = this.poolWaterCount - 1
        if(this.poolWaterCount > 0){
            this.poolWater = true
        }else{
            this.poolWater = false
        }
    }

    addChonWater() {
        this.chonWaterCount = this.chonWaterCount + 1;
        if (this.chonWaterCount > 0) {
            this.chonWater = true;
        }
    }
    rmChonWater() {
        this.chonWaterCount = this.chonWaterCount - 1;
        if (this.chonWaterCount > 0) {
            this.chonWater = true;
        }
        else {
            this.chonWater = false;
        }
    }

    addRainWater() {
        this.rainWaterCount = this.rainWaterCount + 1;
        if (this.rainWaterCount > 0) {
            this.rainWater = true;
        }
    }
    rmRainWater() {
        this.rainWaterCount = this.rainWaterCount - 1;
        if (this.rainWaterCount > 0) {
            this.rainWater = true;
        }
        else {
            this.rainWater = false;
        }
    }
    addBuyWater() {
        this.buyWaterCount = this.buyWaterCount + 1;
        if (this.buyWaterCount > 0) {
            this.buyWater = true;
        }
    }
    rmBuyWater() {
        this.buyWaterCount = this.buyWaterCount - 1;
        if (this.buyWaterCount > 0) {
            this.buyWater = true;
        }
        else {
            this.buyWater = false;
        }
    }
}