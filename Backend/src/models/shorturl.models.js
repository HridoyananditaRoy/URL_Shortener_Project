import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    longUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
        index:true, //to make sure shortUrl is unique and indexed for faster search
        unique:true, //unique constraint

    },
    clicks:{
        type:Number,
        required:true,
        default:0,  
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //reference to User model so that we can know which user created which short url
        ref: 'User',
    }
})

const shortUrl = mongoose.model('shorturl',shortUrlSchema);

export default shortUrl;