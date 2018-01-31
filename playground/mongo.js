const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>
{
	if(err)
	{
	return console.log("unable to connect to database");
	}

	console.log("connected to mongo-db server");

	// db.collection('Todos').insertOne({
	// 	name:'Kumar Sambhav Jain',
	// 	age:19,
	// 	location:'Delhi'
	// },(err,res)=>
	// {
	// 	if(err)
	// 	{
	// 		console.log(`unable to insert into database ${err}`);
	// 	}
	// 	else
	// 	{
	// 		console.log(JSON.stringify(res.ops,undefined,2));
	// 	}
	// });

	db.collection('Todos').find({name:'sambhav'}).count().then((count)=>
	{
		console.log('Todos');
		console.log(`Count : ${count}`);
		db.collection('Todos').find({name:'sambhav'}).toArray().then((docs)=>
		{
			console.log(JSON.stringify(docs,undefined,2));
		});
	},(err)=>
	{
		if(err)
		{
			console.log(`Unable to fetch data ${err}`);
		}
	})


	db.close();
});