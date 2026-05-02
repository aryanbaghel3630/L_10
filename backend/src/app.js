/*
server create karna
*/ 
const express = require("express")
const path=require("path")
const cors= require("cors")
const app=express()
app.use(express.json())//middlewarre
app.use(cors()) ///accept ka r sake dusere sever se request
 app.use(express.static("./public"))//issse backend kiurl se dono sath chale fronte aur backend*/
const noteModel= require("./models/note.model")
/*
post /api/notes
create new note and save data in mongodb
req.body={title.description}

 */
app.post('/api/notes1',async(req,res)=>{
    const {title,description}=req.body

  const note=  await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created successfully",
        note
    })
}) 
 
//get
//fetch all the notes data from mongodb and send them in the response

app.get('/api/notes1',async(req,res)=>{
    const notes=await noteModel.find()
    
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

//delete /api/notes
//delete note with id from req.params
app.delete('/api/notes1/:id',async(req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note delete succesfully"
    })

})

//update note use patch
//patch/api/notes:id
//update description of note
// req.body main only description ayega req.body={description}
app.patch('/api/notes1/:id',async (req,res)=>{
    const id=req.params.id;
    const {description} = req.body;
 
     await noteModel.findByIdAndUpdate(id,{description})
     res.status(200).json({
        message:"note updated successfully"
     })
    
})

 app.use('*name',(req,res)=>{
   // res.send("this is wild card no api ")
  res.sendFile(path.join(__dirname, "..","/public/index.html"))
 })
module.exports=app

















