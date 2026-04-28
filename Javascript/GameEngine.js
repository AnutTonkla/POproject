import { Knight } from './Characters/Knight.js';
import { Archer } from './Characters/Archer.js';
import { Mage } from './Characters/Mage.js';
import { Timer } from './Timer.js';
import { Boss } from './Characters/Boss.js';
export class GameEngine {
    player = null;
    boss = new Boss();
    timer = null;
    currentEquation = null;
    selectJob(jobName) {
        this.timer = this.timer || new Timer('timer-display');
        if (jobName === 'Knight')
            this.player = new Knight();
        else if (jobName === 'Archer')
            this.player = new Archer();
        else
            this.player = new Mage();
        this.startNewTurn();
    }
    startNewTurn() {
        if (!this.player)
            return;
        this.currentEquation = this.player.generateEquation();
        this.timer?.start();
        this.updateUI();
    }
    submitAnswer(userAnswer) {
        if (!this.player || !this.currentEquation)
            return;
        const timeTaken = this.timer?.stop() || 0;
        const damage = this.player.checkAnswer(userAnswer, timeTaken);
        if (damage > 0) {
            this.boss.takeDamage(damage); // ถ้าตอบถูก บอสโดนดาเมจ
        }
        this.updateUI();
        if (!this.boss.isDead()) {
            setTimeout(() => this.bossTurn(), 100); // ถ้าบอสไม่ตาย มันจะตีสวนใน 1 วินาที
        }
        else {
            alert("Victory!");
        }
    }
    bossTurn() {
        if (!this.player)
            return;
        const damage = this.boss.calculateAttackDamage();
        this.player.takeDamage(damage); // ผู้เล่นรับดาเมจจากบอส
        this.updateUI();
        if (this.player.hp > 0) {
            this.startNewTurn(); // ถ้าเรายังไม่ตาย เริ่มข้อใหม่
        }
        else {
            alert("Game Over!");
        }
    }
    updateUI() {
        const updateBar = (id, current, max) => {
            const el = document.getElementById(id);
            if (el)
                el.style.width = `${(current / max) * 100}%`;
            const txt = document.getElementById(id.replace('-fill', '-text'));
            if (txt)
                txt.innerText = `${current}/${max}`;
        };
        updateBar('boss-hp-fill', this.boss.hp, this.boss.maxHp);
        updateBar('player-hp-fill', this.player?.hp || 0, this.player?.maxHp || 1);
        const qEl = document.getElementById('display-question');
        if (qEl)
            qEl.innerText = this.currentEquation?.question || "";
    }
}
