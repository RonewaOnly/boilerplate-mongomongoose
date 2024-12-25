require('dotenv').config();
const mongoose = require('mongoose');
// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create model
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({ name: 'John', age: 30, favoriteFoods: ['pizza', 'burger'] }); 
  person.save((err, data) => {
    if (err) {
      console.log(err);
      done(err,none);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log(err);
      done(err, null);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log(err);
      done(err, null);
    }
    done(null, data);
  }
  );
};


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $in: [food] } }, (err, data) => {
    if (err) {
      console.log(err);
      done(err, null);
    }
    done(null, data);
  } 
  );
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err);
      done(err, null);
    }
    done(null, data);
  }
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done({ message: 'Person not found' });
    
    // Add hamburger to favoriteFoods array
    person.favoriteFoods.push("hamburger");
    
    // Mark favoriteFoods as modified if using Mixed type
    // person.markModified('favoriteFoods');
    
    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
