import express from 'express'

const app = express();
const PORT = process.env.PORT || 3000

app.get('/',(req, res)=>{
    res.json({
        message: "hello fro a container ",
        service: "hello-node",
        pod :process.env.POD_NAME ||"Unknown",
    time:new Date.toISOString(),
   });
});

app.get('/ready', (req, res)=>{
    res.status(200).send("Ready")
})

app.get('/health', (req, res)=>{
    res.status(200).send("OK")
})

app.listen(PORT, ()=>{
    console.log(`app Listening on port ${PORT} !`);
})