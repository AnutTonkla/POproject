export class Timer {
    private startTime: number = 0;
    // เก็บเวลาที่สะสมไว้ก่อน pause (เอาไว้ resume ต่อ)
    private elapsedBeforePause: number = 0;
    // ID ของ requestAnimationFrame ใช้สำหรับ cancel
    private animationId: number | null = null;
    // element ที่ใช้แสดงผลบนหน้าจอ
    private displayElement: HTMLElement | null;
    constructor(elementId: string) {
        // หา element จาก id ที่ส่งเข้ามา
        this.displayElement = document.getElementById(elementId);
    }
    // ใช้ performance.now() วัดเวลาที่ผ่านไป
    private getNow(): number {
        return performance.now();
    }
    // คืนค่าเวลาที่ผ่านไป (วินาที)
    getTimeElapsed(): number {
        // ถ้ายังไม่ start → คืนค่าที่สะสมไว้
        if (this.startTime === 0) return this.elapsedBeforePause / 1000;
        // ถ้ากำลังรัน → เอาเวลาปัจจุบัน - เวลาเริ่ม + เวลาสะสม
        return (this.elapsedBeforePause + (this.getNow() - this.startTime)) / 1000;
    }
    start() {
        // ถ้ากำลังรันอยู่แล้ว → ไม่ต้องทำอะไร 
        if (this.animationId !== null) return;
        // บันทึกเวลาเริ่มต้น
        this.startTime = this.getNow();
        // loop render 
        const loop = () => {
            this.render();
            this.animationId = requestAnimationFrame(loop);
        };
        // เริ่ม loop ครั้งแรก
        this.animationId = requestAnimationFrame(loop);
    }
    // หยุดชั่วคราว (pause)
    pause() {
        // ถ้าไม่ได้รัน → ไม่ต้องทำอะไร
        if (this.animationId === null) return;
        // หยุด animation loop
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        // เก็บเวลาที่ผ่านมาล่าสุด
        this.elapsedBeforePause += this.getNow() - this.startTime;
        // reset startTime เพื่อบอกว่า "ตอนนี้ไม่ได้รันอยู่"
        this.startTime = 0;
    }
    // หยุดและรีเซ็ต timer
    stop(): number {
        // หยุดก่อน
        this.pause();
        // เก็บเวลาสุดท้าย
        const finalTime = this.getTimeElapsed();
        // รีเซ็ตค่าทั้งหมด
        this.elapsedBeforePause = 0;
        this.startTime = 0;
  
        this.render(); // อัปเดตหน้าจอ (ให้กลับเป็น 0)
        return finalTime;
    }
    // แสดงผลเวลาไปที่หน้า UI
    private render() {
        if (this.displayElement) {
            this.displayElement.innerText =
                `Time: ${this.getTimeElapsed().toFixed(2)}s`;
        }
    }
}