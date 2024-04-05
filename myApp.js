require('dotenv').config();
console.log(process.env.MONGO_URI);
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let personSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:Number,
  favoriteFoods:[String]
});

let Person=mongoose.model('Person',personSchema);


const createAndSavePerson = (done) => {
  //creating new document or record
  var Person1=new Person({
    name:"Chris",
    age:22,
    favoriteFoods:["Fries","Chicken"]
  });
  
  //saving the record
  //async operation
  Person1.save((err,createdUser)=>{
    if(err){
      return done(err);
    }
    done(null, createdUser);
  })
   
 
};

arrayOfPeople=[
  { name: 'jane_doe',  age: 25, favoriteFoods:["Fries","Chicken"] },
  { name: 'alice_smith',  age: 35, favoriteFoods:["Ugali","Nyama"] },
  { name: 'gail_obeezy',  age: 55, favoriteFoods:["Pilau","Chapati"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  
  //async operation
  Person.create(arrayOfPeople,(err, createdUsers)=>{
    if(err){
      return done(err);
    }
    done(null ,createdUsers);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,foundUsers)=>{
    if(err){
      return done(err);
    }
    done(null ,foundUsers);
   })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,foundUser)=>{
    if(err){
      return console.log(err);
    }
    done(null ,foundUser);
   })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=>{
    if(err){
      return console.log(err);
    }
    done(null ,data);
   })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  //finds user
  Person.findById(personId, (err,user)=>{
    if(err){
      return done(err);
    }
    
    //updates user
    user.favoriteFoods.push(foodToAdd);

    //saves update
    user.save((err,updatedUser)=>{
      if(err){
        return done(err);
      }
     return done(null ,updatedUser);
    })
  }) 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {$set:{age:ageToSet}}, {new:true}, (err,user)=>{
    if(err){
      return done(err);
    }
    done(null, user);
  }); 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,removedUser)=>{
    if(err){
      done(err);
    }
   return done(null, removedUser);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,users)=>{
    if(err){
      console.log(err);
    }
     done(null,users);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select("name favoriteFoods")
  .exec((err, data)=>{
    if(err){
      return done(err)
    }
    done(null, data);
  })
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
