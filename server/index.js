const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Server static assests
app.use(express.static(__dirname + '/../client/dist'));



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
