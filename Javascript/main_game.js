// Javascript/main_game.js
import { GameEngine } from './GameEngine.js';

const engine = new GameEngine();

window.chooseJob = (jobName) => {
    console.log("Selecting Hero:", jobName);
    engine.selectJob(jobName);
    
    document.getElementById('player-class-display').innerText = `Hero: ${jobName}`;
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
};

const handleAttack = () => {
    const input = document.getElementById('answer-input');
    if (input && input.value !== "") {
        engine.submitAnswer(parseInt(input.value));
        input.value = '';
        input.focus();
    }
};

const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.onclick = handleAttack; // ใช้ onclick แทนเพื่อความชัวร์
}

const answerInput = document.getElementById('answer-input');
if (answerInput) {
    answerInput.onkeypress = (e) => {
        if (e.key === 'Enter') handleAttack();
    };
}