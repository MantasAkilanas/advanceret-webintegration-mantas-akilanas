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
    static hentSpillerListe() {
        let liste = [];
        liste.push(new spiller("James", "Dean"));
        liste.push(new spiller("Sandre", "Dee"));
        liste.push(new spiller("Sam", "Glee"));
        return liste;
    }
    static findSpillerListe(liste = [], search = "") {
        let array = [];
        liste.forEach((element) => {
            if (element.fornavn.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                array.push(element);
            }
        });
        return array;
    }

}
let spillerListe = spiller.hentSpillerListe();
// spillerListe.forEach((element) => {
//     element.givPoint(10);
//     console.log(element.profil());
// });
console.log(spiller.findSpillerListe(spillerListe, "AM"));