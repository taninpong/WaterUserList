export interface Organization{
    id:string;
    detail:string
}

export const EX_PRODUCT_LIST: Organization[] = [
    {id:"P1",detail:"การผลิตผลิตภัณฑ์อาหาร"},
    {id:"P2",detail:"การผลิตเครื่องดื่ม"},
    {id:"P3",detail:"การผลิตผลิตภัณฑ์ยาสูบ"},
    {id:"P4",detail:"การผลิตสิ่งทอ"},
    {id:"P5",detail:"การผลิตเสื้อผ้าเครื่องแต่งกาย"},
    {id:"P6",detail:"การผลิตเครื่องหนังและผลิตภัณฑ์ที่เกี่ยวข้อง"},
    {id:"P7",detail:"การผลิตไม้และผลิตภัณฑ์จากไม้และไม้ก๊อก (ยกเว้นเฟอร์นิเจอร์) การผลิตสิ่งของจากฟางและวัสดุถักสานอื่น ๆ"},
    {id:"P8",detail:"การผลิตกระดาษและผลิตภัณฑ์กระดาษ"},
    {id:"P9",detail:"การพิมพ์และการผลิตซ้ำสื่อบันทึกข้อมูล"},
    {id:"P10",detail:"การผลิตถ่านโค้กและผลิตภัณฑ์จากการกลั่นปิโตรเลียม"},
    {id:"P11",detail:"การผลิตเคมีภัณฑ์และผลิตภัณฑ์เคมี"},
    {id:"P12",detail:"การผลิตเภสัชภัณฑ์ เคมีภัณฑ์ที่ใช้รักษาโรค และผลิตภัณฑ์จากพืชและสัตว์ที่ใช้รักษาโรค"},
    {id:"P13",detail:"การผลิตผลิตภัณฑ์ยางและพลาสติก"},
    {id:"P14",detail:"การผลิตผลิตภัณฑ์อื่นๆ ที่ทำจากแร่อโลหะ"},
    {id:"P15",detail:"การผลิตโลหะขั้นมูลฐาน"},
    {id:"P16",detail:"การผลิตผลิตภัณฑ์ที่ทำจากโลหะประดิษฐ์ (ยกเว้นเครื่องจักรและอุปกรณ์)"},
    {id:"P17",detail:"การผลิตผลิตภัณฑ์คอมพิวเตอร์ อิเล็กทรอนิกส์ และอุปกรณ์ที่ใช้ในทางทัศนศาสตร์"},
    {id:"P18",detail:"การผลิตอุปกรณ์ไฟฟ้า"},
    {id:"P19",detail:"การผลิตเครื่องจักรและเครื่องมือ ซึ่งมิได้จัดประเภทไว้ในที่อื่น"},
    {id:"P20",detail:"การผลิตยานยนต์ รถพ่วง และรถกึ่งพ่วง"},
    {id:"P21",detail:"การผลิตอุปกรณ์ขนส่งอื่นๆ"},
    {id:"P22",detail:"การผลิตเฟอร์นิเจอร์"},
    {id:"P23",detail:"การผลิตผลิตภัณฑ์ประเภทอื่นๆ"},
    {id:"P24",detail:"การซ่อมและการติดตั้งเครื่องจักรและอุปกรณ์"},
    {id:"P25",detail:"การจัดการน้ำเสีย"},
    {id:"P26",detail:"การเก็บรวบรวมของเสีย การบำบัด และการกำจัดของเสีย รวมถึงการนำของเสียกลับมาใช้ใหม่"},
    {id:"P27",detail:"กิจกรรมการบำบัดและบริการจัดการของเสียอื่นๆ"}, 
]

