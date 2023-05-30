const conexion = require("../database/db");
const { convert } = require("html-to-text");
const slug = require("slug");

class Propiedades {
    showAllPropiedades(req, res) {
        const { rol, id_user } = req.session;
        const user_rol = rol;
        const user_id = id_user;
        conexion.query(
            "SELECT * FROM `propiedades` INNER JOIN user ON propiedades.user_id = user.id_user",
            (error, propiedades) => {
                if (error) {
                    throw error;
                } else {
                    conexion.query(
                        "SELECT * FROM `propiedades_approve` INNER JOIN user ON propiedades_approve.user_id = user.id_user",
                        (error, approve_propiedades) => {
                            if (error) {
                                throw error;
                            } else {
                                res.render("layouts/propiedades", {
                                    user_rol: user_rol,
                                    user_id: user_id,
                                    propiedades: propiedades,
                                    ApprovePropiedades: approve_propiedades,
                                    title: "Propiedades || Grupo Todoterreno",
                                });
                            }
                        }
                    );
                }
            }
        );
    }

  
    async create_propiedad(req, res, next) {
        const imagenes = [];
        const { id_user } = req.session;
        const user_id = id_user;
        const {
            name,
            price,
            bathroon,
            parking,
            bedroom,
            categoria,
            moneda,
            provincias,
            municipios,
            description_html,
        } = req.body;
        let destacado = req.body.destacado;
        if (destacado === undefined) {
            destacado = 0;
        }
        const text = convert(description_html, {
            wordwrap: 130,
        });
        const extract = text.substring(0, 250);
        const url_Seo = slug(name, "-");
        const meta_description = text.substring(0, 160);
        if (provincias != undefined) {
            if (req.files != undefined) {
                req.files.forEach((element) => {
                    imagenes.push(element.filename);
                });
            }
            let imagenes_data = JSON.stringify(imagenes);
            // console.log(imagenes_data)
            conexion.query(
                "select * from provincias where provincia_id = ?", [provincias],
                (error, provincia_name) => {
                    let provincia_local = provincia_name[0].nombre;

                    conexion.query(
                        "INSERT INTO propiedades SET ?", {
                            name_propiedad: name,
                            price_propiedad: price,
                            bathroom_propiedad: bathroon,
                            parking_propiedad: parking,
                            bedrooms_propiedad: bedroom,
                            description_propiedad: description_html,
                            extract_propiedad: extract,
                            category_propiedad: categoria,
                            province_propiedad: provincia_local,
                            municipios_propiedad: municipios,
                            images_propiedad: imagenes_data,
                            seo_url_propiedad: url_Seo,
                            moneda_propiedad: moneda,
                            destacado_propiedad: destacado,
                            meta_description_propiedad: meta_description,
                            user_id: user_id,
                        },
                        (error, exec) => {
                            if (error) {
                                console.log(error);
                                res.redirect("/propiedades_admin", {
                                    error: error,
                                });
                            } else {
                                res.redirect("/propiedades_admin");
                            }
                        }
                    );
                }
            );
        }
    }

    // Editar Propiedad
    async update_propiedad(req, res, next) {
        const imagenes = [];
        const { id_user } = req.session;
        const user_id = id_user;
        const {
            id_edit,
            name,
            price,
            bathroon,
            parking,
            bedroom,
            categoria,
            moneda,
            provincias,
            municipios,
            description_html,
        } = req.body;
        let destacado = req.body.destacado;

        if (destacado === undefined) {
            destacado = 0;
        }
        const text = convert(description_html, {
            wordwrap: 130,
        });
        const extract = text.substring(0, 250);
        const url_Seo = slug(name, "-");
        const meta_description = text.substring(0, 160);

        console.log(req.body);


        
        if (provincias != undefined) {
            if (req.files != undefined) {
                req.files.forEach((element) => {
                    imagenes.push(element.filename);
                });
            }



            let imagenes_data = JSON.stringify(imagenes);


            if (imagenes_data.length == 0) {
                // console.log(imagenes_data)
                conexion.query(
                    "SELECT * FROM provincias WHERE provincia_id = ?", [provincias],
                    (error, provincia_name) => {
                        let provincia_local = provincia_name[0].nombre;

                        conexion.query(
                            "UPDATE propiedades SET ? WHERE id_propiedad = ?", [{
                                    name_propiedad: name,
                                    price_propiedad: price,
                                    bathroom_propiedad: bathroon,
                                    parking_propiedad: parking,
                                    bedrooms_propiedad: bedroom,
                                    description_propiedad: description_html,
                                    extract_propiedad: extract,
                                    category_propiedad: categoria,
                                    province_propiedad: provincia_local,
                                    municipios_propiedad: municipios,
                                    images_propiedad: imagenes_data,
                                    seo_url_propiedad: url_Seo,
                                    moneda_propiedad: moneda,
                                    destacado_propiedad: destacado,
                                    meta_description_propiedad: meta_description,
                                    user_id: user_id,
                                },
                                id_edit,
                            ],
                            (error, exec) => {
                                if (error) {
                                    console.log(error);
                                    res.redirect("/propiedades_admin");
                                } else {
                                    res.redirect("/propiedades_admin");
                                }
                            }
                        );
                    }
                );
            }

            conexion.query(
                "SELECT * FROM provincias WHERE provincia_id = ?", [provincias],
                (error, provincia_name) => {
                    let provincia_local = provincia_name[0].nombre;

                    conexion.query(
                        "UPDATE propiedades SET ? WHERE id_propiedad = ?", [{
                                name_propiedad: name,
                                price_propiedad: price,
                                bathroom_propiedad: bathroon,
                                parking_propiedad: parking,
                                bedrooms_propiedad: bedroom,
                                description_propiedad: description_html,
                                extract_propiedad: extract,
                                category_propiedad: categoria,
                                province_propiedad: provincia_local,
                                municipios_propiedad: municipios,
                                seo_url_propiedad: url_Seo,
                                moneda_propiedad: moneda,
                                destacado_propiedad: destacado,
                                meta_description_propiedad: meta_description,
                                user_id: user_id,
                            },
                            id_edit,
                        ],
                        (error, exec) => {
                            if (error) {
                                console.log(error);
                                res.redirect("/propiedades_admin");
                            } else {
                                res.redirect("/propiedades_admin");
                            }
                        }
                    );
                }
            );
        }
    }

    // Eliminar Propiedad
    delete_propiedad(req, res) {
        const id = req.params.id;

        conexion.query(
            "DELETE FROM propiedades WHERE id_propiedad = ?", [id],
            (error) => {
                if (error) {
                    console.log(error);
                    res.redirect("/propiedades_admin");
                } else {
                    res.redirect("/propiedades_admin");
                }
            }
        );
    }

    // Client


}

module.exports = new Propiedades();