const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas — by Mohanad Zeyara"))
  .catch((err) => console.error("MongoDB connection error:", err));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = async () => {
  const person = new Person({
    name: "Nader Zeyara",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"],
  });

  try {
    const savedPerson = await person.save();
    console.log("Person saved by Mohanad Zeyara:", savedPerson);
  } catch (err) {
    console.error(err);
  }
};

const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("Many people created by Mohanad Zeyara:", people);
  } catch (err) {
    console.error(err);
  }
};

const findPeopleByName = async (personName) => {
  try {
    const people = await Person.find({ name: personName });
    console.log(`People named ${personName} — checked by Mohanad Zeyara:`, people);
  } catch (err) {
    console.error(err);
  }
};

const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(`Found person who likes ${food} — searched by Mohanad Zeyara:`, person);
  } catch (err) {
    console.error(err);
  }
};

const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Found person by ID — queried by Mohanad Zeyara:", person);
  } catch (err) {
    console.error(err);
  }
};

const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log("Person not found");
      return;
    }
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Updated person — edited by Mohanad Zeyara:", updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log("Updated person — updated by Mohanad Zeyara:", updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log("Removed person — deleted by Mohanad Zeyara:", removedPerson);
  } catch (err) {
    console.error(err);
  }
};

const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("Removed all Marys — cleaned by Mohanad Zeyara:", result);
  } catch (err) {
    console.error(err);
  }
};

const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec();
    console.log("Burrito lovers — found by Mohanad Zeyara:", data);
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  await createAndSavePerson();

  await createManyPeople([
    { name: "Tamer Zeyara", age: 35, favoriteFoods: ["Burritos"] },
    { name: "Ahmad Zeyara", age: 28, favoriteFoods: ["Pizza", "Burritos"] },
    { name: "Anas Zeyara", age: 32, favoriteFoods: ["Pasta", "Burritos"] },
  ]);

  await findPeopleByName("Tamer Zeyara");
  await findOneByFood("Pizza");

  // await findPersonById("PUT_A_VALID_ID_HERE");
  // await findEditThenSave("PUT_A_VALID_ID_HERE");
  // await removeById("PUT_A_VALID_ID_HERE");

  await findAndUpdate("Tamer Zeyara");
  await removeManyPeople();
  await queryChain();
})();

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000 — by Mohanad Zeyara");
});
