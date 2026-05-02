const mongoose=require("mongoose")

const noteSchema=new mongoose.Schema({
    title:String,  //ek note ka format aisa hoga
    description:String,
})

//note par perform operation create model

const noteModel= mongoose.model("notes",noteSchema)

module.exports=noteModel       ///multiple note hoge store in notes collection