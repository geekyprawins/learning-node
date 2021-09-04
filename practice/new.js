var events = require("events");
var util = require("util");

var myEmitter = new events.EventEmitter();
myEmitter.on("speak", function (mssg) {
  console.log("Soemone said: " + mssg);
});
myEmitter.emit("speak", "Hello Peter!");

var Person = function (name) {
  this.name = name;
};

util.inherits(Person, events.EventEmitter);

var james = new Person("James Rhodes");
james.on("say", function (mssg) {
  console.log(`${james.name} said : ${mssg}`);
});
james.emit("say", "Boom you looking for this!");
