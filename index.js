
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}
);


