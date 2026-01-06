import {createShortUrlService} from '../services/shortUrl.services.js';
import  urlSchema  from "../models/shorturl.models.js";
import { generateNanoId } from '../utils/helper.js';

//controller must pass slug only if logged in user provides it
// export const createShortUrl = async (req,res)=>{
//    try {
//      const {url, slug} = req.body; //takes url and slug from the request body

//         if (!url) return res.status(400).json({ message: "URL is required" });

//     //If loggedin , req.user exists
//       const userId = req.user ? req.user._id : null;
     
//          // Create new short URL
//         const shortUrl = await createShortUrlService(url, userId);

//         res.status(201).json({
//             longUrl: url,
//             shortUrl: process.env.APP_URL + shortUrl
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }

// //---------------------------------------------------------------
//      //Then create a new short url

//     //  const shortUrl = generateNanoId(7); // calling the util function to generate nano id from utils/helper.js

//      //Create another util fn for this in utils folder later
//     // const shortUrl  = nanoid(7); // generates a random string of 7 characters
//     // //creates short url id
// //--------------------------------------------------------------

//     //create a newUrl
//     // const shortUrl = generateNanoId(7);
//     // const newUrl = new urlSchema({
//     //     longUrl: url,
//     //     shortUrl: shortUrl
//     // })
//     // await newUrl.save(); //saves the new url to the database
//   // res.status(201).json(newUrl); //returns success response
 
// }
//---------------------------------------------------------------------------------

export const createShortUrl = async (req, res) => {
  try {

    //Extracts url and slug from request body
    const { url, slug } = req.body;
    //url = "https://google.com"
    //slug = "mycustom123"

    if (!url) return res.status(400).json({ message: "URL is required" });

// req.user is set by JWT middleware
    // If user is logged in: 1.userId = MongoDB user _id  2. If NOT logged in:
    const userId = req.user ? req.user._id : null;

    //If user did NOT provide a slug => Then auto-shortening logic applies
    // 👇 Only auto-return if slug NOT provided
    if (!slug) {
      const existing = await urlSchema.findOne({ longUrl: url }); //Database searches for longUrl
      if (existing) {
        //If longUrl exists and no slug provided, return existing shortUrl
        return res.status(200).json({
          longUrl: existing.longUrl,
          shortUrl: process.env.APP_URL + existing.shortUrl,
        });
      }
    }

    // Create new short URL
    let shortUrl;

    if (slug) {
        //check if slug already exists => Checks if "mycustom123" already exists
        // If exists, 
      const exists = await urlSchema.findOne({ shortUrl: slug });
      if (exists) {
        return res.status(400).json({ message: "Custom slug already exists" });
      }
      //If already not exists, use user’s slug
      shortUrl = slug; //Accept user’s slug
    } else {

       //Case2: No slug provided -> auto-generate shortUrl 
       //Keep generating until unique shortUrl is found
      let exists = true;
      while (exists) {
        shortUrl = generateNanoId(7);
        exists = await urlSchema.findOne({ shortUrl });
      }
    }

    // Save to database
    const newUrl = new urlSchema({
      longUrl: url,
      shortUrl,
      user: userId,
    });
    await newUrl.save();

    // Return response => shortUrl created successfully => here, we return the shortUrl
    res.status(201).json({
      longUrl: url,
      shortUrl: process.env.APP_URL + shortUrl,
      message: "Short URL created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




export const redirectUrl = async (req, res) => {
    try {
        //Get shortUrl from request params
        const { id } = req.params; //id = mycustom123

        //Finds Original URL by shortUrl
        const url = await urlSchema.findOne({ shortUrl: id }); //Find the url document by shortUrl
        if (!url) return res.status(404).json({ message: 'No url found' });

        // Increment clicks
        url.clicks = (url.clicks || 0) + 1;
        await url.save();

        //If url found
        //Redirect to the original long URL
        res.redirect(url.longUrl); //Browser navigates to original site
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const createCustomUrl = async (req,res)=>{
    const {url, slug} = req.body; //takes url and customUrl from the request body
    //customUrl is optional, if user wants to set a custom short url
    const shortUrl = slug ? slug : generateNanoId(7); //if customUrl is provided, use it, else generate a new one

    // Create a new URL with the custom short URL
    const newUrl = new urlSchema({
        longUrl: url,
        shortUrl: shortUrl
    });
    await newUrl.save(); //saves the new url to the database
    res.status(201).json(newUrl); //returns success response

}


//Extra -------------------------------------------------------------->
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