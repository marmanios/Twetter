const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Twet = require("./models/Twet");
const app = express();

mongoose.connect("mongodb://localhost:27017/twets", {
    useNewUrlParser:true,
    useUnifiedTopology: true
} )

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DB connected");
})

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")


app.listen(3000, ()=> {
    console.log("we are listening on port 3000");
})

//Home page
app.get("/",async(req,res) =>{
    const twets = await Twet.find({}).sort({datePosted: -1})
    res.render("home", {twets});
})

//Searched home page
app.post("/",async(req,res) =>{
    const twets = await Twet.find({'$or':[
        {'title':{'$regex':req.body.query, '$options':'i'}},
        {'body':{'$regex':req.body.query, '$options':'i'}}
        ]}).sort({datePosted: -1})
    res.render("home", {twets});
})

//Show Twet Details
app.get("/twet/:id", async (req,res) =>{
    const {id} = req.params;
    try {
        const foundTwet = await Twet.findById(id);
        res.render("showTwet", {foundTwet});
    } catch (error) {
        res.send("Twet not found :(");
    }
})

//Update Twet
app.patch("/twet/:id", async (req,res) =>{
    const {id} = req.params;
    const {body} = req.body;
    await Twet.findByIdAndUpdate(id,req.body);
    res.redirect("/");
})

//Delete Twet
app.delete("/twet/:id", async (req,res) =>{
    const {id} = req.params;
    await Twet.findByIdAndDelete(id);
    res.redirect("/");
})

//Go to make twet form
app.get("/makeTwet", (req,res) =>{
    res.render("createTwet");
})

//Submit Created twet
app.post("/makeTwet", async (req,res) =>{
    //Get Date
    
    console.log("Tweeted")
    let post = new Twet(req.body)

    await post.save();
    
    res.redirect("/");
})

