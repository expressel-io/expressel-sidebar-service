const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../db/index.js')
const PORT = 5002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Server static assests
app.use(express.static(__dirname + '/../client/dist'));

// Design API to look up item by ID:
app.get('/items/:itemID'), (req, res) => {
  db.getItembyID(req.params.itemID, (err, results) => {
    if (err) {
      console.log('Error sending get to API', err);
    } else {
      res.json(results);
    }
  });
  res.json('I got here!');
};

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
