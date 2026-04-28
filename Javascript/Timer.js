export class Timer {
    startTime = 0;
    intervalId = null;
    elementId;
    constructor(elementId) {
        this.elementId = elementId;
    }
    getTimeElapsed() {
        return this.startTime === 0 ? 0 : (Date.now() - this.startTime) / 1000;
    }
    start() {
        this.stop(); // เคลียร์ของเก่าก่อนเริ่มใหม่
        this.startTime = Date.now();
        const displayElement = document.getElementById(this.elementId);
        this.intervalId = setInterval(() => {
            if (displayElement) {
                // ใช้ฟังก์ชัน getTimeElapsed แทนการเขียนสูตรซ้ำ
                displayElement.innerText = `Time: ${this.getTimeElapsed().toFixed(1)}s`;
            }
        }, 100);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        return this.getTimeElapsed();
    }
}
