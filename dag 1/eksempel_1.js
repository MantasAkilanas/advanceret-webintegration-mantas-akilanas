let spiller_1 = {
    fornavn: "Jens",
    efternavn: "Hansen",
    aktiv: false,
    point: 0,
    skiftAktiv: () => {
        this.aktiv = !this.aktiv;
    },
    givPoint: (antal) => {
        this.point += antal;
    },
    profil:function () {
        return `${this.fornavn} ${this.efternavn},har ${this.point} point ${this.aktiv ? "(aktiv)" : "(ikke aktiv)"}`;
    }
}
// console.log(spiller_1.fornavn)
// spiller_1.givPoint(5);
// console.log(spiller_1.point);
console.log(spiller_1.profil());