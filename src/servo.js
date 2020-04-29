const Gpio = require('pigpio').Gpio;
const { sleep } = require('./utils');

const motor = new Gpio(13, {
  mode: Gpio.OUTPUT
});

/**
 * Open the door lock by moving the servo
 */
const openLock = () => {
  console.log("Lock currently close, opening");
  motor.servoWrite(process.env.SERVO_CLOSEWIDTH);
};

/**
 * Close the door lock by moving the servo
 */
const closeLock = () => {
  console.log("Lock currently open, closing");
  motor.servoWrite(process.env.SERVO_OPENWIDTH);
};

module.exports = {
  openLock,
  closeLock
};
