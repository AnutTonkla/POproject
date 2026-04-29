export class Boss {
    name;
    hp;
    maxHp;
    atk;
    constructor(name = "Kyne", hp = 500, atk = 20) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.atk = atk;
    }
    calculateAttackDamage() {
        const variance = 0.2; // ±20%
        const damage = this.atk * (1 - variance + Math.random() * variance * 2);
        return Math.floor(damage);
    }
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }
    isDead() {
        return this.hp <= 0;
    }
}
