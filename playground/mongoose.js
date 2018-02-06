var mongo1=require('mongoose');
var {app1}=require('./../mongoose/todos');
var mongo2=require('mongodb');
mongo1.Promise=global.Promise;
mongo1.connect('mongodb://localhost:27017/TodoApp');

const {ObjectId}=require('mongodb');
var id='5a79d5c0a99aec3568434316';
if(!ObjectId.isValid(id))
{
	console.log('id is not right');
}
app1.find({
	_id:id
}).then((todos)=>
{
	console.log(todos);
});

app1.findOne({
	_id:id
}).then((todos)=>
{
	console.log(todos);
});