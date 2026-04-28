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

    // สุ่มดาเมจดิบๆ จากค่า atk เลย ไม่ต้องคูณอะไรเพิ่ม
    calculateAttackDamage(): number {
        return Math.floor(Math.random() * this.atk);
    }

    takeDamage(amount: number) {
        this.hp = Math.max(0, this.hp - amount);
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}