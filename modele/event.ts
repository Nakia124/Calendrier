const mysql = require("mysql2")
let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Calendrier"
})

export function eventALL() {
    return new Promise((result, rej) => {
        conn.query("SELECT * FROM event", (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}

export function suppEvent(id: number) {
    return new Promise((result, rej) => {
        conn.query("DELETE FROM event WHERE id=?", [id], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })
}
export function addEvent( date_debut: Date, date_fin: Date, titre: string, location: string, categorie: string, statut: string, description: string, transparance: string, nbMaj: number) {
    return new Promise((result, rej) => {
        conn.query("INSERT INTO event (,prenom) VALUES (?,?)", [
            date_debut, date_fin, titre, location, categorie, statut, description, transparance
        ], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })

}

export function editEvent( date_debut: Date, date_fin: Date, titre: string, location: string, categorie: string, statut: string, description: string, transparance: string, nbMaj: number) {
    return new Promise((result, rej) => {
        conn.query("UPDATE event SET ( date_debut, date_fin, titre, location, categorie, statut, description, transparance) VALUES (?,?,?,?,?,?,?,?)", [
            date_debut, date_fin, titre, location, categorie, statut, description, transparance
        ], (err: any, res: any) => {
            if (err) rej(err)
            else result(res)
        })
    })

}