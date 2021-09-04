var maths= require('./maths');

setTimeout(function () {
  console.log("Heyy there!");
}, 3000);


var time = 0;
var timer = setInterval(function () {
  time += 2;
  console.log(`${time} seconds passed`);
  if (time > 10) {
    clearInterval(timer);
  }
}, 2000);

console.log(__dirname);
console.log(__filename);

console.log(maths.add(6,'9'));
