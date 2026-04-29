export class Boss {
    public name: string;
    public hp: number;
    public maxHp: number;
    public atk: number;

    constructor(name: string = "Kyne", hp: number = 500, atk: number = 20) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.atk = atk;
    }

    calculateAttackDamage(): number {
        const variance = 0.2; // ±20%
        const damage = this.atk * (1 - variance + Math.random() * variance * 2);
        return Math.floor(damage);
    }

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}