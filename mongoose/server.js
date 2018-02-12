var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var {app1}=require('./todos');
var {ObjectId}=require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
var port=process.env.PORT || 3000;
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

app.get('/todos/:id',(req,res)=>
{
	var id=req.params.id;
	if(!ObjectId.isValid(id))
	{  var text1='No id is found';
		res.status(404).send({text1});
	}

     	app1.findById(id).then((todos)=>
		{
			if(todos)
			{
				res.send(todos);
			}
			else
			{
				res.status(404).send();
			}
		},(err)=>
		{
			res.status(400).send(err);
		});
});

app.delete('/todos/:id',(req,res)=>
{
	var id=req.params.id;
	if(!ObjectId.isValid(id))
	{
		var text1='No id is found';
		return res.status(404).send({text1});
	}
	app1.findByIdAndRemove(id).then((todos)=>
	{
		if(todos)
		{
			return res.send(todos);
		}
		else
		{
			res.status(404).send();
		}
	},(err)=>
	{
		res.status(400).send(err);
	});
	}
);

app.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});

module.exports={app};