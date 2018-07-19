const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

const generateRandomNumber = function(min, max, decimal) {
  decimal = decimal || 0;
  let rand = Math.random() * (max - min) + min;
  let power = Math.pow(10, decimal);
  return Math.floor(rand * power) / power;
};

const generateRandomDate = function(start, end) {
  let randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  let prettyDate = moment(randomDate).format('LL');
  return prettyDate;
};

const randomItemPicker = function(array) {
  return array[generateRandomNumber(0, array.length)];
};

const stores = [
  {
    storeID: 0,
    storeName: 'Target',
    freeMinimumShipping: 15
  },

  {
    storeID: 1,
    storeName: 'Costco',
    freeMinimumShipping: 35
  },

  {
    storeID: 2,
    storeName: 'Walgreens',
    freeMinimumShipping: 15
  },

  {
    storeID: 3,
    storeName: 'Walmart',
    freeMinimumShipping: 35
  }
];

const generateItems = function(limit) {
  let itemArray = [];

  itemArray[0] = {
    id: 0,
    price: 2000.00,
    storeID: 0,
    storeName: 'Target',
    storeDeliveryTime: 'August 10, 2018',
    freeMinimumShipping: 15
  };

  for (let index = 0; index < limit; index++) {
    let randomStore = randomItemPicker(stores);
    let generatedItem = {
      id: index,
      price: generateRandomNumber(1, 500, 2),
      storeID: randomStore.storeID,
      storeName: randomStore.storeName,
      storeDeliveryTime: generateRandomDate(new Date(2018, 7, 1), new Date(2018, 7, 14)),
      freeMinimumShipping: randomStore.freeMinimumShipping
    };
    itemArray.push(generatedItem);
  }
  return itemArray;
};


const createAndWriteToFile = function() {
  let data = generateItems(100);
  let filename = 'seedData.js';

  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error saving file: ', err);
      return;
    }
    console.log('File saved!');
  });
};

createAndWriteToFile();
