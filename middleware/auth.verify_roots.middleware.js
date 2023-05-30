
const verifyLoggedIn = (req, res, next) => {
    const { loggedin, rol, id_user } = req.session;
    

    if (loggedin === true && (rol === 'Administrador' || rol === "administrador" || rol === "ADMINISTRADOR") ) {
        next();
    }else if(loggedin === true && (rol === 'Moderador' || rol === 'moderador' || rol === 'MODERADOR')){
        next();
    }else{
        res.redirect('/login');
    }

};

module.exports = verifyLoggedIn;