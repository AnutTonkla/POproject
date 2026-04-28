import { ICharacter } from '../Interfaces.js';

export class Knight implements ICharacter {
    name = "Knight";
    hp = 150; maxHp = 150; atk = 60; spd = 40;
    private currentAnswer: number = 0;

    takeDamage(amount: number) {
        this.hp -= amount;
    }
    generateEquation() {
        const a = Math.floor(Math.random() * 50);
        const b = Math.floor(Math.random() * 50);
        return {
            question: `${a} + ${b} = ?`,
            answer: a + b
        };
    }
checkAnswer(userAnswer: number, timeTaken: number): number {
        // เช็คว่า คำตอบที่ผู้เล่นส่งมา ตรงกับที่บันทึกไว้ใน currentAnswer หรือไม่
        if (userAnswer === this.currentAnswer) {
            return this.atk + 5; // ตอบถูก ได้ดาเมจ
        } else {
            return Math.floor(this.atk / 2); // ตอบผิด ดาเมจเป็น 0
        }
    }
}