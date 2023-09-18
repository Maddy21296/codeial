const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-log-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// we are storing session information in mongo 
const MongoStore = require('connect-mongo'); // (session) is used coz we will store session data in mongo

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);

console.log('chat server is listening on port 5000');

const path = require('path');

if (env.name == 'development'){
    app.use(sassMiddleware({
        //src: './assets/scss',
        src: path.join(__dirname,env.asset_path,'scss'),
        //dest: './assets/css',
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}


app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

// monogo store is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    //Todo change the secret before deployment in production mode
    secret: env.asset_path,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/test-app',
        
        }   
    ),
    cookie: {
        maxAge: (1000*60*100) // in miliseconds
    },
    
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router 
app.use('/',require('./routes'));


app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);// this is called interpolation 
        //in which we add a variable inside string notations with ${}
    }
    console.log(`Server is running on port : ${port}`);
});