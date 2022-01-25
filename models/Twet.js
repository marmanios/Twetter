const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TwetSchema = new Schema({
    author: String,
    body: String,
    datePosted: String,
    title: String,
    picture: String,
    location: {type: String, default: "Unknown"},
})

TwetSchema.pre("save", function(next){
    const twet = this;
    //Get Date
    var result="";
    var d = new Date();
    result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
         " "+ d.getHours()+":"+d.getMinutes()+":"+
         d.getSeconds()+" "+d.getMilliseconds();

    this.datePosted = result;
    next();

})
module.exports = mongoose.model("Twets",TwetSchema)