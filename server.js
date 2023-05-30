// Calling modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const session = require('./middleware/sessiones.middleware');

// Setting the dotenv
dotenv.config({ path: __dirname + '/env/' + process.env.NODE_ENV + '.env'});



// Using express
const server = express();


// Calling Routes
const {HomeRoutes,AdminRoutes,ApiRoutes} = require('./routes');

// Setting and using the JSON
server.use(express.urlencoded({ extended: false}));
server.use(express.json());

// Setting the views and view engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Setting layout
server.use(expressEjsLayouts);
server.set('layout','layouts/layout');

// Setting the  Port and host
server.set('port', process.env.PORT || 3000);
server.set('host', process.env.HOST || '127.0.0.1');

// seving the static files
server.use(express.static(path.join(__dirname, 'public')));

// Using Middleware
server.use(session);

// Using Routes
server.use(HomeRoutes,AdminRoutes,ApiRoutes);
// Errors Meddlware

// Give const to the port and host.
const PORT = server.get('port'), HOST = server.get('host');

// listing the server
    server.listen(PORT, ()=>{
        console.log(`The server is running on http://${HOST}:${PORT}`);
    });

