const mongoose=require('mongoose');
var validate=require('validator');
const lodash=require('lodash');
const jwt=require('jsonwebtoken');

var user=new mongoose.Schema({
	text:{
		type:String,
		required:true,
		minlength:1,
		trim:true
	},
	completed:
	{
		type:Boolean,
		default:false
	},
	completedBy:
	{
		type:Number,
		default:null
	},
	email:
	{
		type:String,
		unique:true,
		validate:
		{
			validator:validate.isEmail,
			message:'{VALUE} is not a validate email'
		},
		required:true,
		minlength:1,
		trim:true
	},
	password:{
		type:String,
		required:true,
		unique:true,
		minlength:6
	},
	tokens:
	[
	{
		access:
		{
		type:String,
		required:true
		},
		token:
		{
			type:String,
			required:true
		}
	}]
});

user.methods.toJSON=function(){
	var user=this;
	var object=user.toObject();

	return lodash.pick(object,['_id','email']);
}

user.methods.generateAuthToken=function(){
	var user=this;
	var access='auth';
	var token=jwt.sign({_id:user._id.toHexString(),access},'abc123@').toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then((user)=>
	{
		return token;
	});
}

var app1=mongoose.model('Todo',user);
module.exports={app1};
