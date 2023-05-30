const conexion = require('../database/db');

class Provincias {

    GetProvincias(req,res){
        conexion.query('select provincia_id  as codigo, nombre from provincias',(error,provincias)=>{
            if(error){
                throw error;
            }else{
                res.send(JSON.stringify(provincias));
            }
        })
    }


    GetOneProvincia(req,res){

        let nombre = req.params.nombre;


        conexion.query('select provincia_id  as codigo, nombre from provincias where nombre = ?',[nombre],(error,provincias)=>{
            if(error){
                throw error;
            }else{
                res.send(JSON.stringify(provincias));
            }
        })



    }




}

module.exports = new Provincias();