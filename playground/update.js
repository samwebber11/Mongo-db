const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>
{
	if(err)
	{
	return console.log("unable to connect to database");
	}

	console.log("connected to mongo-db server");

	db.collection('Todos').findAndUpdateOne({
		name:'sambhav'
	},{
		$set:{
			
		}
	}).then((res)=>
	{
		console.log(res);
	});

	db.close();
});