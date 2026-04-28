export interface ICharacter {
    name: string;
    hp: number;
    maxHp: number;
    atk: number;
    spd: number;
    takeDamage(amount: number): void;
    generateEquation(): { question: string, answer: number };
    checkAnswer(userAnswer: number, timeTaken: number): number;
}