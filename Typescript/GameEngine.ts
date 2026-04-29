import { ICharacter, Equation } from './Interfaces.js';
import { Knight } from './Characters/Knight.js';
import { Archer } from './Characters/Archer.js';
import { Mage } from './Characters/Mage.js';
import { Timer } from './Timer.js';
import { Boss } from './Characters/Boss.js';

export class GameEngine {
    private player: ICharacter | null = null;
    private boss = new Boss();
    private timer: Timer;
    private currentEquation: Equation | null = null;

    constructor() {
        this.timer = new Timer('timer-display');
    }

    selectJob(jobName: string) {
        if (jobName === 'Knight') this.player = new Knight();
        else if (jobName === 'Archer') this.player = new Archer();
        else this.player = new Mage();

        this.startNewTurn();
    }

    startNewTurn() {
        if (!this.player) return;

        this.currentEquation = this.player.generateEquation();
        this.timer.start();

        this.updateUI();
    }

    submitAnswer(userAnswer: number) {
        if (!this.player || !this.currentEquation) return;

        const timeTaken = this.timer.stop();

        const damage = this.player.checkAnswer({
            userAnswer,
            correctAnswer: this.currentEquation.answer,
            timeTaken
        });

        if (damage > 0) {
            this.boss.takeDamage(damage);
        }

        this.updateUI();

        if (!this.boss.isDead()) {
            setTimeout(() => this.bossTurn(), 500);
        } else {
            alert("Victory!");
        }
    }

    private bossTurn() {
        if (!this.player) return;

        const damage = this.boss.calculateAttackDamage();
        this.player.takeDamage(damage);

        this.updateUI();

        if (this.player.hp > 0) {
            this.startNewTurn();
        } else {
            alert("Game Over!");
        }
    }

    private updateUI() {
        const updateBar = (HPbarid: string, currentHP: number, maxHPbar: number) => {
            const el = document.getElementById(HPbarid);
            if (el) el.style.width = `${(currentHP / maxHPbar) * 100}%`;

            const txt = document.getElementById(HPbarid.replace('-fill', '-text'));
            if (txt) txt.innerText = `${currentHP}/${maxHPbar}`;
        };

        updateBar('boss-hp-fill', this.boss.hp, this.boss.maxHp);
        updateBar('player-hp-fill', this.player?.hp || 0, this.player?.maxHp || 1);

        const qEl = document.getElementById('display-question');
        if (qEl) qEl.innerText = this.currentEquation?.question || "";
    }
}