export const EX_SERVICE_LIST: Organization[] = [
    {id:"S1",detail:"การก่อสร้างอาคาร"},
    {id:"S2",detail:"งานวิศวกรรมโยธา"},
    {id:"S3",detail:"งานก่อสร้างเฉพาะงาน"},
    {id:"S4",detail:"การขายส่งและการขายปลีก การซ่อมยานยนต์และจักรยานยนต์"},
    {id:"S5",detail:"การขายส่ง (ยกเว้นยานยนต์และจักรยานยนต์)"},
    {id:"S6",detail:"การขายปลีก (ยกเว้นยานยนต์และจักรยานยนต์)"},
    {id:"S7",detail:"การขนส่งทางบกและการขนส่งทางท่อลำเลียง"},
    {id:"S8",detail:"การขนส่งทางน้ำ"},
    {id:"S9",detail:"การขนส่งทางอากาศ"},
    {id:"S10",detail:"กิจกรรมคลังสินค้าและกิจกรรมที่สนับสนุนการขนส่ง"},
    {id:"S11",detail:"กิจกรรมไปรษณีย์และการรับส่งพัสดุภัณฑ์"},
    {id:"S12",detail:"ที่พักแรม"},
    {id:"S13",detail:"การบริการอาหารและเครื่องดื่ม"},
    {id:"S14",detail:"การผลิตภาพยนตร์ วีดิทัศน์ และรายการโทรทัศน์ การบันทึกเสียงลงบนสื่อ และการจัดพิมพ์จำหน่ายหรือเผยแพร่ดนตรี"},
    {id:"S15",detail:"การจัดผังรายการและการแพร่ภาพกระจายเสียง"},
    {id:"S16",detail:"การโทรคมนาคม"},
    {id:"S17",detail:"การจัดทำโปรแกรมคอมพิวเตอร์ การให้คำปรึกษาเกี่ยวกับคอมพิวเตอร์ และกิจกรรมที่เกี่ยวข้อง"},
    {id:"S18",detail:"การบริการสารสนเทศ"},
    {id:"S19",detail:"กิจกรรมบริการทางการเงิน (ยกเว้นการประกันภัยและกองทุนบำเหน็จบำนาญ)"},
    {id:"S20",detail:"การประกันภัย การประกันภัยต่อ และกองทุนบำเหน็จบำนาญ (ยกเว้นการประกันสังคมภาคบังคับ)"},
    {id:"S21",detail:"กิจกรรมสนับสนุนการบริการทางการเงินและการประกันภัย"},
    {id:"S22",detail:"กิจกรรมอสังหาริมทรัพย์"},
    {id:"S23",detail:"กิจกรรมทางกฎหมายและการบัญชี"},
    {id:"S24",detail:"กิจกรรมของสำนักงานใหญ่และการบริการให้คำปรึกษาด้านการบริหารจัดการ "},
    {id:"S25",detail:"กิจกรรมด้านสถาปัตยกรรมและวิศวกรรม รวมถึงการทดสอบและการวิเคราะห์ทางเทคนิค"},
    {id:"S26",detail:"การวิจัยและพัฒนาเชิงวิทยาศาสตร์"},
    {id:"S27",detail:"การโฆษณาและการวิจัยตลาด"},
    {id:"S28",detail:"กิจกรรมทางวิชาชีพ วิทยาศาสตร์ และเทคนิคอื่นๆ  "},
    {id:"S29",detail:"การบริการรักษาสัตว์"},
    {id:"S30",detail:"กิจกรรมการให้เช่า"},
    {id:"S31",detail:"กิจกรรมการจ้างงาน"},
    {id:"S32",detail:"กิจกรรมของตัวแทนธุรกิจท่องเที่ยว การจัดนำเที่ยว การบริการสำรอง และกิจกรรมที่เกี่ยวข้อง"},
    {id:"S33",detail:"การบริการรักษาความปลอดภัยและการสืบสวน"},
    {id:"S34",detail:"กิจกรรมการบริการสำหรับอาคารและภูมิทัศน์"},
    {id:"S35",detail:"การบริการด้านการบริหารและสนับสนุนการดำเนินงานของสำนักงาน และกิจกรรมอื่นๆ ที่สนับสนุนทางธุรกิจ"},
    {id:"S36",detail:"การศึกษา"},
    {id:"S37",detail:"กิจกรรมด้านสุขภาพของมนุษย์"},
    {id:"S38",detail:"กิจกรรมการให้การดูแลที่ให้ที่พัก"},
    {id:"S39",detail:"กิจกรรมสังคมสงเคราะห์ที่ไม่ให้ที่พัก"},
    {id:"S40",detail:"กิจกรรมการสร้างสรรค์ศิลปะและความบันเทิง"},
    {id:"S41",detail:"กิจกรรมห้องสมุด หอจดหมายเหตุ พิพิธภัณฑสถาน และกิจกรรมทางวัฒนธรรมอื่นๆ"},
    {id:"S42",detail:"กิจกรรมการพนันและการเสี่ยงโชค"},
    {id:"S43",detail:"กิจกรรมด้านการกีฬา ความบันเทิง และนันทนาการ   "},
    {id:"S44",detail:"กิจกรรมองค์การสมาชิก"},
    {id:"S45",detail:"การซ่อมคอมพิวเตอร์และของใช้ส่วนบุคคลและของใช้ในครัวเรือน"},
    {id:"S46",detail:"กิจกรรมบริการส่วนบุคคลอื่นๆ"},
    {id:"S47",detail:"ศาสนสถาน"}
]