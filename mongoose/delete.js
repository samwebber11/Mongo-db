var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var {app1}=require('./todos');
var {ObjectId}=require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
var app=express();
app.use(bodyparser.json());

app1.remove({}).then((todos)=>
{
	console.log(todos);
});