const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


const port  = process.env.PORT || 5000;
app.use(cors());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const Recipe = require('./recipe');
app.use('/' , Recipe);





app.use(express.json());
app.listen(port,  () => console.log('listening on port ' + port));
