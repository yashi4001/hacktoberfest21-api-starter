//requiring mongoose
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//defining structure of user schema
const User=new Schema({
    id:{
        type:String,
        description:"ID of user"
    },
    name:{
        type:String,
        description:"Name of user",
        minlength:1
    },
    costumeTitle:{
        type:String,
        description:"Title of user's costume",
        minLength:1
    },
    costumeImgUrl:{
        type:String,
        description:"Image of user's costume",
        minLength:1
    },
    city:{
        type:String,
        description:"City of user",
        minLength:1
    },
    country:{
        type:String,
        description:"Country of user",
        minLength:1
    },
    votes:{
        type:Number,
        default:0,
        description:"Votes for user"
    }
});

const user=mongoose.model('User',User);

//exporting user schema
module.exports=user