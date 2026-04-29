import { GameEngine } from '../GameEngine.js';
const engine = new GameEngine();
window.chooseJob = (jobName) => {
    console.log("Selecting Hero:", jobName);
    engine.selectJob(jobName);
    const classDisplay = document.getElementById('player-class-display');
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');
    if (classDisplay)
        classDisplay.innerText = `Hero: ${jobName}`;
    if (selectionScreen)
        selectionScreen.style.display = 'none';
    if (gameScreen)
        gameScreen.style.display = 'block';
};
const handleAttack = () => {
    // ระบุว่าเป็น HTMLInputElement เพื่อให้เข้าถึงค่า .value ได้
    const input = document.getElementById('answer-input');
    if (input && input.value !== "") {
        engine.submitAnswer(parseInt(input.value));
        input.value = '';
        input.focus();
    }
};
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.onclick = handleAttack;
}
const answerInput = document.getElementById('answer-input');
if (answerInput) {
    answerInput.onkeypress = (e) => {
        if (e.key === 'Enter')
            handleAttack();
    };
}
