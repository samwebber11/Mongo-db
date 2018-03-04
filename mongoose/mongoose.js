var mongoose1=require('mongoose');

var mongoose2=()=>
{
mongoose1.Promise=global.Promise;
mongoose1.connect(process.env.MONGODB_URI);
}
module.exports={mongoose2};