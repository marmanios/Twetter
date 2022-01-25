const mongoose = require("mongoose");
const Twet = require("../models/Twet");
const sentence = require("random-sentence");
const randomWords = require('random-words');
const { names, city_names } = require('./names.js');

mongoose.connect("mongodb://localhost:27017/twets", {
    useNewUrlParser:true,
    useUnifiedTopology: true
} )

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DB connected")
})

const seedDB = async() =>{
    await Twet.deleteMany({});
    console.log("cleared");
    for (let index = 0; index < 1000; index++) {
        let Post = new Twet({
            author: names[Math.floor(Math.random() * 6000)],
            body: sentence({min:20, max: 60}),
            location: city_names[Math.floor(Math.random() * 100)],
            title: randomWords({min: 3, max: 10, join: " "}),
            picture: "http://source.unsplash.com/collection/483251/250x250"
        });
        
        const c = new Twet(Post)
        await c.save().then()
    }
    await console.log(Twet.findOne({}).id)
    console.log("Seeded");
}
seedDB();