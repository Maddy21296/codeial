const fs = require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path:'/assets',
    session_cookie_key:'TpjaiQaRScmVHldU0pNLzkemDkAgBbkb',
    db:'codeial_development',
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth:{
            user:'mohitsainims260@gmail.com',
            pass:'vygxogutilhpioxl' // this password is google generated for user authentication instead of user own manual password
        }
    },
    google_client_id:'1082568207078-1c84n9al9mc6eqv601193ft4u9plfl9o.apps.googleusercontent.com',
    google_client_secret:'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',
    google_call_back_url:'http://localhost:8000/users/auth/google/callback',

    jwt_secret:'EHFsLmF0RcjM7eJMlF8sBkyilzZqw0Fm',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
    

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth:{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
            // this password is google generated for user authentication instead of user own manual password
        }
    },
    google_client_id: '1082568207078-1c84n9al9mc6eqv601193ft4u9plfl9o.apps.googleusercontent.com',
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,

    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
    

}




module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);