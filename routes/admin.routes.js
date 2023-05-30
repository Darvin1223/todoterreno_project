// 
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const verifyLoggedIn = require('../middleware/auth.verify.middleware');

// Controller
const { AuthController, DashboarController, UsersController, BlogsController, PropiedadesController, approvePropiedadesController, ProvinciasController, MunicipiosController, ColaboradoresController } = require('../controllers');


/* Storage */
// Blogs
const storageBlog = multer.diskStorage({
    destination: 'public/imagenesBlog',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

// Propiedades pendiente
const storagePropiedades = multer.diskStorage({
    destination: 'public/ImagenesPropiedades',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

// Colaboradores - colaborador
const storageCollaborators = multer.diskStorage({
    destination: 'public/ImagenesCollaborators',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

// Colaboradores
// Colaborador

/* Updates */

// Update blog
const uploadBlog = multer({
    storage: storageBlog,
    dest: 'public/imagenesBlog'
});

//  Update propiedad (Pendiente)
const updatePropiedad = multer({
    storage: storagePropiedades,
    dest: 'public/ImagenesPropiedades'
});
// Update Colaboradores
const updateCollaborator = multer({
    storage: storageCollaborators,
    dest: 'public/ImagenesCollaborators'
});



/* GETS */
// Dashboard
router.get('/admin', verifyLoggedIn, DashboarController.dashboar);
// usuarios
router.get('/usuarios', verifyLoggedIn, UsersController.showAllUsers);
// Equipo
router.get('/usuarios', verifyLoggedIn, UsersController.showAllUsers);
// Colabollators
router.get('/colaboradores', verifyLoggedIn, ColaboradoresController.ShowAllcolaboradores);
// Blogs
router.get('/blogs_admin', verifyLoggedIn, BlogsController.showAllBlogs)
    //  Propiedades
router.get('/propiedades_admin',verifyLoggedIn,PropiedadesController.showAllPropiedades);
// Provincias
router.get('/getprovincias', verifyLoggedIn, ProvinciasController.GetProvincias)
    // Municipios
router.get('/getmunicipios/:id', verifyLoggedIn, MunicipiosController.GetMunicipios)
    //Obtener una sola provincia
router.get('/getonepronvicia/:nombre', verifyLoggedIn, ProvinciasController.GetOneProvincia);
    // Cerrar sesion
router.get('/cerrar_sesion', verifyLoggedIn, AuthController.logout);

/* POST */

// login - Auth
router.post('/sing_in', AuthController.login);

// User - create-user
router.post('/create-user', verifyLoggedIn, UsersController.create_user);

// Blog - create-blog
router.post('/create-blog', verifyLoggedIn, uploadBlog.single('imageBlog'), BlogsController.create_blog);

// Propiedades - create propiedad pendiente
router.post('/create-propiedad', verifyLoggedIn, updatePropiedad.array('image_propiedades', 100), function(req, res, next) { PropiedadesController.create_propiedad(req, res, next) });

// Propiedades - create Propiedad Aprobada
router.post('/create-propiedad-approve', verifyLoggedIn, updatePropiedad.array('image_propiedades', 100), function(req, res, next) { approvePropiedadesController.create_propiedad(req, res, next) });

// Colaboradores
router.post('/create-colaborador', verifyLoggedIn, updateCollaborator.single('imagenColaboradores'), ColaboradoresController.create_collaboradors)

/* Aprobacion de la propiedad */
router.post('/aprobar-propiedad', verifyLoggedIn, updatePropiedad.array('image_propiedades', 100), approvePropiedadesController.approve_propiedad);

/* UPDATE */
// Colaborador
router.post('/update-colaborador', verifyLoggedIn, updateCollaborator.single('imagenColaboradores'), ColaboradoresController.update_collaboradors);

// usuario
router.post('/update-user', verifyLoggedIn, UsersController.update_user);

// propiedad
router.post('/update-propiedad', verifyLoggedIn, updatePropiedad.array('image_propiedades', 100), function(req, res, next) { PropiedadesController.update_propiedad(req, res, next) });

// update Propiedades aprobadas
router.post('/update-propiedad-approve', verifyLoggedIn, updatePropiedad.array('image_propiedades', 100), function(req, res, next) { approvePropiedadesController.update_propiedad(req, res, next) })

// Blog
router.post('/update-blog', verifyLoggedIn, uploadBlog.single('imageBlog'), BlogsController.update_blog);

/* DELETE */

// Propiedades - Delete Propiedad
router.get('/delete-propiedad', verifyLoggedIn, PropiedadesController.delete_propiedad);

router.get('/delete-colaborador/:id', verifyLoggedIn, ColaboradoresController.delete_collaboradors);
router.get('/delete-user/:id', verifyLoggedIn, UsersController.delete_user);
router.get('/delete-propiedad/:id', verifyLoggedIn, approvePropiedadesController.delete_propiedad)
router.get('/delete-blog/:id', verifyLoggedIn, BlogsController.delete_blog)



module.exports = router;