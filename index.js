
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
//const connectDB = require('./db');
const cluster= require('cluster')
const os= require('os')
//const cros=require('cros')
const rateLimit= require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 100 requests per IP
  message: "Too many requests from this IP, please try again later.",
});



const app = express();
app.use(limiter);
//app.use(cros())
//connectDB();
const port = 3000;
app.use(express.json());
let numberOfcore= os.cpus().length;

if(cluster.isMaster){
for(let i=0 ;i<numberOfcore;i++){
    cluster.fork()
}
 // If any worker dies, restart it
 cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}else{



app.get("/", (req, res) => {
    res.send("Hello, World!");
}
);

app.post("/data", (req, res) => {
    const data = req.body;
    res.json({ received: data });
}
);

app.get("/user-details",(req,res)=>{

    res.status(200).json({name:"John Doe",age:30,city:"New York"});
})
app.get("/multipe/:time",(req,res)=>{

    let multiple=null;
    let numOfTimes= req.params.time;



    for(let i=0;i<numOfTimes;i++){
        multiple=multiple+i;
    }
    res.status(200).json({
        "message":"multiple of "+numOfTimes,
        "result":multiple
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}
);

}
