import { ICharacter, Equation, CheckAnswerInput } from '../Interfaces.js';

export class Knight implements ICharacter {
    name = "Knight";
    hp = 200;
    maxHp = 200;
    atk = 60;
    spd = 40;

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    generateEquation(): Equation {
        const a = Math.floor(Math.random() * 50);
        const b = Math.floor(Math.random() * 50);

        return {
            question: `${a} + ${b} = ?`,
            answer: a + b
        };
    }

    checkAnswer(input: CheckAnswerInput): number {
        const { userAnswer, correctAnswer, timeTaken } = input;

        if (userAnswer === correctAnswer) {
            // bonus ถ้าตอบเร็ว
            const speedBonus = Math.max(0, 10 - timeTaken);
            return Math.floor(this.atk + speedBonus);
        }

        // ❗ ตอบผิด = 0 (ชัดเจน)
        return 0;
    }
}