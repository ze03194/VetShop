let nodemailer = require('nodemailer')

const emailConfig = (order) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vetshoptest@gmail.com',
            pass: 'urdlyuzqghtmxtuu'
        }
    });

    let mailOptions = {
        from: 'vetshoptest@gmail.com',
        to: order.email,
        subject: 'Order #' + order.id,
        text: 'Thanks for ordering from the Vet Shop!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}

module.exports = emailConfig

