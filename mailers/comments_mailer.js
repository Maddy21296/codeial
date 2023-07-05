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
  
      try {
        await nodeMailer.transporter.sendMail(mailOptions);
        console.log('Message Sent');
      } catch (err) {
        console.log('Error in sending mail', err);
      }
    } catch (err) {
      console.log('Error in newComment:', err);
    }
  };