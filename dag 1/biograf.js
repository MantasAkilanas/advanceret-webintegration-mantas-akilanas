class film {
    constructor(navn, tid, pris) {
        this.navn = navn;
        this.tid = tid;
        this.pris = pris;
    }
    info() {
        return `Filmen ${this.navn} køre på ${this.tid} og koster ${this.pris}kr`
    }
}
let test = new film("test", "mandag 15:30",150);
console.log(test.info());