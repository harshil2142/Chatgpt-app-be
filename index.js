const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const historyRoutes = require("./routes/historyRoutes")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config()
const cors = require("cors")
const app = express();


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected");
})

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
res.json("api running")
})

app.use('/api',userRoutes)
app.use('/history',historyRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, function() {
    console.log('Listening to port:  ' + process.env.PORT);
});