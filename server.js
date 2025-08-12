require('dotenv').config(); 
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String] 
});


const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Nader Zeyara",
    age: 25,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};


const removeManyPeople = (done) => {
  Person.remove({ name: "Mohanad" }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort('name')      
    .limit(2)            
    .select('-age')      
    .exec((err, people) => {
      if (err) return done(err);
      done(null, people);
    });
};

module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};

createAndSavePerson((err, data) => {
  if (err) return console.error(err);
  console.log('Created person:', data);
});
