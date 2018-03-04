var lodash=require('lodash');
var express=require('express');
var bodyparser=require('body-parser');
console.log('I m stunt');
var mongoose1=require('mongoose');
var {app1}=require('./todos');
var {ObjectId}=require('mongodb');
var {authenticate}=require('./middleware');
mongoose1.Promise=global.Promise;
mongoose1.connect('mongodb://localhost:27017/Todo');
var port=process.env.PORT || 3000;
var app=express();
app.use(bodyparser.json());
console.log("plz let me start");
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
console.log('Plz start up');

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
app.patch('/todos/:id',(req,res)=>
{
	var id=req.params.id;
	var body=lodash.pick(req.body,['text','completed']);
	if(!ObjectId.isValid(id))
	{
		var text1="no id is found";
		return res.status(404).send({text1});
	}
	if(lodash.isBoolean(body.completed) && (body.completed))
	{
	 body.completedBy=new Date().getTime();
	}
	else
	{
		body.completed=false;
		body.completedBy=null;
	}

	app1.findByIdAndUpdate(id,{$set:body},{new:true}).then((todos)=>
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
app.post('/todos1',(req,res)=>
{
	
	var body=lodash.pick(req.body,['email','password','text']);
	
	var user=new app1(body);
	
	user.save().then(()=>
	{
		
		return user.generateAuthToken();
		}).then((token)=>
		{
			
			res.header('x-auth',token).send(user);
		}).catch((e)=>
		{
			console.log(e);
			res.status(400).send(e);
		});
		
});


app.get('/todos1/me',authenticate,(req,res)=>
{
	res.send(req.user);

});

app.post('/todos1/login',(req,res)=>
{
	var body=lodash.pick(req.body,['email','password','text']);

	app1.findByCredentials(body.email,body.password).then((user)=>
	{
		return user.generateAuthToken().then((token)=>
		{
			res.header('x-auth',token).send(user);
		});
	}).catch((e)=>
	{
		res.status(400).send(e);
	});
});

app.listen(port,()=>
{
	console.log(`Starting port ${port}`);
});

module.exports={app};