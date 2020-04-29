const axios = require('axios');

const requestTwoFactorPin = async () => {
  axios
    .post(process.env.BW_TWOFACTOR_URL, {
      Text2FA: [{
        AccountId: [process.env.BW_ACCOUNT_ID]
      }, {
        ApplicationId: [process.env.BW_APPLICATION_ID]
      }, {
        Action: ["Authentication"]
      }, {
        To: [{
          PhoneNum: [process.env.TO_PHONENUMBER]
        }]
      }, {
        From: [{
          PhoneNum: [process.env.BW_APPLICATION_PHONENUMBER]
        }]
      }]
    }, {
      auth: {
        username: process.env.BW_API_USER,
        password: process.env.BW_API_PASS
      }
    });
};

const requestTwoFactorVerification = async (pin) => {
  return axios
    .post(process.env.BW_TWOFACTOR_URL, {
      CheckCode: [{
        AccountId: [process.env.BW_ACCOUNT_ID]
      }, {
        ApplicationId: [process.env.BW_APPLICATION_ID]
      }, {
        Action: ["Authentication"]
      }, {
        To: [{
          PhoneNum: [process.env.TO_PHONENUMBER]
        }]
      }, {
        From: [{
          PhoneNum: [process.env.BW_APPLICATION_PHONENUMBER]
        }]
      }, pin + ""]
    }, {
      auth: {
        username: process.env.BW_API_USER,
        password: process.env.BW_API_PASS
      }
    }).then(res =>
      res.data
    );
};

module.exports = {
  requestTwoFactorPin,
  requestTwoFactorVerification
};
