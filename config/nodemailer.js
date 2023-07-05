const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth:{
        user:'mohitsainims260@gmail.com',
        pass:'vygxogutilhpioxl' // this password is google generated for user authentication instead of user own manual password
    }
});




let renderTemplate = (data, relativePath) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
          if (err) {
            console.log('Error in rendering templates:', err);
            reject(err);
          } else {
            resolve(template);
          }
        }
      );
    });
  };

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}