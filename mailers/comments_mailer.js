const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = async (comment) => {
    try {
      console.log('Inside new comment mailer', comment);
  
      let htmlTemplate = await nodeMailer.renderTemplate(
        { comment: comment },
        '/comments/new_comment.ejs'
      );
  
      let mailOptions = {
        from: 'mohitsainims260@gmail.com', 
        to: comment.user.email,
        subject: 'New comment published',
        html: htmlTemplate,
      };
  
      await nodeMailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log('Error in sending mail', err);
        } else {
          console.log('Message Sent', info);
        }
      });
    } catch (err) {
      console.log('Error in newComment:', err);
    }
  };