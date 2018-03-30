const sql_connection = require("../config/sql.js").connect();
const fs = require("fs");
const path = require("path");
const mimetypes = {
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif"
};
module.exports = (server) => {
    server.get("/", (req, res) => {
        res.render("pages/index");
    })
    server.get("/allinfo", (req, res) => {
        const query = `select billede.id, billede.titel, kategori.navn as kategori, billede.filnavn, date_format(billede.dato, '%d-%m-%Y') as dato
        , fotograf.navn as fotograf
            from billede 
            inner join kategori
                on fk_kategori = kategori.id
            inner join fotograf
                on fk_fotograf = fotograf.id`
        sql_connection.query(query, (err, data) => {
            res.send(data);
        })
    })
    server.get("/specifickategori/:id", (req, res) => {
        const query = `select billede.id, billede.titel, kategori.navn as kategori, billede.filnavn, billede.dato, fotograf.navn as fotograf
            from billede 
            inner join kategori
                on fk_kategori = kategori.id
            inner join fotograf
                on fk_fotograf = fotograf.id
                where kategori.navn = ?`
        sql_connection.query(query, [req.params.id], (err, data) => {
            res.send(data);
        })
    })
    server.get("/kategories", (req, res) => {
        const query = `select *
            from kategori`
        sql_connection.query(query, (err, data) => {
            res.send(data);
        })
    })
    server.get("/serveimage/:id", (req, res) => {
        fs.readFile("./public/img/" + req.params.id, (err, image) => {
            if (err) {
                return err;
            }
            var ext = path.extname(req.params.id);
            var mime = mimetypes[ext];
            res.writeHead(200, { "Content-type": mime })
            res.end(image)
        })
    })
    server.get("/score/:id", (req, res) => {
        const query = `SELECT AVG(score) as score from score where fk_billede = ?`
        sql_connection.query(query, [req.params.id], (err, data) => {
            if(err){
                console.log(err);
            }
            res.send(data);
        })
    })
    server.post("/postscore", (req, res) => {
        const query = `INSERT INTO score(score.score, score.fk_billede) values (?,?)`
        sql_connection.query(query, [req.body.score, req.body.billede], (err, data) => {
            if (err){
                console.log(err);
            }
        })
    })

}