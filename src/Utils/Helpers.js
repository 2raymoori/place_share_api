const generateID = () => {
  return Math.random().toString().split(".")[1];
};
module.exports = { generateID };
