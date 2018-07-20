const mysql = require('mysql');
const moment = require('moment');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect();

// Drop database if it exists:
connection.query('drop database if exists expressel;', (error) => {
  if (error) throw error;
});

// Create new database:
connection.query('create database expressel;', (error) => {
  if (error) throw error;
});

// Use the newly-created database
connection.query('use expressel;', (error) => {
  if (error) throw error;
});

// Create table 'items'
connection.query(`create table if not exists items (
  id integer not null auto_increment,
  price float not null,
  storeID int not null,
  storeName varchar(100) not null,
  storeMinimumFreeShipping int not null,
  itemDeliveryTime varchar(100) not null,
  primary key (id)
);`, (error) => {
  if (error) throw error;
});

// Create a function to generate a random number:
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

// Use to generate a random list of items
const generateItems = function(num) {
  for (let i = 0; i < num; i++) {
    let generatedItem = {
      price: generateRandomNumber(1, 3000, 2),
      storeID: generateRandomNumber(1, 5, 0),
      storeName: randomItemPicker(['Target', 'Walmart', 'Walgreens', 'Costco']),
      storeMinimumFreeShipping: generateRandomNumber(0, 50, 0),
      itemDeliveryTime: generateRandomDate(new Date(2018, 7, 1), new Date(2018, 7, 14))
    };
    connection.query(`insert into items (
        price,
        storeID,
        storeName,
        storeMinimumFreeShipping,
        itemDeliveryTime
      ) values (
        '${generatedItem.price}',
        '${generatedItem.storeID}',
        '${generatedItem.storeName}',
        '${generatedItem.storeMinimumFreeShipping}',
        '${generatedItem.itemDeliveryTime}')`, (error) => {
          if (error) throw error;
      });
    }
};

// Insert 100 items into the database:
generateItems(100);
