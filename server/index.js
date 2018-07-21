const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../db');
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Server static assests
app.use(express.static(__dirname + '/../client/dist'));

// Design API to look up item by ID:
app.get(`/api/items/:id`, (req, res) => {
  db.getItembyID(req.params.id, (err, results) => {
    if (err) {
      console.log('Error sending get to API', err);
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
