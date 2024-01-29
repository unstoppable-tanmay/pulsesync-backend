import express,{Request,Response} from 'express'

const app = express()

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello From Server")
})

app.listen(3000,()=>{
    console.log("app listining in 3000")
})