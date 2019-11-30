const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const monk = require('monk');
const Filter = require('bad-words');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/twitterClone');
const tweets = db.get('tweets');
const filter = new Filter();

app.enable('trust proxy');

app.use(cors());
app.use(express.json());


const schema = Joi.object().keys({                                     
  name: Joi.string().min(2).trim().required(),
  content: Joi.string().min(5).max(150).trim().required()                             
});


app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!!!'
  });
});


app.get('/tweets', (req, res, next) => {
  tweets
    .find()
    .then(tweets => {
      res.json(tweets);
    }).catch(next);
});

const createTweet = (req, res, next) => {
  const result =Joi.validate(req.body,schema);        //validating the the req.body data 
  if(result.error === null) {
   const tweet = {
     name : filter.clean(req.body.name),
     content : filter.clean(req.body.content),
     created : new Date()
   };
    tweets
      .insert(tweet)
      .then(createdTweet => {
        res.json(createdTweet);
      }).catch(next);
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.'
    });
  }
};

app.post('/tweets', createTweet);
app.post('/v2/tweets', createTweet);

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message
  });
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});