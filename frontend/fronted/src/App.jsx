import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react';


function App() {
  const [notes, setnotes] = useState([{}]);
  
  function fetchnotes(){
    axios.get('https://l-10-8h4u.onrender.com/api/notes1')
    .then((res) => {
      console.log(res.data)
      console.log(res.data.message)
      console.log(res.data.notes)
      setnotes(res.data.notes);
      console.log(res.data.notes); 
    });
  }

useEffect(() => {
  fetchnotes()
}, []); 
 
  function handlerSubmit(e){
    e.preventDefault();
    const {title,description}=e.target.elements; //form ke andar name title, description destucte karge input agayge
    console.log(title.value,description.value)
    axios.post("https://l-10-8h4u.onrender.com/api/notes1",{
      title:title.value,
      description:description.value

    })
    .then((res)=>{
      console.log(res)
      console.log(res.data)
    })
    fetchnotes()
  }
  function handledeletenote(noteid){
   console.log(noteid)
   axios.delete("https://l-10-8h4u.onrender.com/api/notes1/"+noteid )
   .then((res)=>{
       console.log(res.data.message)
       fetchnotes()
   })
    
  }
  function updatedescription(noteid){
    console.log(noteid)
   const updescription= prompt("enter decsription")
    axios.patch("https://l-10-8h4u.onrender.com/api/notes1/"+noteid,{
      description:updescription
    })
    .then((res)=>{
      console.log(res,res.message)
      fetchnotes()
    })
  }
  return (
    
    <>
    <form className='note-create-form' onSubmit={handlerSubmit} >
      <input name= 'title' type="text" placeholder='enter title'/>
      <input name='description' type="text" placeholder='enter description'/>
      <button> create note</button>

    </form>
   <div className='notes'>
    {notes.map((note)=>{
    return <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={()=>{
        {handledeletenote(note._id)}
      }}>delete</button>
      <button onClick={
        function(){
          updatedescription(note._id)
        }
      }>update</button>
    </div>})}
   </div>
                </>
  )
}

export default App
