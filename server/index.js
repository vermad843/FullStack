const express = require('express');
const cors = require('cors');
const Joi = require('joi');

const app = express();

app.use(cors());
app.use(express.json());


const schema = Joi.object().keys({                                     
  name: Joi.string().min(2).trim().required(),
  content: Joi.string().min(5).max(150).trim().required()                             
});

app.get('/', (req , res) => {
  res.json({
      message : 'Hello World'
  })  
});



app.post('/tweets', (req, res) => {
  const result =Joi.validate(req.body,schema);        //validating the the req.body data 
  if(result.error === null) {
   const tweet = {
     name : req.body.name,
     content : req.body.content,
     created : new Date()
   };
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