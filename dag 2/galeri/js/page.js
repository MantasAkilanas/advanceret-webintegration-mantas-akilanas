
// I denne fil skal du benytte dig af de objekter, properties og funktioner, som du har defineret i "oop_gallery.js".
// Her er det tilladt at referere til specifikke gallerier, som f.eks. galleri01, galleri02, osv.

document.addEventListener("DOMContentLoaded", function (event) {
    let galleri = new OOPGallery();
    galleri.addImages(["images/image_01.jpg", "images/image_02.jpg", "images/image_03.jpg", "images/image_04.jpg"]);
    galleri.selectContainer("#gallery01");
    galleri = new OOPGallery();
    galleri.addImages(["images/image_01.jpg", "images/image_02.jpg", "images/image_03.jpg", "images/image_04.jpg"]);
    galleri.selectContainer("#gallery02");

    


});