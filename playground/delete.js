const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>
{
	if(err)
	{
	return console.log("unable to connect to database");
	}

	console.log("connected to mongo-db server");

	db.collection('Todos').deleteOne({
		name:'sambhav'
	}).then((res)=>
	{
		console.log(res);
	});

	db.close();
});