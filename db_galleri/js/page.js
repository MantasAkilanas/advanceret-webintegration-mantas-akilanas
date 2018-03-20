
// I denne fil skal du benytte dig af de objekter, properties og funktioner, som du har defineret i "oop_gallery.js".
// Her er det tilladt at referere til specifikke gallerier, som f.eks. galleri01, galleri02, osv.

document.addEventListener("DOMContentLoaded", function (event) {
    fetch("http://localhost:1337/allinfo")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let galleri = new OOPGallery();
            data.forEach((element) => {
                galleri.addImage(new image(element))
            });
            galleri.createGaleri();
        })
});