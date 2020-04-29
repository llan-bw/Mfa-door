// Helper function to pause for a certain amount of time
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

module.exports = {
  sleep
}
