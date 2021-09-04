var add = function (a, b) {
  return a + b;
};
var subtract = function (a, b) {
  return a - b;
};
var pi = 3.1415;

module.exports = {
  add: add,
  subtract: subtract,
  pi: pi,
};
// or we can do using
// module.exports.add = add; and so on...
