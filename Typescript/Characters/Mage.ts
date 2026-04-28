import { ICharacter } from '../Interfaces.js';

export class Mage implements ICharacter {
    name = "Mage";
    hp = 100; maxHp = 100; atk = 100; spd = 10;
    private currentAnswer: number = 0;

    takeDamage(amount: number) { this.hp -= amount; }

    generateEquation() {
        const a = Math.floor(Math.random() * 30);
        const x = Math.floor(Math.random() * 20); // x คือคำตอบ
        const b = a + x;
        this.currentAnswer = x;
        return { question: `${a} + x = ${b}`, answer: x };
    }

    checkAnswer(userAnswer: number, timeTaken: number): number {
        if (userAnswer !== this.currentAnswer) return 0;
        // ถ้าตอบภายใน 5 วินาที ดาเมจ x
        return timeTaken <= 5 ? this.atk : 0;
    }
}