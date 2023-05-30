const conexion = require('../database/db');
const bcryptjs = require("bcryptjs");

class User {

    showAllUsers(req,res){
        const {rol, id_user} = req.session;
        const user_rol = rol;
        const user_id = id_user;
        conexion.query('SELECT * FROM user', (error,users)=>{
            if(error){
                throw error;
            }else{
                res.render('layouts/users',{
                    title: "Usuarios || Grupo TodoTerreno",
                    user_rol: user_rol,
                    user_id: user_id,
                    Users:users
                })
            }
        })
    }

    // Create user
    async create_user(req,res){
        const { name, email, password, rol } = req.body;
        email.toLowerCase();
        const passwordHaaSH = await bcryptjs.hash(password, 8);
        conexion.query('INSERT INTO user SET ?', {
            name_user:name,
            email_user:email,
            password_user:passwordHaaSH,
            rol_user:rol
        },error => {
            if(error){
                throw error
            }else{
                return res.redirect("/usuarios");
            }
        });
    }

    // Update
    async update_user(req,res){
        const id = req.body.id;
        const {name,email, password, rol} = req.body;
        email.toLowerCase();
        const passwordHaaSH = await bcryptjs.hash(password, 8);
        conexion.query('UPDATE user SET ? WHERE id_user = ?', [{
            name_user:name,
            email_user:email,
            password_user:passwordHaaSH,
            rol_user:rol
        }, id], error =>{
            if(error){
                throw error;
            }else{
                res.redirect("/usuarios");
            }
        })
    }
    // Delete
    delete_user(req,res){
        const id = req.params.id;

        conexion.query('DELETE FROM user WHERE id_user  = ?',[id],error =>{
            if(error){
                throw error;
            }else{
                res.redirect("/usuarios");
            }
        })
    }
}

module.exports = new User();