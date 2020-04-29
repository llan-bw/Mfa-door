const configs = require('dotenv').config();
const { openLock, closeLock } = require('./servo');
const { readButtons } = require('./keypad');
const { sleep } = require(./utils);

if (configs.error) {
  throw configs.error
}

// const motor = new Gpio(13, {
//   mode: Gpio.OUTPUT
// });
//
// // width of PWM in ms
// const maxWidth = 2000;
// const minWidth = 1600;
//
// openLock = () => {
//   console.log("Lock currently close, opening");
//   motor.servoWrite(minWidth);
// }
//
// closeLock = () => {
//   console.log("Lock currently open, closing");
//   motor.servoWrite(maxWidth);
// }
//
// operateLock = async (doorOperation) => {
//   await sleep(1000);
//   doorOperation();
//   await sleep(1000);
// }
//
// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// ----
// const row1 = new Gpio(2, {
//   mode: Gpio.OUTPUT
// });
// const row2 = new Gpio(3, {
//   mode: Gpio.OUTPUT
// });
// const row3 = new Gpio(4, {
//   mode: Gpio.OUTPUT
// });
// const row4 = new Gpio(17, {
//   mode: Gpio.OUTPUT
// });
//
// const col1 = new Gpio(27, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN
// });
// const col2 = new Gpio(22, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN
// });
// const col3 = new Gpio(10, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN
// });
// const col4 = new Gpio(9, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN
// });
//
// // Constants for switch layout
// const rowArray = [row1, row2, row3, row4];
// const buttonArray = [
//   ["1", "2", "3", "A"],
//   ["4", "5", "6", "B"],
//   ["7", "8", "9", "C"],
//   ["*", "0", "#", "D"]
// ];
//
// /**
//  * Determine if a column is pulled high by testing each of the column wires.
//  */
// readColumn = (row, column) => {
//   let selectedValue = "";
//   row.digitalWrite(1); // turn on row
//
//   if (col1.digitalRead() == 1) {
//     console.log(column[0]);
//     selectedValue = column[0];
//   } else if (col2.digitalRead() == 1) {
//     console.log(column[1]);
//     selectedValue = column[1];
//   } else if (col3.digitalRead() == 1) {
//     console.log(column[2]);
//     selectedValue = column[2];
//   } else if (col4.digitalRead() == 1) {
//     console.log(column[3]);
//     selectedValue = column[3];
//   }
//
//   row.digitalWrite(0); // turn off row
//   return selectedValue;
// }
//
// /**
//  * Read button presses until a desired length has been obtained.
//  */
// readButtons = async (lengthOfButtonPresses) => {
//   let pins = "";
//
//   while (pins.length < lengthOfButtonPresses) {
//     for (let i = 0; i < buttonArray.length; i++) {
//       pins += readColumn(rowArray[i], buttonArray[i]);
//     }
//     await sleep(250);
//   }
//   return pins;
// }
// --

// requestTwoFactorPin = async () => {
//   axios
//     .post('https://mfa.bandwidth.com/app/two-factor', {
//       Text2FA: [{
//         AccountId: ["5006143"]
//       }, {
//         ApplicationId: ["d494aaa3-1a98-49b9-bb6a-d11f89062bc6"]
//       }, {
//         Action: ["Authentication"]
//       }, {
//         To: [{
//           PhoneNum: ["+17044901583"]
//         }]
//       }, {
//         From: [{
//           PhoneNum: ["+19197691156"]
//         }]
//       }]
//     }, {
//       auth: {
//         username: "llan-two-factor-api-user",
//         password: "nG#gfX!_)ZY;3DNm"
//       }
//     });
// };
//
// requestTwoFactorVerification = async (pin) => {
//   return axios
//     .post('https://mfa.bandwidth.com/app/two-factor', {
//       CheckCode: [{
//         AccountId: ["5006143"]
//       }, {
//         ApplicationId: ["d494aaa3-1a98-49b9-bb6a-d11f89062bc6"]
//       }, {
//         Action: ["Authentication"]
//       }, {
//         To: [{
//           PhoneNum: ["+17044901583"]
//         }]
//       }, {
//         From: [{
//           PhoneNum: ["+19197691156"]
//         }]
//       }, pin + ""]
//     }, {
//       auth: {
//         username: "llan-two-factor-api-user",
//         password: "nG#gfX!_)ZY;3DNm"
//       }
//     }).then(res =>
//       res.data
//     );
// };

// --

const superDuperSecretDoorPin = ["12345678", "98765432"];

doThisTwoFactorDoorThing = async () => {
  operateLock(closeLock);

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
        operateLock(openLock);
      } else {
        console.log("Incorrect 2fa Pin, try again");
      }
    } else {
      console.log("Sorry, that pin is not a registered pin.  Try again.");
    }
  }
};

doThisTwoFactorDoorThing();
