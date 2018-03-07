let spiller = function (fornavn, efternavn) {
    this.fornavn = fornavn;
    this.efternavn = efternavn;
    this.aktiv = false;
    this.point = 0;
    this.skiftAktiv = () => {
        this.aktiv = !this.aktiv;
    }
    this.givPoint = (antal) => {
        this.point += antal;
    }
    this.profil = function () {
        return `${this.fornavn} ${this.efternavn} har ${this.point} point ${this.aktiv ? "(aktiv)" : "(ikke aktiv)"}`;
    }
}
let spiller_1 = new spiller("Palle", "Olsen");
let spiller_2 = new spiller("Tina", "Jensen");
spiller_1.givPoint(5);
console.log(spiller_1.profil());
console.log(spiller_2.profil());
