const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Author = require('./mongodb/myappdb');
const cors = require('cors');
const authors = [
    {_id:1,fName:'Surekha',mName:'Devi',lName:'Bathua'},
    {_id:2,fName:'Ashwini',mName:'Reddy',lName:'Yeleti'},
    {_id:3,fName:'Prathyu',mName:'sha',lName:'Mandagani'}
]
 
app.use(bodyParser());
app.use(cors());
app.listen(port,()=>console.log('Server started on port '+port ));

app.get('/', (req,resp)=>resp.send('Hello Mr Dhanam'));

app.get('/hello',(req,res)=>res.send('Hello surru'));

app.get('/authorsarray',(req,resp)=>{
    Author.find((err,docs)=>{
        if(err){
            resp.status(500).send(err);
        }
        else{
            resp.send(docs);
        }
    })
});

app.get('/authorsarray/:id',(req,res)=>{
    let id = req.params.id;
    Author.findOne({_id:id},(err,document)=>{
                   if(err){
        res.status(500).send(err);
    }
    else{
        res.send(document);
    }
    });
});

app.post('/authorsarray',(req,resp)=>{
    //console.log(req.body);
    resp.send(req.body);
    authors.push(req.body);
});

app.put('/authorsarray/:a_id',(req,resp)=>{
    let author = req.body;
    let a_id = parseInt(req.params.a_id);
    let index = authors.findIndex(a=>a._id===a_id);
    authors[index] = author;
    resp.send(authors);
});

app.delete('/authorsarray/:id',(req,resp)=>{
    let id = parseInt(req.params.id);
    let index = authors.findIndex(a=>a._id === id);
    authors.splice(index,1);
    resp.send(authors);
});
