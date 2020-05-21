const mfa = require('@bandwidth/mfa');

// Configure the library to use the correct api credentials
mfa.Configuration.basicAuthUserName = process.env.BW_API_USER;
mfa.Configuration.basicAuthPassword = process.env.BW_API_PASS;

const requestTwoFactorPin = async () => {
  return await mfa.APIController.createMessagingTwoFactor(process.env.BW_ACCOUNT_ID,
    new mfa.TwoFactorCodeRequestSchema({
      from: process.env.BW_APPLICATION_PHONENUMBER,
      to: process.env.TO_PHONENUMBER,
      applicationId: process.env.BW_APPLICATION_ID,
      scope: 'authorization'
    }));
};

const requestTwoFactorVerification = async (pin) => {
  return await mfa.APIController.createVerifyTwoFactor(process.env.BW_ACCOUNT_ID,
    new mfa.TwoFactorVerifyRequestSchema({
      from: process.env.BW_APPLICATION_PHONENUMBER,
      to: process.env.TO_PHONENUMBER,
      applicationId: process.env.BW_APPLICATION_ID,
      scope: 'authorization',
      code: pin
    }));
};

module.exports = {
  requestTwoFactorPin,
  requestTwoFactorVerification
};
