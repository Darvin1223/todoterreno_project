const route = require('express').Router();
const { HomeController, ContactoController, approvePropiedadesController, NosotrosController, BlogsController } = require('../controllers');

// GEt

route.get('/', HomeController.index);
route.get('/contacto', ContactoController.contacto)
route.get('/propiedades', approvePropiedadesController.showAllClientPropiedades)
route.get('/login', HomeController.login);
route.get('/nosotros', NosotrosController.nosotros)
route.get('/propiedad', approvePropiedadesController.getOnePropiedad);
route.get('/blogs', BlogsController.showAllClientBlog);
route.get('/blog', BlogsController.getOneBlog);
// Post
route.post('/send-mail', ContactoController.sendMail)

module.exports = route;