#! /usr/bin/env node

console.log('This script populates an ingredients list to your database.');

// Get arguments passed on command line
let userArgs = process.argv.slice(2);

let async = require('async')
let ingredientList = require('../server/models/IngredientList')

let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let ingredients = [];

function ingredientCreate(ingredientItem, cb) 
{
  ingredientDetail = { 
    Ingredient: ingredientItem
  }

  let newIngredient = new ingredientList(ingredientDetail);
       
  newIngredient.save(function (err) 
  {
    if (err) 
    {
      cb(err, null);
      return;
    }
    console.log('New Ingredient: ' + newIngredient);
    ingredients.push(newIngredient)
    cb(null, newIngredient);
  } );
}

// Creation of test data - users
function createIngredients(cb) {
    async.series(
      [
        function(callback) {
          ingredientCreate('Apples', callback);
        },
        function(callback) {
          ingredientCreate('Asparagus', callback);
        },
        function(callback) {
          ingredientCreate('Bananas', callback);
        },
        function(callback) {
          ingredientCreate('Beans', callback);
        },
        function(callback) {
          ingredientCreate('Beef', callback);
        },
        function(callback) {
          ingredientCreate('Beets', callback);
        },
        function(callback) {
          ingredientCreate('Bell Peppers', callback);
        },
        function(callback) {
          ingredientCreate('Blueberries', callback);
        },
        function(callback) {
          ingredientCreate('Broccoli', callback);
        },
        function(callback) {
          ingredientCreate('Brussel Sprouts', callback);
        },
        function(callback) {
          ingredientCreate('Cabbage', callback);
        },
        function(callback) {
          ingredientCreate('Cane Berries', callback);
        },
        function(callback) {
          ingredientCreate('Carrots', callback);
        },
        function(callback) {
          ingredientCreate('Cauliflower', callback);
        },
        function(callback) {
          ingredientCreate('Celery', callback);
        },
        function(callback) {
          ingredientCreate('Cheese', callback);
        },
        function(callback) {
          ingredientCreate('Cherries', callback);
        },
        function(callback) {
          ingredientCreate('Chicken', callback);
        },
        function(callback) {
          ingredientCreate('Corn', callback);
        },
        function(callback) {
          ingredientCreate('Cranberries', callback);
        },
        function(callback) {
          ingredientCreate('Cucumber', callback);
        },
        function(callback) {
          ingredientCreate('Eggplant', callback);
        },
        function(callback) {
          ingredientCreate('Eggs', callback);
        },
        function(callback) {
          ingredientCreate('Garlic', callback);
        },
        function(callback) {
          ingredientCreate('Grapes', callback);
        },
        function(callback) {
          ingredientCreate('Green Beans', callback);
        },
        function(callback) {
          ingredientCreate('Herbs and Spices', callback);
        },
        function(callback) {
          ingredientCreate('Hot Peppers', callback);
        },
        function(callback) {
          ingredientCreate('Kale', callback);
        },
        function(callback) {
          ingredientCreate('Kiwi', callback);
        },
        function(callback) {
          ingredientCreate('Leafy Greens', callback);
        },
        function(callback) {
          ingredientCreate('Leeks', callback);
        },
        function(callback) {
          ingredientCreate('Lentils', callback);
        },
        function(callback) {
          ingredientCreate('Mangos', callback);
        },
        function(callback) {
          ingredientCreate('Microgreens', callback);
        },
        function(callback) {
          ingredientCreate('Milk', callback);
        },
        function(callback) {
          ingredientCreate('Mushrooms', callback);
        },
        function(callback) {
          ingredientCreate('Oats', callback);
        },
        function(callback) {
          ingredientCreate('Onions', callback);
        },
        function(callback) {
          ingredientCreate('Oranges', callback);
        },
        function(callback) {
          ingredientCreate('Parsnips', callback);
        },
        function(callback) {
          ingredientCreate('Peaches', callback);
        },
        function(callback) {
          ingredientCreate('Pears', callback);
        },
        function(callback) {
          ingredientCreate('Peas', callback);
        },
        function(callback) {
          ingredientCreate('Pineapple', callback);
        },
        function(callback) {
          ingredientCreate('Pork', callback);
        },
        function(callback) {
          ingredientCreate('Potatoes', callback);
        },
        function(callback) {
          ingredientCreate('Pumpkin', callback);
        },
        function(callback) {
          ingredientCreate('Radishes', callback);
        },
        function(callback) {
          ingredientCreate('Rhubarb', callback);
        },
        function(callback) {
          ingredientCreate('Rice', callback);
        },
        function(callback) {
          ingredientCreate('Salad Greens', callback);
        },
        function(callback) {
          ingredientCreate('Salmon', callback);
        },
        function(callback) {
          ingredientCreate('Spinach', callback);
        },
        function(callback) {
          ingredientCreate('Split Peas', callback);
        },
        function(callback) {
          ingredientCreate('Strawberries', callback);
        },
        function(callback) {
          ingredientCreate('Summer Squash', callback);
        },
        function(callback) {
          ingredientCreate('Sweet Potato', callback);
        },
        function(callback) {
          ingredientCreate('Tofu', callback);
        },
        function(callback) {
          ingredientCreate('Tomatoes', callback);
        },
        function(callback) {
          ingredientCreate('Tuna', callback);
        },
        function(callback) {
          ingredientCreate('Turkey', callback);
        },
        function(callback) {
          ingredientCreate('Turnips', callback);
        },
        function(callback) {
          ingredientCreate('Water', callback);
        },
        function(callback) {
          ingredientCreate('Watermelon', callback);
        },
        function(callback) {
          ingredientCreate('Wheat', callback);
        },
        function(callback) {
          ingredientCreate('Whole Grains', callback);
        },
        function(callback) {
          ingredientCreate('Winter Squash', callback);
        },
        function(callback) {
          ingredientCreate('Yogurt', callback);
        }
      ], cb);
  }

async.series([
    createIngredients
  ],
  // Optional callback
  function(err, results) {
    if (err) 
    {
      console.log('FINAL ERR: '+err);
    }
    else
    {
      console.log('Ingredients');
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });