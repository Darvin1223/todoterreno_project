const conexion = require('../database/db');

class Index {

    index(req,res){
        conexion.query("SELECT * FROM `propiedades_approve` WHERE destacado_propiedad_approve LIKE '1'", (error, resultDesc, next) => {
			if (error) {
				console.log(error);
				res.send(error);
				next();
			} else {
				conexion.query('SELECT * FROM propiedades_approve', (error, resultAll) => {
					if (error) {
						console.log(error);
						return res.send(error);
						
					} else {
						conexion.query('SELECT * FROM blog ORDER BY id_blog  DESC LIMIT 2', (error, resultBlog) => {
							if (error) {
								console.log(error);
								return res.send(error);
							} else {
								res.render('index', {
									title: 'Home || Grupo Todo Terreno',
									layout: false,
									propiedadesASECD: resultDesc,
									propiedades: resultAll,
									blogs: resultBlog,
								});
							}
						});
					}
				});
			}
		});
       
    }

    login(req,res){
        res.render('login',{
            layout:false,
            title: 'Iniciar Sesion || Grupo Todo Terreno'
        });
    }
}

module.exports = new Index();