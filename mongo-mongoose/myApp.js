require('dotenv').config();
var mongoose = require('mongoose');


const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

var personSchema = new mongoose.Schema({
  name : {type: String, required: true},
  age : Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({name: 'Praveen',
  age:18,
  favoriteFoods:['Biryani', 'Laddu', 'Badam Milk']});

  person.save(function(err,data){
    if(err){console.log(err);}
    else {
      done(null,data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
 
 Person.create(arrayOfPeople, function(err,data){
    if(err){console.log(err);}
    else {
      done(null,data);
    }
  });

};

const findPeopleByName = (personName, done) => {

 Person.find({name:personName},function(err,data){
    if(err){console.log(err);}
    else {
      done(null,data);
    }
  });
};

const findOneByFood = (food, done) => {

   Person.findOne({favoriteFoods:food},function(err,data){
    if(err){console.log(err);}
    else {
      done(null,data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err,data){
    if(err){console.log(err);}
    else {done(null,data);}
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err,data)=>{
    if(err){console.log(err);}
    else{data.favoriteFoods.push(foodToAdd);
    data.save((error,newdata)=>{
if(error){console.log(error);}
else{done(null,newdata);}
    })}
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
if(err){console.log(err);}
else {done(null,data);}

});
 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},
  (err,data)=>{
if(err){console.log(err);}
else {done(null,data);}

});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,data)=>{
if(err){console.log(err);}
else {done(null,data);}

  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:{$all: [foodToSearch]}}).sort({name:'asc'}).limit(2).select('-age').exec((err,data)=>{
if(err){console.log(err);}
else {done(null,data);}

  });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
