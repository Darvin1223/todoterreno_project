const conexion = require('../database/db');


class Nosotros {

    nosotros(req, res) {
        conexion.query('SELECT * FROM `collaborators`', (error, results) => {
            if (error) {
                throw error;
            } else {
                res.render('Nosotros', {
                    layout: false,
                    title: "Nosotros || GrupoTodoterreno",
                    teams: results
                })
            }
        })
    }
}

module.exports = new Nosotros();