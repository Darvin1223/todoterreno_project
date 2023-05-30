const conexion = require('../database/db');


class Dashboar {

    dashboar(req, res) {
        const { rol, id_user } = req.session;
        const user_rol = rol;
        const user_id = id_user;
        conexion.query('SELECT * FROM `propiedades_approve` INNER JOIN user ON propiedades_approve.user_id = user.id_user', (error, propiedades) => {
            if (error) {
                throw error;
            } else {
                conexion.query('SELECT * FROM `blog` INNER JOIN user ON blog.user_id = user.id_user', (error, blogs) => {
                    if (error) {
                        throw error;
                    } else {
                        conexion.query('SELECT * FROM `collaborators` INNER JOIN user ON collaborators.user_id = user.id_user;', (error, teams) => {
                            if (error) {
                                throw error
                            } else {
                                res.render('layouts/index', {
                                    user_rol: user_rol,
                                    user_id: user_id,
                                    title: "Dashboar Grupo Todoterreno",
                                    propiedades: propiedades,
                                    blogs: blogs,
                                    teams: teams
                                });
                            }
                        })

                    }
                })
            }
        })


    }
}

module.exports = new Dashboar();