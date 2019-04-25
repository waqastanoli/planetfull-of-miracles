const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')('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');

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
        value: `Click on this link to verify your email ${req.protocol + '://' + req.get('host')}/verification?token=${token}&email=${to}`
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