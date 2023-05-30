
const verifyLoggedInRoot = (req, res, next) => {
    const { loggedin, rol, id_user } = req.session;
    

    if (loggedin === true && (rol === 'Administrador' || rol === "administrador" || rol === "ADMINISTRADOR") ) {
        next();
    }else if(loggedin === true && (rol === 'Moderador' || rol === 'moderador' || rol === 'MODERADOR')){
        next();
    }
    else if(loggedin === true && (rol === 'Vendedor' || rol === 'vendedor' || rol === 'VENDEDOR')){
        next()
    }else{
        res.redirect('/login');
    }

};

module.exports = verifyLoggedInRoot;