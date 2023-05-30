const conexion = require('../database/db');
const { convert } = require('html-to-text');
const slug = require('slug');

class colaboradores {

    // Show All Admin
    ShowAllcolaboradores(req, res) {
        const { rol, id_user } = req.session;
        const user_rol = rol;
        const user_id = id_user;


        conexion.query('SELECT * FROM `collaborators` INNER JOIN user ON collaborators.user_id = user.id_user;', (error, teams) => {
            if (error) {
                console.log(error);
                res.status(404).redirect('/admin')
            } else {
                res.render('layouts/equipo', {
                    title: "Nuestro equipo || Grupo Todoterreno",
                    user_rol,
                    user_id: user_id,
                    teams: teams
                })
            }
        })
    };

    // Create
    create_collaboradors(req, res) {
            const { rol, id_user } = req.session;
            const user_rol = rol;
            const user_id = id_user;
            const { name, telefono, descripcion, provincias, municipios, tipo } = req.body;
            const { filename } = req.file;
            const imagePath = `ImagenesCollaborators/${filename}`;
            if (provincias != undefined) {
                conexion.query('SELECT * FROM provincias WHERE provincia_id = ?', [provincias], (error, provincia_name) => {
                    if (error) {
                        throw error;
                    } else {
                        const provincia_local = provincia_name[0].nombre;
                        if (tipo == 'persona') {
                            const CEDULA = req.body.Cedula;
                            conexion.query('INSERT INTO `collaborators` SET ?', {
                                nombre_team: name,
                                provincia_team: provincia_local,
                                municipio_team: municipios,
                                telefono_team: telefono,
                                description_team: descripcion,
                                image_team: imagePath,
                                tipo_team: tipo,
                                cedula_team: CEDULA,
                                user_id: user_id

                            }, (error, msg) => {
                                if (error) {
                                    console.log(error)
                                    res.status(404).redirect('/colaboradores')
                                } else {
                                    res.status(200).redirect("/colaboradores");
                                }
                            });
                        } else if (tipo == 'empresa') {
                            const RNC = req.body.RNC;
                            conexion.query('INSERT INTO `collaborators` SET ?', {
                                nombre_team: name,
                                provincia_team: provincia_local,
                                municipio_team: municipios,
                                telefono_team: telefono,
                                description_team: descripcion,
                                image_team: imagePath,
                                tipo_team: tipo,
                                rnc_team: RNC,
                                user_id: user_id,

                            }, (error, msg) => {
                                if (error) {
                                    console.log(error)
                                    res.status(404).redirect('/colaboradores')
                                } else {
                                    res.status(200).redirect("/colaboradores");
                                }
                            })
                        }

                    }
                })
            }

        }
        // Edit
    update_collaboradors(req, res) {
        const id_edit = req.body.id_edit;
        const { name, telefono, descripcion } = req.body;
        
        

        if (req.file != undefined) {

            const { filename } = req.file;

            const image_path = `ImagenesCollaborators/${filename}`
            conexion.query('UPDATE `collaborators` SET ? WHERE id_team = ?', [{
                nombre_team: name,
                telefono_team: telefono,
                description_team: descripcion,
                image_team: image_path
            }, id_edit], error => {
                if (error) {
                    return res.status(404).redirect('/colaboradores')
                } else {
                    return res.status(200).redirect("/colaboradores");
                }
            })
        } else {
            conexion.query('UPDATE `collaborators` SET ? WHERE id_team = ?', [{
                nombre_team: name,
                telefono_team: telefono,
                description_team: descripcion,
            }, id_edit], error => {
                if (error) {
                    return res.status(404).redirect('/colaboradores')
                } else {
                    return res.status(200).redirect("/colaboradores");
                }
            })
        }
    }

    // delete
    delete_collaboradors(req, res) {
        const id = req.params.id;

        conexion.query('DELETE FROM  `collaborators` WHERE id_team = ?', [id], error => {
            if (error) {
                throw error;
            } else {
                res.redirect("/colaboradores");
            }
        });
    }

}

module.exports = new colaboradores();