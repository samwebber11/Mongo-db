var mongoose=require('mongoose');
var app1=mongoose.model('Todo',{
	text:{
		type:String,
		required:true,
		minlength:1,
		trim:true
	},
	completed:
	{
		type:Boolean,
		default:false,
	},
	completedBy:
	{
		type:Number,
		default:null
	},
	email:
	{
		type:String,
		required:true,
		minlength:1,
		trim:true
	}
});
module.exports={app1};
