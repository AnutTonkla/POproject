import { ICharacter, Equation, CheckAnswerInput } from '../Interfaces.js';

export class Mage implements ICharacter {
    name = "Mage";
    hp = 100;
    maxHp = 100;
    atk = 100;
    spd = 10;

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    generateEquation(): Equation {
        const a = Math.floor(Math.random() * 30);
        const x = Math.floor(Math.random() * 20); // x คือคำตอบ
        const b = a + x;

        return {
            question: `${a} + x = ${b}`,
            answer: x
        };
    }

    checkAnswer(input: CheckAnswerInput): number {
        const { userAnswer, correctAnswer, timeTaken } = input;

        if (userAnswer !== correctAnswer) return 0;

        // Mage = เสี่ยงสูง ผลตอบแทนสูง
        return timeTaken <= 5
            ? this.atk   // ตอบไว = ยิงแรงมาก
            : 0;         // ช้า = พลาด (fail cast)
    }
}