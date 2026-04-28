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
    // สุ่มดาเมจดิบๆ จากค่า atk เลย ไม่ต้องคูณอะไรเพิ่ม
    calculateAttackDamage() {
        return Math.floor(Math.random() * this.atk);
    }
    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
    }
    isDead() {
        return this.hp <= 0;
    }
}
