const mysql2 = require('mysql2');
// const conexion = mysql2.createConnection({
//     host: process.env.HOST,
//     user: "root",
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });


// try{
//     conexion.connect();
// }catch(error){
//     console.log(`Hubo un error en la conexion, ${error}`);
// }

const conexion = mysql2.createPool({
    connectionLimit: 4,
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'grupotodoterreno',
    port: 8081
});
// const conexion = mysql2.createPool({
//     connectionLimit: 4,
//     host: process.env.HOST,
//     user: process.env.USER,
//     password:process.env.PASSWORD,
//     database: process.env.DATABASE,
    
// });


conexion.getConnection(err =>{
    if(err){
        console.log(`Hubo un error en la debe ${err.message}`)
    }else{
        console.log(`Conexion a la base de datos exitosamente!`)
    }
});

module.exports = conexion;