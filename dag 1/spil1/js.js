class players {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }
    GivePoints(points) {
        this.points += points;
    }
    static CreatePlayers() {
        let list = [];
        list.push(new players("player1"));
        list.push(new players("player2"));
        return list;
    }
}
let turn = 0;
let playersList = players.CreatePlayers();
document.addEventListener("DOMContentLoaded", (event) => {
    for (let i = 1; i <= 5; i++) {
        let button = document.createElement("button");
        button.textContent = i;
        document.body.appendChild(button);   
        button.addEventListener("click", (event) => {
            if (turn < playersList.length) {
                playersList[turn].GivePoints(i)
                console.log(playersList[turn].points)
                turn++;
            }
            else {
                turn = 0
                playersList[turn].GivePoints(i)
                console.log(playersList[turn].points)
                turn++;
            }
            score();
        })
    }
    let div = document.createElement("div");
    document.body.appendChild(div);
    div.setAttribute("id","score")
    score();
});
function score() {
    let score = "";
    playersList.forEach((element) => {
        score += `name: ${element.name} score: ${element.points} <br>`
    })
    document.querySelector("#score").innerHTML = score
}