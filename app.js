const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

//getting connection with database

const DB =
  "mongodb+srv://mhs_db:1234meetshah@cluster0.dg2l0.mongodb.net/mernstack?retryWrites=true&w=majority";

const table_format_schema = new mongoose.Schema({
    no_of_lecs : {
        type:Number,
        required:true
    },
    lec_duration : {
        hour:Number,
        minute:Number
    },
    no_of_days : {
        type:Number,
        required:true
    },
    recess_time : {
        hour:Number,
        minute:Number,
    },
    start_time : {
        hour:Number,
        minute:Number,
        
    },
    leave_time : {
        hour:Number,
        minute:Number,
        
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
    event_type:{
        type:String,
        required:true
    }

})

const format_model = mongoose.model('format',table_format_schema);


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

app.get('/createtableset',async(req,res,next)=>{


    const table_set = await format_model.create({
        no_of_lecs:4,
        lec_duration:{
            hour:1,
            minute:0
        },
        no_of_days:7,
        recess_time:{
            hour:1,
            minute:0
        },
        start_time:{
            hour:11,
            minute:0
        },
        leave_time:{
            hour:5,
            minute:0
        },
        event_type:"afternoon_shift"
    })

    res.status(400).json({
        success:true,
        data:table_set
    })
})

//for user input -create table format
app.post('/newtable',(req,res)=>{

    let lec_hour  = req.body.lec_duration.split(':')[0]
    let lec_min  = req.body.lec_duration.split(':')[1]
    console.log(lec_hour,lec_min);
    let recess_hour = req.body.recess_time.split(':')[0]
    let recess_min = req.body.recess_time.split(':')[1]

    let strat_hour = req.body.start_time.split(':')[0]
    let start_min = req.body.start_time.split(':')[1]

    let leave_hour = req.body.leave_time.split(':')[0]
    let leave_min = req.body.leave_time.split(':')[1]

    let event_type = req.body.event_type;
    let no_of_lecs = req.body.no_of_lecs;
    
    res.status(200).json({
        success:true,
        msg:"table format registered successfully"
    })
})


app.get('/getformat',async(req,res,next)=>{

    let fetch_data = await format_model.find();
    let len = fetch_data.length;
    let select =Math.floor(Math.random() * len);

    res.status(200).json({
        success:true,
        data:fetch_data[select]
    })

})
app.get("/", (req,res) => {
  res.send("Working");
});


app

app.listen(PORT, () => {
  console.log(`running on port no ${PORT}`);
});
