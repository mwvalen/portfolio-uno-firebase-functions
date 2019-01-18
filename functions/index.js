const functions = require('firebase-functions');
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const cors = require('cors')({
    origin: true,
  });

const auth ={
    auth: {
        api_key: 'a60fb8fc11bef907319f3e9af208f3b1-3939b93a-63786eec',
        domain: 'sandbox56f47d748fc341398e8e2dbe5a3f1242.mailgun.org'
    }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const APP_NAME = 'Dakshya Portfolio Uno'

exports.sendContactFormEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        //email is who to send to
        console.log("IN THE CORS")

        nodemailerMailgun.sendMail({
            from: `${APP_NAME} <noreply@firebase.com>`,
            to: ['mwillvalentine@gmail.com','dakshyasharma01@gmail.com'], // An array if you have multiple recipients.
            subject: 'Hey you - Contact form submitted from your site!',
            html: `Message from: ${req.query.email} <br />
                    ${req.query.message}`
          }, (err, info) => {
            if (err) {
              console.log(`Error: ${err}`)
              return res.sendStatus(500)
            }
            else {
              console.log(`Response: ${info}`);
              return res.sendStatus(200)
            }
          });
    })
})