export class Timer {
    private startTime: number = 0; 
    // ใช้เก็บ ID ของตัวนับเวลา เพื่อเอาไว้สั่ง หยุด (Clear) ไม่ให้มันรันค้างไว้
    private intervalId: ReturnType<typeof setInterval> | null = null; 
    // ใช้เก็บชื่อ ID ของ Element บนหน้า HTML
    private elementId: string; 

    constructor(elementId: string) {
        // รับชื่อ ID มาจากภายนอกแล้วบันทึกไว้ในคลาส
        this.elementId = elementId;
    }

    getTimeElapsed(): number {
        // ถ้ายังไม่เริ่มนับ (0) ให้คืนค่า 0
        // ถ้าเริ่มแล้ว ให้เอา (เวลาปัจจุบัน - เวลาเริ่มต้น) แล้วหาร 1000 เพื่อแปลงเป็นหน่วย "วินาที"
        return this.startTime === 0 ? 0
            : (Date.now() - this.startTime) / 1000;
    }

    start() {
        // ป้องกันการรันซ้อน โดยการสั่งหยุดตัวนับเก่าก่อน (ถ้ามี)
        this.stop();
        
        // บันทึกเวลาปัจจุบันไว้เป็นจุดเริ่มต้น
        this.startTime = Date.now();

        // ไปหา Element บนหน้าจอตาม ID
        const displayElement = document.getElementById(this.elementId);

        // สั่งให้ทำงานซ้ำๆ ทุกๆ 0.1 วินาที
        this.intervalId = setInterval(() => {
            if (displayElement) {
                // อัปเดตข้อความบนหน้าจอ โดยใช้ทศนิยม 1 ตำแหน่ง (เช่น Time: 1.5s)
                displayElement.innerText =
                    `Time: ${this.getTimeElapsed().toFixed(1)}s`;
            }
        }, 100);
    }

    stop(): number {
        // ถ้ามีการนับเวลาค้างอยู่ (มี ID) ให้สั่งยกเลิก setInterval นั้นซะ
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null; // ล้างค่า ID ออก
        }
        
        // ส่งค่าเวลาสุดท้ายที่นับได้กลับไป (เผื่อเอาไปใช้คำนวณคะแนน/ดาเมจ)
        return this.getTimeElapsed();
    }
}