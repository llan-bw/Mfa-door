const configs = require('dotenv').config();
const { openLock, closeLock } = require('./servo');
const { readButtons } = require('./keypad');
const { sleep } = require('./utils');
const { requestTwoFactorPin, requestTwoFactorVerification } = require('./bwTwoFactor');

if (configs.error) {
  throw configs.error
}

const superDuperSecretDoorPin = ["12345678", "98765432"];

doThisTwoFactorDoorThing = async () => {
  closeLock();

  while (true) {
    await sleep(500);
    console.log("Enter your Door Pin");
    // read pin until we get to eight
    enteredPin = await readButtons(8);

    if (superDuperSecretDoorPin.includes(enteredPin)) {
      console.log("Welcome home " + enteredPin + "!");
      console.log("Cool, sending you a 2fa now!");
      console.log("Enter your 2fa Pin.");
      // send Pin request to phone
      await requestTwoFactorPin();
      //enter 2fa pin
      twofactorPin = await readButtons(6);
      // check pin, if match, turn lock, else do nothing
      console.log("Checking your 2fa pin: " + twofactorPin);
      let verificationResult = await requestTwoFactorVerification(twofactorPin);

      if(verificationResult.valid) {
        console.log("Hazzah! Your door is unlocking");
        openLock();
      } else {
        console.log("Incorrect 2fa Pin, try again");
      }
    } else {
      console.log("Sorry, that pin is not a registered pin.  Try again.");
    }
  }
};

doThisTwoFactorDoorThing();
