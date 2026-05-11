export interface Equation {
    question: string;
    answer: number;
}

export interface CheckAnswerInput {
    userAnswer: number;
    correctAnswer: number;
    timeTaken: number;
}

export interface ICharacter {
    name: string;
    hp: number;
    maxHp: number;
    atk: number;
    spd: number;

    takeDamage(amount: number): void;
    generateEquation(): Equation;
    checkAnswer(input: CheckAnswerInput): number;
}