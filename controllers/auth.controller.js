const conexion = require('../database/db');
const bcryptjs = require("bcryptjs");


class Auth {

    login(req,res){
        const { email, password } = req.body;
        const time = 3600000;
        email.toLowerCase();
    
        if (email && password) {
          conexion.query(
            "SELECT * FROM user WHERE email_user = ?",
            [email],
            async (error, results) => {
              const verifyPassword = await bcryptjs.compare(
                password,
                results[0].password_user
              );
              if (results.length == 0 || verifyPassword === false) {
                let mensaje = "Ingrese una contraseña valida";
    
                res.redirect("/login");
              } else {
                req.session.loggedin = true;
                req.session.cookie.expires = new Date() + time;
                req.session.cookie.maxAge = time;
                req.session.rol = results[0].rol_user;
                req.session.id_user = results[0].id_user;
                
                return res.redirect("/admin");
              }
            }
          );
        } else {
          res.redirect("/login");
        }
    };

    logout(req,res){
      req.session.destroy();
      res.redirect('/login');
    }

}

module.exports = new Auth();