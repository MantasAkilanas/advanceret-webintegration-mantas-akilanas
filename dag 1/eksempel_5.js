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
let spillerListe = [];
spillerListe.push(new spiller("Palle", "Olsen"));
spillerListe.push(new spiller("Tina", "Jensen"));
spillerListe.forEach((element) => {
    element.givPoint(10);
    console.log(element.profil());

});