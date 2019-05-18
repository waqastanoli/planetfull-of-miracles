const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')('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');
import API_URL from '../../client/config/API_URL';
module.exports = (req, to, token) => {
    const hostUrl = process.env.hostURL;
    const request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            subject:"Verify Your Email"
          }
        ],
        from: {
          email: "no-reply@example.com"
        },
        content: [
      {
        type: 'text/plain',
        value: `Click on this link to verify your email ${API_URL.API_URL}/verification?token=${token}&email=${to}`
      }
    ]
      }
    });
    return new Promise(function (resolve, reject) {
      sg.API(request, function (error, response) {
        if (error) {
          return reject(error);
        }
        else {
          return resolve(response);
        }
      });
    });
  };