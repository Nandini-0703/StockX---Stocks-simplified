import  express  from "express";
import axios from "axios";
import {Trackers} from "../models/Trackers.js";

const router = express.Router();

router.get("/info" , async (req,res) => {
 try {
    const { query } = req.query;

    const suggestionUrl = `https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=${query}&type=1&format=json&callback=suggest1`;
    const suggestionResponse = await axios.get(suggestionUrl);

    if (suggestionResponse.status !== 200) {
      throw new Error("Failed to fetch suggestions.");
    }

    const data = suggestionResponse.data
      .replace("suggest1", "")
      .replace(")", "")
      .replace("(", "");
    const sc_id = JSON.parse(data)[0].sc_id;

    const url = `https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${sc_id}`;
    const stockInfoResponse = await axios.get(url);

    res.status(200).json(stockInfoResponse.data);
 } catch (error) {
    console.error("Error during stockInfo:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  
 }
} );






router.post('/trackeddata', async (req, res) => {
  let data = req.body.company_data;
  


  let eId = await Trackers.findOne({ 'email': req.body.email })    
  if (eId===null) {
      try {
          console.log(data)
          console.log("1231242343242354",req.body.email)
          await Trackers.create({
              email: req.body.email,
              company_data:data
          }).then(() => {
              res.json({ success: true })
          })
      } catch (error) {
          console.log(error.message)
          res.send("Server Error", error.message)

      }
  }

  else {
      try {
        if (eId) {
          const trackedCompanies = eId.company_data;
          if (trackedCompanies.includes(data)) {
           
            return res.json({ success: false, message: 'You are already tracking this company' });
          }
        }
    
          await Trackers.findOneAndUpdate({email:req.body.email},
              { $push:{company_data: data} }).then(() => {             
                  res.json({ success: true })                         
              })
      } catch (error) {
          console.log(error.message)
          res.send("Server Error", error.message)            
      }
  }
})


router.post('/mytrackedcompany' , async(req , res) => {
  try {
    let myData = await Trackers.findOne({'email':req.body.email})
    res.json({TrackedData: myData})
  } catch (error) {
    res.send("Server Error", error.message)     
  }
})




router.post('/removeTrackedCompany', async (req, res) => {
  try {
    const { email, companyName } = req.body; 

    
    const tracker = await Trackers.findOne({ email });

    if (!tracker) {
      return res.status(404).json({ message: "Tracker not found for the given email" });
    }


    tracker.company_data = tracker.company_data.filter(company => company !== companyName);

    
    await tracker.save();

    res.status(200).json({ message: "Tracked company removed successfully" });
  } catch (error) {
    console.error("Error removing tracked company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





export default router;