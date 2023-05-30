const conexion = require('../database/db');
const nodemailer = require("nodemailer");

class Contacto {

    // Show page in client-Side
    contacto(req,res){
        res.render('contacto',{
            layout:false,
            title: "contacto || Grupo todoterreno"
        });
    }

    async sendMail(req,res){
        const {Eleccion,Nombre,Email,Telefono,Mensaje,Opciones,Presupuesto,Contacto,fecha,hora} = req.body;

        conexion.query('INSERT INTO `contacto` SET ?',{
            solicitud_contacto:Eleccion,
            nombre_contacto:Nombre,
            email_contacto:Email,
            telefono_contacto:Telefono,
            mensaje_contacto:Mensaje,
            tipo_servicio_contacto:Opciones,
            presupuesto_contacto:Presupuesto,
            contactado_contacto:Contacto,
            fecha_contacto:fecha,
            hora_contacto:hora
        },async (error) =>{
            if(error){
                throw error;
            }else{
                let transporter = nodemailer.createTransport({
                    host: "mail.grupotodoterreno.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                      user: 'info@grupotodoterreno.com', // 
                      pass: ']LFGKX8fj.J~' // 
                    },
                });
                let info = await transporter.sendMail({
                    from: `${Email}`, // sender address
                    to: "info@grupotodoterreno.com", // list of receivers
                    subject: `Buenas, Yo quisiera ${Eleccion} Una propiedad`, // Subject line
                    text: `${Mensaje}`, // plain text body
                    
                });

                
                try {
                    transporter.sendMail(info)
                    res.redirect('/contacto')
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

}

module.exports = new Contacto();