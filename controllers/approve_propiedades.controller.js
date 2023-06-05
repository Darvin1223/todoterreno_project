const conexion = require('../database/db');
const { convert } = require('html-to-text');
const slug = require('slug');

class Approve_propiedades {

    // Create Propiedad
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



                let imagenes_data = JSON.stringify(imagenes);


                conexion.query(
                    "select * from provincias where provincia_id  = ?", [provincias],
                    (error, provincia_name) => {
                        if (error) {
                            throw error
                        } else {
                            let provincia_local = provincia_name[0].nombre
                            conexion.query(
                                "INSERT INTO `propiedades_approve` SET ?", {
                                    name_propiedad_approve: name,
                                    price_propiedad_approve: price,
                                    bathroom_propiedad_approve: bathroon,
                                    parking_propiedad_approve: parking,
                                    bedrooms_propiedad_approve: bedroom,
                                    description_propiedad_approve: description_html,
                                    extract_propiedad_approve: extract,
                                    category_propiedad_approve: categoria,
                                    province_propiedad_approve: provincia_local,
                                    municipios_propiedad_approve: municipios,
                                    images_propiedad_approve: imagenes_data,
                                    seo_url_propiedad_approve: url_Seo,
                                    modena_approve: moneda,
                                    destacado_propiedad_approve: destacado,
                                    meta_description_propiedad_approve: meta_description,
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
                        };


                    }
                );

            } else {
                console.log('Imagenes undefined');
                console.log(req.files);
            }

        } else {
            console.log('Provincia undefine');
        }
    }

    // Edit
   update_propiedad(req, res, next) {
            let cuenta_imagen = 0;
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
                municipios,
                description_html,
            } = req.body;
            const provincias = req.body;
           
            let destacado = req.body.destacado;
    
            console.log(categoria)
            if (destacado === undefined) {
                destacado = 0;
            }


            const text = convert(description_html, {
                wordwrap: 130,
            });



            const extract = text.substring(0, 250);
            const url_Seo = slug(name, "-");
            const meta_description = text.substring(0, 160);

            if (req.files != undefined) {
                req.files.forEach((element) => {
                    imagenes.push(element.filename);
                    cuenta_imagen = cuenta_imagen + 1;
                });

            }


            let imagenes_data = JSON.stringify(imagenes);

            let provincia_local = "";

            if (imagenes.length == 0) {
            

                // conexion.query(
                //     "select * from provincias where provincia_id  = ?", [provincias],
                //     (error, provincia_name) => {
                //         if (error) {
                //             throw error
                //         } else {
                //             provincia_local = provincia_name[0].nombre
                //         }

                
                conexion.query(
                    "UPDATE `propiedades_approve` SET ? WHERE id_propiedad_approve  = ?", [{
                            name_propiedad_approve: name,
                            price_propiedad_approve: price,
                            bathroom_propiedad_approve: bathroon,
                            parking_propiedad_approve: parking,
                            bedrooms_propiedad_approve: bedroom,
                            province_propiedad_approve: provincia_local,
                            municipios_propiedad_approve: municipios,
                            description_propiedad_approve: description_html,
                            extract_propiedad_approve: extract,
                            category_propiedad_approve: categoria,
                            seo_url_propiedad_approve: url_Seo,
                            modena_approve: moneda,
                            destacado_propiedad_approve: destacado,
                            meta_description_propiedad_approve: meta_description,
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

            // })

            } else {

                let provincia_local = "";

             


                conexion.query(
                    "UPDATE `propiedades_approve` SET ? WHERE id_propiedad_approve  = ?", [{
                            name_propiedad_approve: name,
                            price_propiedad_approve: price,
                            bathroom_propiedad_approve: bathroon,
                            parking_propiedad_approve: parking,
                            bedrooms_propiedad_approve: bedroom,
                            province_propiedad_approve: provincias,
                            municipios_propiedad_approve: municipios,
                            description_propiedad_approve: description_html,
                            extract_propiedad_approve: extract,
                            category_propiedad_approve: categoria,
                            images_propiedad_approve: imagenes_data,
                            province_propiedad_approve: provincia_local,
                            municipios_propiedad_approve: municipios,
                            seo_url_propiedad_approve: url_Seo,
                            modena_approve: moneda,
                            destacado_propiedad_approve: destacado,
                            meta_description_propiedad_approve: meta_description,
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
        }
        // Approve
    async approve_propiedad(req, res) {
        const { id_aprove } = req.body;

        conexion.query('SELECT * FROM propiedades WHERE id_propiedad = ?', [id_aprove], (error, propiedades) => {
            if (error) {
                throw error;
            } else {
                let { name_propiedad, price_propiedad, bathroom_propiedad, parking_propiedad, bedrooms_propiedad, description_propiedad, extract_propiedad, category_propiedad, province_propiedad, municipios_propiedad, images_propiedad, seo_url_propiedad, destacado_propiedad, meta_description_propiedad, user_id } = propiedades[0];
                if (destacado_propiedad == undefined) {
                    description_propiedad = 0
                }

                conexion.query('INSERT INTO `propiedades_approve` SET  ?', {
                    name_propiedad_approve: name_propiedad,
                    price_propiedad_approve: price_propiedad,
                    bathroom_propiedad_approve: bathroom_propiedad,
                    parking_propiedad_approve: parking_propiedad,
                    bedrooms_propiedad_approve: bedrooms_propiedad,
                    description_propiedad_approve: description_propiedad,
                    extract_propiedad_approve: extract_propiedad,
                    category_propiedad_approve: category_propiedad,
                    province_propiedad_approve: province_propiedad,
                    municipios_propiedad_approve: municipios_propiedad,
                    images_propiedad_approve: images_propiedad,
                    seo_url_propiedad_approve: seo_url_propiedad,
                    destacado_propiedad_approve: destacado_propiedad,
                    meta_description_propiedad_approve: meta_description_propiedad,
                    user_id: user_id

                }, (error, message) => {
                    if (error) {
                        res.redirect('/propiedades_admin')
                    } else {
                        conexion.query('DELETE FROM propiedades WHERE id_propiedad = ?', [id_aprove], error => {
                            if (error) {
                                throw error;
                            } else {
                                res.redirect('propiedades_admin')
                            }
                        })

                    }
                })
            }
        });
    };
    // Delete Propiedad
    delete_propiedad(req, res) {
        const id = req.params.id;

        conexion.query('DELETE FROM propiedades_approve WHERE id_propiedad_approve = ?', [id], error => {
            if (error) {
                console.log(error)
                res.status(404).redirect('/propiedades_admin', {
                    error: error
                });
            } else {
                res.status(200).redirect('/propiedades_admin');
            }
        });
    }

    /* Cliente */

    // Show All
    showAllClientPropiedades(req, res) {
            const page = Number(req.query.page);
            const perPage = 6;
            const skipPage = (page - 1) * perPage;

            let copyResults;
            const { title, province, municipality } = req.query;
            let consult = 'SELECT * FROM propiedades_approve LIMIT ? OFFSET ?';
            const params = [perPage, skipPage];

            const verifyData = () => {
                const fields = { title, province, municipality };
                for (const key in fields) {
                    if (fields[key] === '' || fields[key] === undefined || fields[key] === null) {
                        delete fields[key];
                    }
                }

                return fields;
            };

            const fields = verifyData();

            consult = `SELECT * FROM propiedades_approve WHERE ${fields['name_propiedad_approve'] ? `name_propiedad_approve = ? ` : 'name_propiedad_approve IS NOT NULL '}${
			fields['province_propiedad_approve'] ? 'AND province_propiedad_approve = ? ' : 'AND province_propiedad_approve IS NOT NULL '
		}${fields['municipality'] ? 'AND municipios_propiedad_approve = ? ' : 'AND municipios_propiedad_approve IS NOT NULL '}LIMIT ? OFFSET ?`;

		

		if (municipality) {
			params.unshift(municipality);
		}

		if (province) {
			params.unshift(province);
		}

		if (title) {
			params.unshift(title);
		}

		// console.log(params);

		conexion.query(consult, params, (error, results) => {
			copyResults = results;


			conexion.query('SELECT COUNT(name_propiedad_approve) as paginas FROM propiedades_approve', (error, results) => {
			
				res.render('propiedades', {
					title: 'Propiedades || Grupo Todo Terreno',
					layout: false,
					propiedades: copyResults,
					paginas: Math.ceil(results[0].paginas / perPage),
				});
			});
		});
	}

    //  getOne
    getOnePropiedad(req,res){
        const id = req.query.id;

        conexion.query('SELECT * FROM propiedades_approve WHERE id_propiedad_approve = ?',[id],(error,results)=>{
            if(error){
                throw error;
            }else{
                
                let title = results[0].name_propiedad_approve;
                res.render('propiedad',{
                    layout:false,
                    title: `${title} || Grupo Todoterreno`,
                    propiedad:results[0]
                })
            }
        })
    }

    getDataInformation(req,res){
        const {id_data} = req.query;
        console.log(id_data);
        conexion.query("SELECT * FROM propiedades_approve WHERE id_propiedad_approve = ?", [id_data], (err,resultData)=>{
            if(err){
                console.log(err);
            }else{
                res.json({resultData:resultData[0]});
            }
        })
    }

}

module.exports = new Approve_propiedades()