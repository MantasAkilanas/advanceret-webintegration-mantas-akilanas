let t = new spiller();

document.querySelector("#profil").addEventListener("click", (event) => {
    console.log(t.profil());
});
document.querySelector("#skiftAktiv").addEventListener("click", (event) => {
    t.skiftAktiv();
});