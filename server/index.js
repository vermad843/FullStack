const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const monk = require('monk');
const Filter = require('bad-words');

const app = express();

const db = monk('localhost/twitterClone');
const tweets = db.get('tweets');
const filter = new Filter();

app.use(cors());
app.use(express.json());


const schema = Joi.object().keys({                                     
  name: Joi.string().min(2).trim().required(),
  content: Joi.string().min(5).max(150).trim().required()                             
});

app.get('/', (req,res) => {
  res.json({
    message : "Hello World!!!"
  })
})


app.get('/tweets', (req,res) => {
  tweets
     .find()
     .then((tweets) => {
       return res.json(tweets)
     })
})


app.post('/tweets', (req, res) => {
  const result =Joi.validate(req.body,schema);        //validating the the req.body data 
  if(result.error === null) {
   const tweet = {
     name : filter.clean(req.body.name),
     content : filter.clean(req.body.content),
     created : new Date()
   };
   tweets
   .insert(tweet)
   .then((createdTweet) => {
     res.json(createdTweet);
   });
  }else {
   res.status(422);
   res.json({
    message : 'Hey name and content are required'
   });
  }
});




app.listen(5000, () => {
   console.log('Listening on http://localhost:5000');
})