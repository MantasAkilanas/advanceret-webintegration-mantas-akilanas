class spiller {
    constructor(fornavn, efternavn) {
        this.fornavn = fornavn;
        this.efternavn = efternavn;
        this.aktiv = false;
        this.point = 0;
    }
    skiftAktiv() {
        this.aktiv = !this.aktiv;
    }
    givPoint(antal) {
        this.point += antal;
    }
    profil() {
        return `${this.fornavn} ${this.efternavn} har ${this.point} point ${this.aktiv ? "(aktiv)" : "(ikke aktiv)"}`;
    }
}
let spiller_1 = new spiller("Palle", "Olsen");
let spiller_2 = new spiller("Tina", "Jensen");
spiller_1.givPoint(5);
console.log(spiller_1.profil());
console.log(spiller_2.profil());
