const Gpio = require('pigpio').Gpio;
const { sleep } = require('./utils');

const row1 = new Gpio(2, {
  mode: Gpio.OUTPUT
});
const row2 = new Gpio(3, {
  mode: Gpio.OUTPUT
});
const row3 = new Gpio(4, {
  mode: Gpio.OUTPUT
});
const row4 = new Gpio(17, {
  mode: Gpio.OUTPUT
});

const col1 = new Gpio(27, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN
});
const col2 = new Gpio(22, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN
});
const col3 = new Gpio(10, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN
});
const col4 = new Gpio(9, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN
});

// Constants for switch layout
const rowArray = [row1, row2, row3, row4];
const buttonArray = [
  ["1", "2", "3", "A"],
  ["4", "5", "6", "B"],
  ["7", "8", "9", "C"],
  ["*", "0", "#", "D"]
];

/**
 * Determine if a column is pulled high by testing each of the column wires.
 */
const readColumn = (row, column) => {
  let selectedValue = "";
  row.digitalWrite(1); // turn on row

  if (col1.digitalRead() == 1) {
    console.log(column[0]);
    selectedValue = column[0];
  } else if (col2.digitalRead() == 1) {
    console.log(column[1]);
    selectedValue = column[1];
  } else if (col3.digitalRead() == 1) {
    console.log(column[2]);
    selectedValue = column[2];
  } else if (col4.digitalRead() == 1) {
    console.log(column[3]);
    selectedValue = column[3];
  }

  row.digitalWrite(0); // turn off row
  return selectedValue;
}

/**
 * Read button presses until a desired length has been obtained.
 */
const readButtons = async (lengthOfButtonPresses) => {
  let pins = "";

  while (pins.length < lengthOfButtonPresses) {
    for (let i = 0; i < buttonArray.length; i++) {
      pins += readColumn(rowArray[i], buttonArray[i]);
    }
    await sleep(250);
  }
  return pins;
}

module.exports = {
  readButtons
}
