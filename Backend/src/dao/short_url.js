// import urlSchema from '../models/short_url.schema.js';
// import { generateNanoId } from '../utils/helper.js';

// export const createShortUrlWithUser = async (longUrl, userId) => {
//     let shortUrl = '';
//     let exists = true;  
//     // Ensure the generated shortUrl is unique
//     while (exists) {
//         shortUrl = generateNanoId(7);
//         exists = await urlSchema.findOne({ shortUrl });
//     }
//     const newUrl = new urlSchema({
//         longUrl: longUrl,
//         shortUrl: shortUrl,
//         user: userId // Associate short URL with user
//     });
//     await newUrl.save();
//     return shortUrl;
// }

// export const createshortUrlWithoutUser = async (longUrl) => {
//     let shortUrl = '';
//     let exists = true;
//     // Ensure the generated shortUrl is unique
//     while (exists) {
//         shortUrl = generateNanoId(7);
//         exists = await urlSchema.findOne({ shortUrl });
//     }
//     const newUrl = new urlSchema({
//         longUrl: longUrl,
//         shortUrl: shortUrl
//     });
//     await newUrl.save();
//     return shortUrl;
// }

//-----------------------------------------------------------------------------------

import urlSchema from "../models/shorturl.models.js";

export const findByShortUrl = async (shortUrl) => {
  return await urlSchema.findOne({ shortUrl });
};

export const findByLongUrl = async (longUrl) => {
  return await urlSchema.findOne({ longUrl });
};

export const saveShortUrl = async ({ longUrl, shortUrl, user }) => {
  const newUrl = new urlSchema({
    longUrl,
    shortUrl,
    user: user || null,
  });
  return await newUrl.save();
};
