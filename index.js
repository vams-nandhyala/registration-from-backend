const express =require("express")
const mysql=require("mysql2/promise")
const cors = require('cors');
const app=express()
app.use(cors());
app.use(express.json())
const dbConfig={
    host:"localhost",
    user:"root",
    password:"Vamsi@1994",
    database:"userdetails"
}
app.get("/",(req,res)=>{
    res.send("backend running")
})

app.get("/users",async (req,res)=>{
    try{
        const db=await mysql.createConnection(dbConfig)
        const getQuary='SELECT * FROM users';
        const [result]=await db.execute(getQuary);
        res.json(result)
        await db.end();
    }catch(error){
        console.error(error);
        res.status(500).send('Error reading data from database');
    }
})


app.post("/register/", async (request, response) => {
    const db=await mysql.createConnection(dbConfig)
    const {Name,Address } = request.body;
    console.log(Name)
    const createUserQuery = `INSERT INTO users(Name,Address)
         VALUES('${Name}','${Address}')`;
    await db.execute(createUserQuery);
    response.send("User created successfully");   
  });
  

app.listen(
    5000,()=>console.log("backend is Running")
)
