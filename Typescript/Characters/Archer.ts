import { ICharacter } from '../Interfaces.js';

export class Archer implements ICharacter {
    name = "Archer";
    hp = 100; maxHp = 100; atk = 40; spd = 60;
    private currentAnswer: number = 0;

    takeDamage(amount: number) { this.hp -= amount; }

    generateEquation() {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        this.currentAnswer = a + b;
        return { question: `${a} + ${b} = ?`, answer: this.currentAnswer };
    }

    checkAnswer(userAnswer: number, timeTaken: number): number {
        if (userAnswer !== this.currentAnswer) return 0;
        // ถ้าตอบภายใน 5 วินาที ดาเมจ x
        return timeTaken <= 5 ? this.atk * 2 : this.atk;
    }
}