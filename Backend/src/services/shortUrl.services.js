// import urlSchema from '../models/shorturl.models.js';
// import { generateNanoId } from '../utils/helper.js';

// export const createShortUrlService = async (url) => {
//     let shortUrl = '';
//     let exists = true;

//     // Ensure the generated shortUrl is unique
//     while (exists) {
//         shortUrl = generateNanoId(7);
//         exists = await urlSchema.findOne({ shortUrl });
//     }

//     // const shortUrl = generateNanoId(7);
//     const newUrl = new urlSchema({
//         longUrl: url,
//         shortUrl: shortUrl
//     })
    
//     await newUrl.save();
//    return shortUrl;
// } 


import { generateNanoId } from "../utils/helper.js";
import {
  findByShortUrl,
  findByLongUrl,
  saveShortUrl,
} from "../dao/short_url.js";

//If user logged in & slug provided-> use slug
//else -> generate nanoid

export const createShortUrlService = async (longUrl, userId = null, slug=null) => {
  // check if longUrl already exists
  //If long url already exists, return the existing shortUrl

  const existing = await findByLongUrl(longUrl);
  if (existing && !slug) return existing.shortUrl;

  let shortUrl;
//   let exists = true;

  //If user is logged in and slug is provided -> use custom slug
  if(slug){
    //check if slug already exists
    const slugExists = await findByShortUrl(slug);
    if(slugExists){
        throw new Error("Custom slug already exists");
    }
    shortUrl = slug;
    // exists = false; //no need to check further
  }
  else{
    // Generate unique shortUrl using nanoid
    let exists = true;
     while(exists){
        shortUrl = generateNanoId(7);
        exists = await findByShortUrl(shortUrl);
     }
  }

  //save to database
  const saved = await saveShortUrl({
    longUrl,
    shortUrl,
    user: userId,
  });

  return saved.shortUrl;
};
