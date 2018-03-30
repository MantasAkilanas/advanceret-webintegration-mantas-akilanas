class image {
    constructor(element) {
        this.id = element.id;
        this.titel = element.titel;
        this.kategori = element.kategori;
        this.filnavn = element.filnavn;
        this.dato = element.dato;
        this.fotograf = element.fotograf;
        this.score = 0;
        this.fetchScore()
    }
    fetchScore() {
        fetch("http://localhost:3000/score/" + this.id)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                if (data[0].score != null) {
                    this.score = data[0].score;
                }
            })
    }
}