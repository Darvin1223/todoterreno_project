const conexion = require('../database/db');

class Municipios {

    GetMunicipios(req,res){
        let ProvinciaID = req.params.id;
        conexion.query(
          "select * from municipios where provincia_id  = ?",
          [ProvinciaID],
          (error, municipios) => {
            if (error) {
              throw error;
            } else {
              res.send(JSON.stringify(municipios));
            }
          }
        );
    }
    GetAllMunicipios(req,res){
      conexion.query("SELECT * FROM municipios", (err,results) =>{
        if(err){
          console.log(err)
        }else{
          res.send(JSON.stringify(results));
        }
      })
    }
};

module.exports = new Municipios();