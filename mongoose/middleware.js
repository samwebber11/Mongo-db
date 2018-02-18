var {app1}=require('./todos');
var authenticate=(req,res,next)=>
{
	var token=req.header('x-auth');

	app1.findByToken(token).then((user)=>
	{
		if(!user)
		{
			
			return Promise.reject();
		}
		req.user=user;
		req.token=token;
		next();
	}).catch((err)=>
	{
		console.log(err);
		res.status(401).send();
	});
};

module.exports={authenticate};