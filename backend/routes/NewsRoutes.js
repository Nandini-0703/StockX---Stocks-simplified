import express from 'express';
import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config();



import companies from "../../frontend/util/companyname.json" assert { type: 'json' };

import language from  '@google-cloud/language';
const client = new language.LanguageServiceClient();
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.NEWS_API_KEY}`);
     
      const responseData = response.data;
      res.json(responseData);
    } catch (error) {
     console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



router.post('/analyze', async (req, res) => {
  const {  description , title ,  url} = req.body;
  let companyArr = [];
  let entitiesArr = [];
  const response = await fetch(url);
    const contenturl = await response.text();

  const document = {
    content: contenturl, 
    type: 'PLAIN_TEXT',
  };

  try {
   
    const [sentimentResult] = await client.analyzeSentiment({ document: document });
    const sentiment = sentimentResult.documentSentiment;
    console.log('Sentiment:', sentiment);

   
    const [entitiesResult] = await client.analyzeEntities({ document: document });
    const entities = entitiesResult.entities;
    for (let i in entities) {
      if (entities[i].type == "ORGANIZATION") {
        entitiesArr.push(entities[i]);
      }
    }

    
    for ( let i in companies) {
      for ( let j in entitiesArr) {
   
        if (
         
      
        companies[i]["Company Name"] === entitiesArr[j].name || 
        companies[i]["Symbol"] === entitiesArr[j].name
        ) {
          let obj = {};
          obj["Company Name"] = companies[i]["Company Name"];
          obj["Symbol"] = companies[i]["Symbol"];
          obj["name"] = entitiesArr[j].name;
          obj["sentiment"] = entities[j].sentiment;
          companyArr.push(obj);
        }
      }
    }
    
 
    let result = {
      entities: entitiesArr,
      companyArr,
      title,
    
      description , 
      sentiment
      
    };
    console.log(result);

    res.status(200).json(result);
  
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({
      message: 'Something went wrong',
      error: err,
      errmsg: err.toString(),
    });
  }
});





  export default router ;