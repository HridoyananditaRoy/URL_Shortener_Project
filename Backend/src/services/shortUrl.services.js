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
} from "../dao/shortUrl.dao.js";

export const createShortUrlService = async (longUrl, userId = null) => {
  // check if longUrl already exists
  const existing = await findByLongUrl(longUrl);
  if (existing) return existing.shortUrl;

  let shortUrl;
  let exists = true;

  while (exists) {
    shortUrl = generateNanoId(7);
    exists = await findByShortUrl(shortUrl);
  }

  const saved = await saveShortUrl({
    longUrl,
    shortUrl,
    user: userId,
  });

  return saved.shortUrl;
};
