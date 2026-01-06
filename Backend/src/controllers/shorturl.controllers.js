import {createShortUrlService} from '../services/shortUrl.services.js';
import  urlSchema  from "../models/shorturl.models.js";

export const createShortUrl = async (req,res)=>{
   try {
     const {url} = req.body; //takes url from the request body
     if(!url){
        return res.status(400).json({ message: 'Invalid URL' });
     }


      const userId = req.user ? req.user._id : null;

    //  if(req.user){
    //     const shortUrl = await createShortUrlWithUser(url, req.user._id);
    //  }else{
    //     const shortUrl = await createshortUrlWithoutUser(url);
    //  }

    //  //check if longUrl already exists in the database
    //  const existingUrl = await urlSchema.findOne({
    //     longUrl: url
    //  })

    //   if (existingUrl) {
    //         return res.status(200).json({
    //             longUrl: existingUrl.longUrl,
    //             shortUrl: process.env.APP_URL + existingUrl.shortUrl
    //         });
    //     }
     
         // Create new short URL
        const shortUrl = await createShortUrlService(url, userId);

        res.status(201).json({
            longUrl: url,
            shortUrl: process.env.APP_URL + shortUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

//---------------------------------------------------------------
     //Then create a new short url

    //  const shortUrl = generateNanoId(7); // calling the util function to generate nano id from utils/helper.js

     //Create another util fn for this in utils folder later
    // const shortUrl  = nanoid(7); // generates a random string of 7 characters
    // //creates short url id
//--------------------------------------------------------------

    //create a newUrl
    // const shortUrl = generateNanoId(7);
    // const newUrl = new urlSchema({
    //     longUrl: url,
    //     shortUrl: shortUrl
    // })
    // await newUrl.save(); //saves the new url to the database
  // res.status(201).json(newUrl); //returns success response
 
}


export const redirectUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const url = await urlSchema.findOne({ shortUrl: id });
        if (!url) return res.status(404).json({ message: 'No url found' });

        // Increment clicks
        url.clicks = (url.clicks || 0) + 1;
        await url.save();

        //Redirect to the original long URL
        res.redirect(url.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const createCustomUrl = async (req,res)=>{
    const {url, customUrl} = req.body; //takes url and customUrl from the request body
    //customUrl is optional, if user wants to set a custom short url
    const shortUrl = customUrl ? customUrl : generateNanoId(7); //if customUrl is provided, use it, else generate a new one

    // Create a new URL with the custom short URL
    const newUrl = new urlSchema({
        longUrl: url,
        shortUrl: shortUrl
    });
    await newUrl.save(); //saves the new url to the database
    res.status(201).json(newUrl); //returns success response

}