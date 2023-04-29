const express=require('express');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 800;
require('./db/conn.js');
const Todo=require('./Schema/schema');
app.use(cors());
app.use(express.json());

app.get('/home' ,(req,resp)=>{
    resp.send("Home Page");
});

app.post('/givenData' , async (req,resp)=>{
    let Data= req.body.Data;
    let Desp=req.body.Desp;
    let Date=req.body.Date;
   // console.log(Data);
  const todo= new Todo({
    title:Data,
    Desp:Desp,
    Date:Date,
  })

  try{
    let saveresult=await todo.save();
    resp.send(saveresult)
  }
  catch(e){
    console.log(e);
    resp.send("Error");
  }
});
app.get('/givenData' ,async(req,resp)=>{
 let alldata=await Todo.find({});
 resp.send(alldata);
});

app.put('/UpdatedName',async(req,resp)=>{
  let UpdatedName=req.body.UpdatedName;
  let id=req.body.id;
  let UpdatedDesp=req.body.UpdatedDesp;
  let UpdatedDate=req.body.UpdatedDate;

  //console.log(UpdatedName,id,UpdatedDesp,UpdatedDate);

  let fetchData=await Todo.find({_id:id});
  fetchData[0].title=UpdatedName;
  fetchData[0].Desp=UpdatedDesp;
  fetchData[0].Date=UpdatedDate;
  let saveresult=await fetchData[0].save();
  resp.send(saveresult);
});

app.delete("/Delete/:id",async(req,resp)=>{
  let tobedelete=req.params.id;
 // console.log(tobedelete);
  // let responce=await Todo.deleteOne(tobedelete);
  // resp.send(responce);
  await Todo.findByIdAndRemove(tobedelete).exec();
  resp.send("Item Deleted");

});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});
