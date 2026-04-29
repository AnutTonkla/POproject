import { GameEngine } from '../GameEngine.js';

const engine = new GameEngine();

declare global {
    interface Window {
        chooseJob: (jobName: string) => void;
    }
}
//สั่งให้ engine เปลี่ยนสถานะผู้เล่น และสลับหน้าจอ
window.chooseJob = (jobName: string): void => {
    console.log("Selecting Hero:", jobName);
    engine.selectJob(jobName);
    
    const classDisplay = document.getElementById('player-class-display');
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');

    if (classDisplay) classDisplay.innerText = `Hero: ${jobName}`;
    if (selectionScreen) selectionScreen.style.display = 'none'; //สั่งให้หน้าเลือกตัวละครหายไปโดยใช้ display = 'none'
    if (gameScreen) gameScreen.style.display = 'block'; //สั่งให้game-screen ขึ้นมาโดยใช้ display = 'block'
};
//เมื่อส่งคำตอบจะดึงค่าจากช่อง Input แปลงเป็นตัวเลขแล้วส่งไปให้ GameEngine
const handleAttack = (): void => {
    // ระบุว่าเป็น HTMLInputElement เพื่อให้เข้าถึงค่า .value ได้
    const input = document.getElementById('answer-input') as HTMLInputElement | null; //as HTMLInputElement:ย้ำกับระบบว่าตัวแปร input นี้คือช่องกรอกข้อมูลนะ เพื่อให้เราดึงค่า .value มาใช้ได้
    
    if (input && input.value !== "") {
        engine.submitAnswer(parseInt(input.value)); //ดึงตัวหนังสือจากช่องพิมพ์มาแปลงเป็นตัวเลข
        input.value = '';
        input.focus();
    }
};

const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
if (submitBtn) {
    submitBtn.onclick = handleAttack;
}

const answerInput = document.getElementById('answer-input') as HTMLInputElement | null;
if (answerInput) {
    answerInput.onkeypress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') handleAttack();
    };
}