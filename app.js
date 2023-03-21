const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

//getting connection with database

const DB =
  "mongodb+srv://mhs_db:1234meetshah@cluster0.dg2l0.mongodb.net/mernstack?retryWrites=true&w=majority";

const collection2_schema = new mongoose.Schema({
  
        subjectName:String,
        facultyName:String,
        lectureTime:String,
        lectureDuration:Number,
        day:String

})

const collection2 = mongoose.model('schedule',collection2_schema);


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection with DB established successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());

//default format-created 


app.get("/", (req,res) => {
    console.log('working');
});

app.get('/setschedule',async(req,res)=>{
    const table_set = await collection2.create({
        subjectName:"Maths",
        facultyName:"Raj Sir",
        lectureTime:"11:00",
        lectureDuration:60,
        day:"Wednesday"
    })

    res.status(200).json({
        success:true,
        data:table_set
    })

})
app.post('/setrecord',async(req,res)=>{
    const tableset = await collection2.create({    
        subjectName:req.body.sub,
        facultyName:req.body.fac,
        lectureTime:req.body.time,
        lectureDuration:req.body.duration,
        day:req.body.day
    })
    res.status(200).json({
        success:true,
        data:tableset
    })  
})

app.get('/getschedule',async(req,res,next)=>{

    let fetch_data = await collection2.find();

    res.status(200).json({
        success:true,
        data:fetch_data
    })

})

//fetch records via id

app.get('/record/:id',async(req,res)=>{
    const id = req.params.id ;

    const dataCollected  = await collection2.find({_id:id});

    console.log(dataCollected);
    res.status(200).json({
        success:true,
        data:dataCollected
    });
});




//update record 

app.post('/updaterecord',async(req,res)=>{

    const findRecord  = await collection2.findByIdAndUpdate(req.body.id,{
        subjectName:req.body.sub,
        facultyName:req.body.fac,
        lectureDuration:req.body.duration,
    },{new:true});

    res.status(200).json({
        success:true,
        findRecord
    })


})

// delete a record

app.post('/deleterecord',async(req,res)=>{
    
    const findRecord  = await collection2.findByIdAndDelete(req.body.id);

    res.status(200).json({
        success:true,
        findRecord
    })


});



app.listen(PORT, () => {
  console.log(`running on port no ${PORT}`);
});
