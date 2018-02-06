var mongoose=require('mongoose');
var {app1}=require('./todos2');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var App1=new app1({
text:'Sambhav',
email:'jain.kumarrocks.kumar@gmail.com'
});
var App=new app1({
	text:'Kumar Sambhav jain',
	email:'samjain15291@gmail.com',
	completed:false,
	completedBy:16
});

App.save().then((docs)=>{
	console.log('Saved: ',docs)
},(err)=>
{
	console.log('Unable to insert data',err);
});

App1.save().then((docs)=>
{
	console.log('Saved: ',docs)
},(err)=>
{
	console.log('Sorry Cannot Save');
});