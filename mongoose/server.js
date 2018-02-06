var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var {app1}=require('./todos');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var app=express();
app.use(bodyparser.json());

app.post('/todos',(req,res)=>
{
	var todo=new app1({
		text:req.body.text,
		email:req.body.email
	});
	todo.save().then((docs)=>
	{
		res.send(docs);
	},(err)=>
	{
		res.status(400).send(err);
	});
});

app.get('/todos',(req,res)=>
{
	app1.find().then((todos)=>{
		res.send({
			todos
		})
	},(err)=>
	{
		res.status(400).send(err);
	});
});

app.listen(3000,()=>
{
	console.log('Starting port 3000');
});

module.exports={app};