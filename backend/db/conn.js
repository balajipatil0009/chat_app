
const {MongoClient} = require('mongodb');
const url = "mongodb+srv://balajipatil20030:balajipatil20030@cluster0.low4ya7.mongodb.net/?retryWrites=true&w=majority"
const clint = new MongoClient(url,{},6000000)

  async function database(){
    console.log("am here");
    try{
        const db = await clint.connect().catch(e=>{
            console.log(e);
        })
        if(db) console.log("connected DB");

    }catch(e){
        console.log("mongoo error: "+e);
    }
}
 
module.exports = database

