export class Archer {
    name = "Archer";
    hp = 150;
    maxHp = 150;
    atk = 40;
    spd = 60;
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }
    generateEquation() {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        return {
            question: `${a} + ${b} = ?`,
            answer: a + b
        };
    }
    checkAnswer(input) {
        const { userAnswer, correctAnswer, timeTaken } = input;
        if (userAnswer !== correctAnswer)
            return 0;
        // จุดเด่น Archer = เร็วแล้วแรง
        return timeTaken <= 5
            ? this.atk * 2 // ตอบไว = คริติคอล
            : this.atk; // ช้า = ดาเมจปกติ
    }
}
