const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-log-strategy');

// we are storing session information in mongo 
const MongoStore = require('connect-mongo'); // (session) is used coz we will store session data in mongo

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
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
    secret: 'blahsomething',
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